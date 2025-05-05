import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Intro from "./comp/Intro";
import Level1 from "./comp/Level1";
import Level2 from "./comp/Level2";
import Level3 from "./comp/Level3";
import Level4 from "./comp/Level4";
import Level5 from "./comp/Level5";
import Level6 from "./comp/Level6";
import Summary from "./comp/Summary";

function App() {
  const [stage, setStage] = useState("intro");
  const [progress, setProgress] = useState(0);

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-200">
        <div
          className="h-2 bg-sky-600 transition-all duration-100"
          style={{ width: `${progress * 100}%` }}
        ></div>
      </div>

      {/* Animated content */}
      <div className="flex-grow">
        <AnimatePresence mode="wait">
          {stage === "intro" && (
            <Intro
              key="intro"
              prog={() => setProgress(1 / 8)}
              onStart={() => setStage("level1")}
            />
          )}
          {stage === "level1" && (
            <Level1
              key="level1"
              prog={() => setProgress(2 / 8)}
              onNext={() => setStage("level2")}
              onBack={() => setStage("intro")}
            />
          )}
          {stage === "level2" && (
            <Level2
              key="level2"
              prog={() => setProgress(3 / 8)}
              onNext={() => setStage("level3")}
              onBack={() => setStage("level1")}
            />
          )}
          {stage === "level3" && (
            <Level3
              key="level3"
              prog={() => setProgress(4 / 8)}
              onNext={() => setStage("level4")}
              onBack={() => setStage("level2")}
            />
          )}
          {stage === "level4" && (
            <Level4
              key="level4"
              prog={() => setProgress(5 / 8)}
              onNext={() => setStage("level5")}
              onBack={() => setStage("level3")}
            />
          )}
          {stage === "level5" && (
            <Level5
              key="level5"
              prog={() => setProgress(6 / 8)}
              onNext={() => setStage("level6")}
              onBack={() => setStage("level4")}
            />
          )}
          {stage === "level6" && (
            <Level6
              key="level6"
              prog={() => setProgress(7 / 8)}
              onNext={() => setStage("summary")}
              onBack={() => setStage("level5")}
            />
          )}
          {stage === "summary" && (
            <Summary
              key="summary"
              prog={() => setProgress(8 / 8)}
              onRestart={() => setStage("intro")}
              onBack={() => setStage("level6")}
            />
          )}
        </AnimatePresence>
      </div>

      <footer className="w-full flex items-center justify-between px-6 py-3 bg-white shadow-sm mt-auto">
        <a
          href="https://www.redbluelab.com" // Replace with your real URL
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 hover:opacity-90 transition"
        >
          <img
            src="/logo.png" // Adjust path if needed
            alt="RedBlueLab Logo"
            className="h-8 w-auto"
          />
          <span className="text-sm text-gray-600 font-medium">RedBlueLab</span>
        </a>

        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
