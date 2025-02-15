import { motion } from "framer-motion";

export default function ProgressBar({ progress }) {
  return (
    <div className="w-full h-2 bg-gray-200 rounded-full mb-8">
      <motion.div
        className="h-full bg-blue-500 rounded-full"
        style={{ width: `${progress}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
}
