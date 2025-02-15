import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

export default function Question({
  question,
  onAnswer,
  selectedAnswer,
  isReviewMode,
}) {
  console.log(question);
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg p-8"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-indigo-800">
        {question.text}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            className={`p-4 rounded-xl text-left transition-all duration-200 ${
              selectedAnswer === option
                ? isReviewMode
                  ? option === question.correctAnswer
                    ? "bg-green-100 border-2 border-green-500"
                    : "bg-red-100 border-2 border-red-500"
                  : "bg-indigo-100 border-2 border-indigo-500"
                : "bg-gray-100 hover:bg-gray-200 border-2 border-transparent"
            }`}
            onClick={() => !isReviewMode && onAnswer(option)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isReviewMode}
          >
            <div className="flex items-center  text-gray-800">
              <span className="text-2xl mr-3">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="text-lg">{option}</span>
              {isReviewMode &&
                selectedAnswer === option &&
                (option === question.correctAnswer ? (
                  <CheckCircle className="ml-auto text-green-500" />
                ) : (
                  <XCircle className="ml-auto text-red-500" />
                ))}
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
