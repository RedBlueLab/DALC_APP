import { useEffect } from "react";
import { motion } from "framer-motion";

function Intro({ onStart, prog }) {
  useEffect(() => {
    prog();
  }, [prog]);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 flex flex-col justify-center items-center px-6 py-12 text-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-5xl sm:text-6xl font-extrabold text-sky-800 mb-6 tracking-tight"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        🧠 Dashboard Mayhem
      </motion.h1>

      <motion.p
        className="max-w-2xl text-lg sm:text-xl text-gray-700 leading-relaxed mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Behind every bad business decision, there's a broken data story.
        Dashboards lie. Reports mislead. Metrics confuse.{" "}
        <br className="hidden sm:block" />
        <br />
        You’re the Data Detective. Your job? Cut through the chaos, fix the
        flow, and help this business find the truth — one level at a time.
      </motion.p>

      <motion.button
        onClick={onStart}
        className="rounded-2xl bg-sky-700 px-8 py-4 text-lg sm:text-xl font-semibold text-white hover:bg-sky-800 transition shadow-lg hover:shadow-xl"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        🕵️ Start the Investigation
      </motion.button>
    </motion.div>
  );
}

export default Intro;
