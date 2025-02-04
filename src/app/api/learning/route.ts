import { NextResponse } from 'next/server';
import { generateLearningContent } from '@/utils/gemini';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { topic, score, total } = body;

    const content = await generateLearningContent(topic, score, total);
    
    return NextResponse.json(content);
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate learning content' },
      { status: 500 }
    );
  }
}
