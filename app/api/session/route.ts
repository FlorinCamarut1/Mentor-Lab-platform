import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const session = await auth();
    return NextResponse.json(session, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Ceva nu a mers bine!" },
      { status: 500 },
    );
  }
};
