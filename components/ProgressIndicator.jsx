import { motion } from "framer-motion";

export default function ProgressIndicator({
  totalQuestions,
  currentQuestion,
  answeredQuestions,
}) {
  return (
    <div className="w-full max-w-md">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-indigo-700">
          Question {currentQuestion} of {totalQuestions}
        </span>
        <span className="text-sm font-medium text-indigo-700">
          {answeredQuestions} Answered
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <motion.div
          className="bg-indigo-600 h-2.5 rounded-full"
          style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
}
