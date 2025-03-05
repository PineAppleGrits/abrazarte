import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST() {
  const timestamp = Math.floor(Date.now() / 1000);

  const toSign = `timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`;

  const signature = crypto.createHash("sha1").update(toSign).digest("hex");

  return NextResponse.json({
    signature,
    timestamp,
    apiKey: process.env.CLOUDINARY_API_KEY,
  });
}
