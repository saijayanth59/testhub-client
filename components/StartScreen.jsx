"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Upload, FileText, AlertCircle, Loader } from "lucide-react"



// This would typically come from your backend
const mockExams= [
  { id: "1", name: "Math Exam.pdf", status: "completed", questionCount: 50, timeLimit: 60, lastUpdated: "2023-05-15" },
  {
    id: "2",
    name: "Science Quiz.pdf",
    status: "processing",
    questionCount: 30,
    timeLimit: 45,
    lastUpdated: "2023-05-14",
  },
  { id: "3", name: "History Test.pdf", status: "error", questionCount: 0, timeLimit: 0, lastUpdated: "2023-05-13" },
  {
    id: "4",
    name: "Literature Exam.pdf",
    status: "completed",
    questionCount: 40,
    timeLimit: 90,
    lastUpdated: "2023-05-12",
  },
]

export default function StartScreen({ onStart, onUpload }) {
  const [exams, setExams] = useState(mockExams)
  const [isDragging, setIsDragging] = useState(false)

  const handleFileUpload = (file) => {
    onUpload(file)

    setExams([
      ...exams,
      {
        id: String(exams.length + 1),
        name: file.name,
        status: "processing",
        questionCount: 0,
        timeLimit: 0,
        lastUpdated: "",
      },
    ])
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0])
    }
  }

  return (
    <motion.div
      className="min-h-screen w-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="bg-white p-12 rounded-3xl shadow-2xl w-full max-w-6xl">
        <h1 className="text-4xl font-bold mb-6 text-indigo-800 text-center">Exam Platform</h1>

        <div
          className={`border-4 border-dashed rounded-xl p-8 text-center mb-8 transition-colors ${
            isDragging ? "border-indigo-500 bg-indigo-100" : "border-gray-300"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">Drag and drop your PDF here, or</p>
          <input
            type="file"
            className="hidden"
            onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
            accept=".pdf"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
          >
            Select PDF
          </label>
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-semibold text-indigo-800 mb-6">Your Exams</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {exams.map((exam) => (
              <motion.div
                key={exam.id}
                className="bg-white border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <FileText className="h-8 w-8 text-indigo-500 mr-3" />
                    <h3 className="text-xl font-semibold text-gray-800">{exam.name}</h3>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      exam.status === "processing"
                        ? "bg-yellow-100 text-yellow-800"
                        : exam.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                  </span>
                </div>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p>Number of questions: {exam.questionCount}</p>
                  <p>Time limit: {exam.timeLimit} minutes</p>
                  <p>Last updated: {exam.lastUpdated}</p>
                </div>
                {exam.status === "completed" && (
                  <button
                    onClick={() => onStart(exam.id)}
                    className="w-full px-4 py-2 bg-indigo-500 text-white text-sm font-medium rounded-md hover:bg-indigo-600 transition-colors"
                  >
                    Start Exam
                  </button>
                )}
                {exam.status === "processing" && (
                  <div className="flex items-center justify-center w-full px-4 py-2 bg-gray-100 text-gray-500 text-sm font-medium rounded-md">
                    <Loader className="h-4 w-4 animate-spin mr-2" />
                    Processing...
                  </div>
                )}
                {exam.status === "error" && (
                  <div className="flex items-center justify-center w-full px-4 py-2 bg-red-100 text-red-500 text-sm font-medium rounded-md">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Error processing exam
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

