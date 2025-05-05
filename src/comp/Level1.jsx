import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const questionPairs = [
  {
    bad: "Why are sales low?",
    good: "Which product category dropped the most in the last quarter?",
  },
  {
    bad: "Is marketing working?",
    good: "Which campaign brought the highest conversion last month?",
  },
  {
    bad: "How’s the team doing?",
    good: "How many support tickets were closed within SLA last week?",
  },
];

function Level1({ onNext, onBack, prog }) {
  useEffect(() => {
    prog();
  }, [prog]);

  const [revealed, setRevealed] = useState(
    Array(questionPairs.length).fill(false),
  );

  const handleReveal = (index) => {
    const newRevealed = [...revealed];
    newRevealed[index] = true;
    setRevealed(newRevealed);
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-white px-6 py-12 text-center"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-[#5270ff]">
        Level 1: Ask Better Questions
      </h2>

      <p className="text-lg text-gray-700 max-w-2xl mb-8">
        Bad data starts with bad questions. Tap each to reveal how small wording
        changes lead to better decisions.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl w-full mb-10">
        {questionPairs.map((q, index) => (
          <motion.div
            key={index}
            className={`cursor-pointer border rounded-xl p-6 shadow-sm transition-all duration-300 ${
              revealed[index]
                ? "bg-[#eef3ff] text-[#5270ff] border-[#5270ff]"
                : "bg-[#ffefef] text-[#ff5656] border-[#ff5656]"
            }`}
            whileHover={{ scale: 1.03 }}
            onClick={() => handleReveal(index)}
          >
            <p className="font-semibold text-lg mb-2">
              {revealed[index] ? "✅ Better Question" : "❌ Vague Question"}
            </p>
            <p className="text-sm">{revealed[index] ? q.good : q.bad}</p>
          </motion.div>
        ))}
      </div>

      <motion.button
        onClick={onNext}
        className="mt-4 rounded-xl bg-[#5270ff] px-6 py-3 text-white hover:bg-blue-800 transition"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Continue to Level 2 🚀
      </motion.button>

      <motion.button
        onClick={onBack}
        className="mt-4 rounded-xl bg-[#000000] px-6 py-3 text-white hover:bg-gray-800 transition"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Back ⏪
      </motion.button>
    </motion.div>
  );
}

export default Level1;
