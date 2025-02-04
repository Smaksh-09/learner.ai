"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";

export default function QuizPage() {
  const router = useRouter();
  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const topic = searchParams.get("topic");
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  async function generateQuiz(topic: string) {
    try {
      const response = await axios.post('/api/quiz', { topic });
      console.log("Generated Quiz:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error generating quiz:", error);
      return null;
    }
  }

  useEffect(() => {
    // Only generate quiz if a topic is provided.
    if (topic) {
      generateQuiz(topic).then((data) => {
        console.log("Raw quiz data:", data); // Add this debug log
        setQuiz(data);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [topic]);

  const handleAnswerSelect = (questionIndex: number, answer: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const handleSubmit = () => {
    let correctAnswers = 0;
    quiz.quiz.forEach((question: any, index: number) => {
      if (userAnswers[index] === question.correct_answer) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    setSubmitted(true); 
    
    // Navigate to results page with score
    router.push(`/Learning?score=${correctAnswers}&total=${quiz.quiz.length}&topic=${topic}`);
  };

  return (
    <div className="min-h-screen bg-white p-8">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-solid rounded-full border-t-transparent" />
        </div>
      ) : quiz ? (
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">
            Quiz on <span className="text-blue-600">{topic}</span>
          </h1>
          {quiz.quiz?.map((question: any, index: number) => (
            <div
              key={index}
              className="mb-8 p-6 border rounded shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <h2 className="text-xl font-semibold mb-3">
                {index + 1}. {question.title}
              </h2>
              <div className="space-y-2">
                {Object.entries(question.options).map(([key, value]) => (
                  <label key={key} className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={key}
                      disabled={submitted}
                      checked={userAnswers[index] === key}
                      onChange={() => handleAnswerSelect(index, key)}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span>{value as string}</span>
                    {submitted && key === question.correct_answer && (
                      <span className="text-green-500 ml-2">✓</span>
                    )}
                    {submitted && userAnswers[index] === key && key !== question.correct_answer && (
                      <span className="text-red-500 ml-2">✗</span>
                    )}
                  </label>
                ))}
              </div>
            </div>
          ))}
          {!submitted ? (
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
              disabled={Object.keys(userAnswers).length !== quiz.quiz?.length}
            >
              Submit Quiz
            </button>
          ) : (
            <div>
            <div className="text-center mt-6"></div>
              <h2 className="text-2xl font-bold">
                Your Score: {score}/{quiz.quiz?.length}
              </h2>
              <p className="text-gray-600 mt-2">
                {score === quiz.quiz?.length ? "Perfect score! 🎉" : "Keep practicing! 💪"}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center text-red-600">
          Error loading quiz. Please try again.
        </div>
      )}
    </div>
  );
}
