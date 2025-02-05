"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function QuizPage() {
  const router = useRouter();
  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const topic = searchParams.get("topic");
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  async function generateQuiz(topic: string) {
    try {
      const response = await axios.post('/api/quiz', { topic });
      return response.data;
    } catch (error) {
      console.error("Error generating quiz:", error);
      return null;
    }
  }

  useEffect(() => {
    if (topic) {
      generateQuiz(topic).then((data) => {
        setQuiz(data);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [topic]);

  const handleAnswerSelect = async (questionIndex: number, answer: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));

    const currentQuestion = quiz.quiz[currentQuestionIndex];
    const isAnswerCorrect = answer === currentQuestion.correct_answer;
    setIsCorrect(isAnswerCorrect);
    setShowFeedback(true);

    // Wait for 1 second before moving to next question
    await new Promise(resolve => setTimeout(resolve, 1000));
    setShowFeedback(false);

    if (currentQuestionIndex < quiz.quiz.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleQuizComplete();
    }
  };

  const handleQuizComplete = () => {
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

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-black border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <div className="text-center text-red-600">
          Error loading quiz. Please try again.
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.quiz[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-white p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span>Question {currentQuestionIndex + 1} of {quiz.quiz.length}</span>
            <span>{Math.round((currentQuestionIndex / quiz.quiz.length) * 100)}% Complete</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <motion.div
              className="h-full bg-black rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestionIndex) / quiz.quiz.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
          >
            <h2 className="text-2xl font-bold mb-6">
              {currentQuestion.title}
            </h2>

            <div className="space-y-3">
              {Object.entries(currentQuestion.options).map(([key, value]) => (
                <motion.button
                  key={key}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswerSelect(currentQuestionIndex, key)}
                  disabled={showFeedback}
                  className={`w-full p-4 rounded-xl border-2 transition-all
                    ${showFeedback && key === currentQuestion.correct_answer 
                      ? 'border-green-500 bg-green-50' 
                      : showFeedback && userAnswers[currentQuestionIndex] === key
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-black'
                    }
                    ${userAnswers[currentQuestionIndex] === key && !showFeedback 
                      ? 'border-black' 
                      : ''
                    }
                  `}
                >
                  <div className="flex items-center">
                    <span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center mr-3">
                      {key}
                    </span>
                    <span className="text-left">{value as string}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Feedback Message */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 
                px-6 py-3 rounded-full text-white font-semibold
                ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}
            >
              {isCorrect ? 'Correct! 🎉' : 'Incorrect! Try again next time'}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
