import React from "react";
import { motion } from "framer-motion";
import UploadPdf from "@/components/home/UploadPdf";
import ListExams from "@/components/home/ListExams";

export default function HomeWrapper() {
  return (
    <motion.div
      className="min-h-screen w-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="bg-white p-12 rounded-3xl shadow-2xl w-full max-w-6xl">
        <UploadPdf />

        <ListExams />
      </div>
    </motion.div>
  );
}
