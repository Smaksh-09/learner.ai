"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

interface EducationalContent {
  summary: string;
  key_concepts: string[];
  detailed_explanation: string;
  Real_World_Applications: Array<{ Applications: string; explanation: string }>;
  common_mistakes: Array<{ mistake: string; solution: string }>;
  advanced_insights: string;
  recommended_resources: string[];
}

export default function Learn() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const score = parseInt(searchParams.get("score") || "0");
  const total = parseInt(searchParams.get("total") || "10");
  const topic = searchParams.get("topic") || "Unknown Topic";

  const [eduContent, setEduContent] = useState<EducationalContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("summary");

  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await axios.post('/api/learning', {
          topic,
          score,
          total
        });
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
      <div className="min-h-screen flex justify-center items-center bg-white">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-12 w-12 border-4 border-black border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-lg"
        >
          {error}
        </motion.div>
      </div>
    );
  }

  if (!eduContent) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <div>No content available</div>
      </div>
    );
  }

  const tabs = [
    { id: "summary", label: "Summary" },
    { id: "concepts", label: "Key Concepts" },
    { id: "detailed", label: "Detailed Explanation" },
    { id: "Applications", label: "Real world Examples" },
    { id: "mistakes", label: "Common Mistakes" },
    { id: "advanced", label: "Advanced Insights" },
    { id: "resources", label: "Resources" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-gray-200 bg-white sticky top-0 z-10"
      >
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold mb-2">{topic}</h1>
          <div className="flex items-center space-x-2">
            <div className="text-sm text-gray-600">Quiz Score:</div>
            <div className="px-3 py-1 bg-black text-white rounded-full text-sm">
              {score}/{total}
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <nav className="flex space-x-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors
                ${activeTab === tab.id 
                  ? 'bg-black text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg"
        >
          {activeTab === "summary" && (
            <div className="prose max-w-none">
              <p className="text-lg leading-relaxed">{eduContent.summary}</p>
            </div>
          )}

          {activeTab === "concepts" && (
            <ul className="space-y-4">
              {eduContent.key_concepts.map((concept, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-sm">
                    {index + 1}
                  </span>
                  <span className="text-lg">{concept}</span>
                </motion.li>
              ))}
            </ul>
          )}

          {activeTab === "detailed" && (
            <div className="prose max-w-none">
              <p className="text-lg leading-relaxed whitespace-pre-line">
                {eduContent.detailed_explanation}
              </p>
            </div>
          )}

          {activeTab === "Applications" && (
            <div className="space-y-8">
              {eduContent.Real_World_Applications.map((example, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-gray-50 rounded-lg p-6"
                >
                  <pre className="bg-black text-white p-4 rounded-lg overflow-x-auto">
                    <code>{example.Applications}</code>
                  </pre>
                  <p className="mt-4 text-gray-700">{example.explanation}</p>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === "mistakes" && (
            <div className="space-y-6">
              {eduContent.common_mistakes.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="border-l-4 border-black pl-4"
                >
                  <h3 className="font-semibold text-lg mb-2">Common Mistake {index + 1}</h3>
                  <p className="text-red-500 mb-2">{item.mistake}</p>
                  <p className="text-green-600">{item.solution}</p>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === "advanced" && (
            <div className="prose max-w-none">
              <p className="text-lg leading-relaxed">{eduContent.advanced_insights}</p>
            </div>
          )}

          {activeTab === "resources" && (
            <ul className="space-y-4">
              {eduContent.recommended_resources.map((resource, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <span className="text-lg">📚</span>
                  <a 
                    href={resource} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-lg text-gray-700 hover:text-black underline"
                  >
                    {resource}
                  </a>
                </motion.li>
              ))}
            </ul>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex justify-center"
        >
          <button
            onClick={() => router.push('/')}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2"
          >
            <span>←</span>
            <span>Back to Home</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
