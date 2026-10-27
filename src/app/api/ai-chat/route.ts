
import OpenAI from "openai";
import { NextResponse } from "next/server";
// import { runtime} from "nodejs"
// export const runtime = "nodejs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "AI service is not configured." },
        { status: 500 }
      );
    }

    const body: unknown = await request.json();

    if (
      typeof body !== "object" ||
      body === null ||
      !("message" in body) ||
      typeof body.message !== "string"
    ) {
      return NextResponse.json(
        { error: "A valid message is required." },
        { status: 400 }
      );
    }

    const message = body.message.trim();

    if (!message || message.length > 2000) {
      return NextResponse.json(
        { error: "Message must be between 1 and 2000 characters." },
        { status: 400 }
      );
    }

    const response = await openai.responses.create({
      model: "gpt-5.5",
      instructions: `
        You are MOFHAF's AI shopping assistant.
        Help customers find and compare products.
        Be friendly, concise, and professional.
        Never invent product prices, stock, or order status.
        If product data is unavailable, say so honestly.
      `,
      input: message,
    });

    return NextResponse.json({
      success: true,
      reply: response.output_text,
    });
  } catch (error) {
    console.error("AI chat error:", error);

    return NextResponse.json(
      { error: "Unable to process your request right now." },
      { status: 500 }
    );
  }
}
