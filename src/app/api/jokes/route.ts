import { addRoast, Roast, roasts } from "@/data/jokes";
import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json(roasts)
}

export async function POST(req: Request) {
    const data: Roast = await req.json();
    addRoast(data);
    return NextResponse.json(roasts)
}