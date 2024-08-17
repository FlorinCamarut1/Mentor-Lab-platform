import { Pinecone } from "@pinecone-database/pinecone";

const apiKey = process.env.PINECONE_API_KEY;

if (!apiKey) {
  throw Error("Pinecone api Key is not defined");
}

const pinecone = new Pinecone({
  apiKey,
});

export const cvIndex = pinecone.Index("licenta");
