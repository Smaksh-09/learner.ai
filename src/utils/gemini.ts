import { GoogleGenerativeAI } from "@google/generative-ai";

export function getGeminiAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is not configured");
  
  return new GoogleGenerativeAI(apiKey);
}

export async function generateLearningContent(topic: string, score: number, total: number) {
  const genAI = getGeminiAI();
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

  const prompt = `Generate **detailed educational content** for the topic: "${topic}".  
The user scored ${score}/${total} in a quiz on this topic so generate the content accordingly.  
Create an **in-depth learning resource** that includes:

1. **Comprehensive Summary** (Minimum 300 words)
2. **Key Concepts** (List at least 10)
3. **Detailed Explanation** (Minimum 500 words, with step-by-step breakdowns and real-world analogies)
4. **Code Examples**  
   - At least **3 code snippets** with comments  
   - Provide explanations **line by line**
5. **Common Mistakes and Best Practices**  
   - Identify **5 common mistakes** learners make  
   - Provide best practices to avoid these issues
6. **Advanced Insights**  
   - Explain **real-world applications** of this topic  
   - Discuss related **industry trends and best frameworks**
7. **Recommended Resources**  
   - Provide at least **5 books, websites, or videos** for further learning  
   - Include links where applicable

**Output format:**  
Return the content as structured **JSON**:
json
{
  "summary": "...",
  "key_concepts": ["...", "...", "..."],
  "detailed_explanation": "...",
  "code_examples": [
    { "code": "...", "explanation": "..." },
    { "code": "...", "explanation": "..." }
  ],
  "common_mistakes": [
    { "mistake": "...", "solution": "..." }
  ],
  "advanced_insights": "...",
  "recommended_resources": ["...", "...", "..."]
}
`

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Try to clean the response if needed
    let cleanedText = text.trim();
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.replace(/```json\n?/, '').replace(/```$/, '');
    }
    
    try {
      const parsedData = JSON.parse(cleanedText);
      return parsedData;
    } catch (parseError) {
      console.error('JSON Parse Error:', cleanedText);
      // Return a fallback response
      return {
        summary: "Unable to generate content at this time",
        key_concepts: ["Basic concepts will be available soon"],
        detailed_explanation: "Please try again later",
        code_examples: [],
        recommended_resources: []
      };
    }
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw error;
  }
}