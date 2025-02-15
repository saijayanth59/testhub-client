"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

export default function Timer({ timeRemaining }) {
  const [minutes, setMinutes] = useState(Math.floor(timeRemaining / 60));
  const [seconds, setSeconds] = useState(timeRemaining % 60);

  useEffect(() => {
    setMinutes(Math.floor(timeRemaining / 60));
    setSeconds(timeRemaining % 60);
  }, [timeRemaining]);

  return (
    <motion.div
      className="flex items-center bg-white rounded-full px-4 py-2 shadow-md"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Clock className="w-5 h-5 text-indigo-600 mr-2" />
      <div className="text-xl font-semibold text-indigo-800">
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </div>
    </motion.div>
  );
}
