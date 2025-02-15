import { motion } from "framer-motion"
import { CheckCircle, Flag, HelpCircle, AlertCircle } from "lucide-react"


export default function Sidebar({ questions, currentIndex, setCurrentIndex, answers, reviewFlags }) {
  const answeredCount = answers.filter((answer) => answer !== null).length
  const reviewCount = reviewFlags.filter((flag) => flag).length
  const unansweredCount = questions.length - answeredCount

  return (
    <motion.div
      className="w-72 bg-indigo-900 text-white p-6 overflow-y-auto flex flex-col"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <h2 className="text-2xl font-bold mb-6">Questions</h2>
      <div className="grid grid-cols-5 gap-2 mb-6">
        {questions.map((question, index) => (
          <motion.button
            key={question.id}
            className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-semibold ${
              index === currentIndex
                ? "bg-indigo-500 text-white"
                : answers[index]
                  ? "bg-green-500 text-white"
                  : reviewFlags[index]
                    ? "bg-yellow-500 text-indigo-900"
                    : "bg-indigo-700 text-indigo-200"
            } hover:bg-indigo-400 transition-colors duration-200`}
            onClick={() => setCurrentIndex(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {index + 1}
          </motion.button>
        ))}
      </div>
      <div className="mt-auto">
        <h3 className="text-lg font-semibold mb-4 text-indigo-300">Summary</h3>
        <div className="space-y-3">
          <SummaryItem icon={CheckCircle} label="Answered" count={answeredCount} color="text-green-400" />
          <SummaryItem icon={Flag} label="For Review" count={reviewCount} color="text-yellow-400" />
          <SummaryItem icon={HelpCircle} label="Not Answered" count={unansweredCount} color="text-gray-400" />
          <SummaryItem icon={AlertCircle} label="Total Questions" count={questions.length} color="text-indigo-300" />
        </div>
      </div>
    </motion.div>
  )
}


function SummaryItem({ icon: Icon, label, count, color }) {
  return (
    <div className="flex items-center justify-between bg-indigo-800 rounded-lg p-3">
      <div className="flex items-center">
        <Icon className={`w-5 h-5 ${color} mr-2`} />
        <span className="text-sm">{label}</span>
      </div>
      <span className={`font-semibold ${color}`}>{count}</span>
    </div>
  )
}

