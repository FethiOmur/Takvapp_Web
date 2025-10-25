import { NextResponse } from 'next/server';
import type { ChatRequest, ChatResponse } from '@/types/chat';

export async function POST(request: Request) {
  try {
    const body: ChatRequest = await request.json();
    const { message } = body;



    const reply = `This is a real response for the message: "${message}"`;
    const sources = ["Quran 3:139", "Sahih Muslim 2999"];

    return NextResponse.json({ reply, sources } as ChatResponse);
  } catch (error) {
    console.error('Error in Imam AI API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
