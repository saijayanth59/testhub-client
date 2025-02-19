"use client";

import { useState } from "react";
import { Upload } from "lucide-react";

export default function UploadPdf() {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = (file) => {
    console.log(file.name);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-6 text-indigo-800 text-center">
        Exam Platform
      </h1>

      <div
        className={`border-4 border-dashed rounded-xl p-8 text-center mb-8 transition-colors ${
          isDragging ? "border-indigo-500 bg-indigo-100" : "border-gray-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          Drag and drop your PDF here, or
        </p>
        <input
          type="file"
          className="hidden"
          onChange={(e) =>
            e.target.files && handleFileUpload(e.target.files[0])
          }
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
    </>
  );
}
