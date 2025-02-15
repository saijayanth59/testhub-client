import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

export default function EndScreen({ questions, answers, testType }) {
  const score = answers.filter(
    (answer, index) => answer === questions[index].correctAnswer
  ).length;
  const percentage = (score / questions.length) * 100;

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-3xl w-full">
        <h1 className="text-4xl font-bold mb-2 text-indigo-800">
          Exam Completed
        </h1>
        <h2 className="text-2xl font-semibold mb-6 text-indigo-600 capitalize">
          {testType} Test
        </h2>
        <div className="text-3xl mb-8">
          Your score:{" "}
          <span className="font-bold text-indigo-600">
            {score} / {questions.length}
          </span>
          <br />
          <span className="text-2xl text-gray-600">
            ({percentage.toFixed(2)}%)
          </span>
        </div>
        <div className="space-y-6">
          {questions.map((question, index) => (
            <motion.div
              key={question.id}
              className={`p-6 rounded-2xl ${
                answers[index] === question.correctAnswer
                  ? "bg-green-100"
                  : "bg-red-100"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <p className="font-semibold text-lg mb-2">{question.text}</p>
              <p className="flex items-center justify-center">
                {answers[index] === question.correctAnswer ? (
                  <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-600 mr-2" />
                )}
                Your answer: {answers[index] || "Not answered"}
              </p>
              {answers[index] !== question.correctAnswer && (
                <p className="mt-2 text-green-600">
                  Correct answer: {question.correctAnswer}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
