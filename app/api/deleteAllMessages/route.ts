import db from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  await db.message.deleteMany({});
  await db.conversation.deleteMany({});
  return NextResponse.json(true, { status: 200 });
};
