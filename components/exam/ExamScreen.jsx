import { mockQuestions } from "@/utils/dummy";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Question from "@/components/Question";
import ProgressIndicator from "@/components/ProgressIndicator";
import Sidebar from "@/components/Sidebar";
import Timer from "@/components/Timer";

export default function ExamScreen() {
  const [examState, setExamState] = useState("start");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [reviewFlags, setReviewFlags] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(30 * 60);
  const [questions, setQuestions] = useState(mockQuestions);

  useEffect(() => {
    if (examState === "in-progress") {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 0) {
            clearInterval(timer);
            setExamState("end");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [examState]);

  const handleStartExam = (examId) => {
    setQuestions(mockQuestions);
    setAnswers(new Array(mockQuestions.length).fill(null));
    setReviewFlags(new Array(mockQuestions.length).fill(false));
    setExamState("in-progress");
  };

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () =>
    currentQuestionIndex < questions.length - 1 &&
    setCurrentQuestionIndex(currentQuestionIndex + 1);

  const handlePrevQuestion = () =>
    currentQuestionIndex > 0 &&
    setCurrentQuestionIndex(currentQuestionIndex - 1);

  const handleReviewFlag = () => {
    const newReviewFlags = [...reviewFlags];
    newReviewFlags[currentQuestionIndex] =
      !newReviewFlags[currentQuestionIndex];
    setReviewFlags(newReviewFlags);
  };
  const handleFinishExam = () => setExamState("review");
  const handleSubmitExam = () => setExamState("end");
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex">
        <AnimatePresence mode="wait">
          <Sidebar
            questions={questions}
            currentIndex={currentQuestionIndex}
            setCurrentIndex={setCurrentQuestionIndex}
            answers={answers}
            reviewFlags={reviewFlags}
          />
          <motion.div
            className="flex-grow p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <ProgressIndicator
                  totalQuestions={questions.length}
                  currentQuestion={currentQuestionIndex + 1}
                  answeredQuestions={answers.filter((a) => a !== null).length}
                />
                <Timer timeRemaining={timeRemaining} />
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestionIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Question
                    question={questions[currentQuestionIndex]}
                    onAnswer={handleAnswer}
                    selectedAnswer={answers[currentQuestionIndex]}
                    isReviewMode={examState === "review"}
                  />
                </motion.div>
              </AnimatePresence>
              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePrevQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="px-6 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Previous
                </button>
                <button
                  onClick={handleReviewFlag}
                  className={`px-6 py-2 ${
                    reviewFlags[currentQuestionIndex]
                      ? "bg-yellow-500 hover:bg-yellow-600"
                      : "bg-gray-300 hover:bg-gray-400"
                  } text-white rounded-full transition-colors duration-200`}
                >
                  {reviewFlags[currentQuestionIndex]
                    ? "Unmark for Review"
                    : "Mark for Review"}
                </button>
                {currentQuestionIndex === questions.length - 1 ? (
                  <button
                    onClick={
                      examState === "in-progress"
                        ? handleFinishExam
                        : handleSubmitExam
                    }
                    className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-200"
                  >
                    {examState === "in-progress" ? "Finish" : "Submit"}
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-colors duration-200"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
