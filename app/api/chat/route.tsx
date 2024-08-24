import db from "@/lib/db";
import { getEmbedding } from "@/lib/openai";
import { cvIndex } from "@/lib/pinecone";
import { NextResponse } from "next/server";
import { openai } from "@ai-sdk/openai";
import { CoreMessage, streamText } from "ai";

export const POST = async (req: Request) => {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Metodă nepermisa!" }, { status: 405 });
  }

  try {
    const body = await req.json();
    const messages: CoreMessage[] = body.messages;

    const messagesTruncated = messages.slice(-10);

    const embedding = await getEmbedding(
      messagesTruncated
        .map((message) => {
          message.content;
        })
        .join("\n"),
    );

    const vectorQueryResponse = await cvIndex.query({
      vector: embedding,
      topK: 30,
    });

    const relevantCVs = await db.cV.findMany({
      where: {
        id: {
          in: vectorQueryResponse.matches.map((match) => match.id),
        },
      },
    });

    const systemMessage: CoreMessage = {
      role: "system" as any,
      content:
        "Ești un bot assistent pentru aplicația Mentor Lab, te numești Mentor-Lab-Bot, tu vei ajuta studenții care te întreabă despre profesori folosindu-te de informațiile existente, ordonează un pic logic datele pe care le primești când răspunzi și oferă sugestii de profesori care s-ar potrivi conform experientei cu cererea studentului, trimite linkul către profilul profesorului doar dacă ți se cere asta " +
        "Informațiile relevante din această aplicație sunt: \n" +
        relevantCVs
          .map(
            (cv) =>
              `Titlu: ${cv.title}\n\nConținut:\n ${cv.content}\n\nLink profil:\n<Link href="${cv.profileUrl}"/>`,
          )
          .join("\n\n"),
    };

    const result = await streamText({
      model: openai("gpt-3.5-turbo"),
      system: "You are a helpful assistant.",
      messages: [systemMessage, ...messagesTruncated],
    });

    return result.toDataStreamResponse();
    // GET LAST 10 MESSAGES and turn them into a vector embedding
  } catch (error) {
    return NextResponse.json(
      { error: "Ceva nu a mers bine!" },
      { status: 500 },
    );
  }
};
