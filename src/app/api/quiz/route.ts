import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();
    const apikey = process.env.GEMINI_API_KEY;

    if (!apikey) {
      console.error('Missing API key');
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apikey}`;

    const prompt = `Generate a quiz about ${topic} with exactly 10 multiple choice questions. Return the response in this exact JSON format, with no additional text or formatting:
{
  "quiz": [
    {
      "title": "Question text",
      "options": {
        "A": "First option",
        "B": "Second option",
        "C": "Third option",
        "D": "Fourth option"
      },
      "correct_answer": "A"
    }
  ]
}`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.5,
          maxOutputTokens: 2048,
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Gemini API error:', data);
      return NextResponse.json({ error: 'Gemini API error' }, { status: 500 });
    }

    try {
      const text = data.candidates[0].content.parts[0].text;
      // Find the JSON object in the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }

      const quizData = JSON.parse(jsonMatch[0]);
      
      if (!quizData.quiz || !Array.isArray(quizData.quiz)) {
        throw new Error('Invalid quiz format');
      }

      // Validate quiz structure
      const isValidQuiz = quizData.quiz.every((q: any) => 
        q.title && 
        q.options && 
        typeof q.options === 'object' &&
        q.correct_answer &&
        ['A', 'B', 'C', 'D'].includes(q.correct_answer)
      );

      if (!isValidQuiz) {
        throw new Error('Quiz format validation failed');
      }

      return NextResponse.json(quizData);
    } catch (parseError) {
      console.error('Parse error:', parseError);
      console.error('Raw response:', data);
      return NextResponse.json({ error: 'Failed to parse quiz data' }, { status: 500 });
    }
  } catch (error: any) {
    console.error('Server error:', error.message);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
