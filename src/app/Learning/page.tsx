"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

interface EducationalContent {
  summary: string;
  key_concepts: string[];
  detailed_explanation: string;
  code_examples: Array<{ code: string; explanation: string }>;
  recommended_resources: string[];
}

export default function Learn() {
  const searchParams = useSearchParams();
  const score = parseInt(searchParams.get("score") || "0");
  const total = parseInt(searchParams.get("total") || "10");
  const topic = searchParams.get("topic") || "Unknown Topic";

  const [eduContent, setEduContent] = useState<EducationalContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await axios.post('/api/learning', {
          topic,
          score,
          total
        });
        console.log("API Response:", response.data);
        setEduContent(response.data);
      } catch (err) {
        setError("Failed to load learning content. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, [topic, score, total]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-solid rounded-full border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!eduContent) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div>No content available</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Learning: {topic}</h1>
          <p className="text-gray-600">
            Quiz Score: {score}/{total}
          </p>
        </header>

        <div className="space-y-8 bg-white p-6 rounded-lg shadow">
          {eduContent.summary && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Summary</h2>
              <p className="text-gray-700">{eduContent.summary}</p>
            </section>
          )}

          {eduContent.key_concepts?.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Key Concepts</h2>
              <ul className="list-disc list-inside space-y-2">
                {eduContent.key_concepts.map((concept, index) => (
                  <li key={index} className="text-gray-700">{concept}</li>
                ))}
              </ul>
            </section>
          )}

          {eduContent.detailed_explanation && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Detailed Explanation</h2>
              <p className="text-gray-700 whitespace-pre-line">{eduContent.detailed_explanation}</p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
