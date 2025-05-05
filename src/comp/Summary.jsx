// Level7.jsx
import { motion } from "framer-motion";

const Level7 = ({ onRestart, onBack, prog }) => {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-green-200 px-6 text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-4xl font-bold text-green-800 mb-4">
        🎉 Mission Complete!
      </h1>

      <p className="text-lg text-green-900 max-w-xl mb-6">
        You’ve guided the business from confusion to clarity. From asking the
        right questions to making predictions with machine learning — you've
        completed the data journey like a true Data Detective. 🕵️‍♂️📊
      </p>

      <div className="bg-white rounded-xl shadow-md px-6 py-6 mb-8 text-left text-green-800 max-w-xl w-full">
        <h3 className="text-xl font-semibold mb-4">🌱 What You’ve Learned</h3>
        <ul className="space-y-2">
          <li>✅ Level 1: Asked the right business questions</li>
          <li>✅ Level 2: Collected clean and useful data</li>
          <li>✅ Level 3: Cleaned and prepared your dataset</li>
          <li>✅ Level 4: Analyzed insights and found outliers</li>
          <li>✅ Level 5: Chose visuals that tell clear stories</li>
          <li>✅ Level 6: Built a basic ML model and made predictions</li>
        </ul>
      </div>

      <div className="bg-sky-50 border-l-4 border-sky-400 shadow-sm rounded p-4 text-gray-700 mb-8 max-w-xl">
        <p className="text-lg italic">
          "Machine learning is just the tip of the iceberg. The real power lies
          in data clarity, understanding, and storytelling."
        </p>
      </div>

      <div className="text-center mb-10">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          📊 Your Progress
        </h3>
        <p className="text-gray-500">
          You completed all 6 levels — solid foundations in data analysis and
          ML!
        </p>
      </div>

      <div className="flex gap-4">
        <motion.button
          onClick={onRestart}
          className="bg-green-700 text-white px-6 py-3 rounded hover:bg-green-800 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🔁 Restart Journey
        </motion.button>
        <motion.button
          onClick={onBack}
          className="rounded bg-sky-700 px-6 py-3 text-white hover:bg-sky-800 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ⏪ Back
        </motion.button>
        <motion.button
          className="rounded bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700 transition"
          onClick={() =>
            alert("Coming soon! Export as PDF or share your journey.")
          }
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          📥 Export Summary
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Level7;
