// Level5.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  // eslint-disable-next-line no-unused-vars
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const chartPairs = [
  {
    id: "y-axis",
    title: "Y-Axis Manipulation",
    description: "Which chart presents the data more accurately?",
    data: [
      { name: "Jan", value: 100 },
      { name: "Feb", value: 105 },
      { name: "Mar", value: 110 },
    ],
    badChart: (data) => (
      <BarChart data={data} width={300} height={200}>
        <XAxis dataKey="name" />
        <YAxis domain={[100, 110]} />
        <Tooltip />
        <Bar dataKey="value" fill="#ff5656" />
      </BarChart>
    ),
    goodChart: (data) => (
      <BarChart data={data} width={300} height={200}>
        <XAxis dataKey="name" />
        <YAxis domain={[0, 120]} />
        <Tooltip />
        <Bar dataKey="value" fill="#5270ff" />
      </BarChart>
    ),
    feedback: {
      good: "Correct! The second chart shows a fair comparison starting from zero.",
      bad: "Not quite — the first chart exaggerates small differences by cutting the y-axis.",
    },
  },
  {
    id: "pie-overload",
    title: "Pie Chart Overload",
    description: "Which visualization is easier to interpret?",
    data: [
      { name: "Product A", value: 400 },
      { name: "Product B", value: 300 },
      { name: "Product C", value: 200 },
      { name: "Product D", value: 150 },
      { name: "Product E", value: 100 },
    ],
    badChart: (data) => (
      <PieChart width={300} height={200}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#ff5656"
          label
        >
          {data.map((_, i) => (
            <Cell key={`cell-${i}`} fill="#ff5656" />
          ))}
        </Pie>
      </PieChart>
    ),
    goodChart: (data) => (
      <BarChart width={300} height={200} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#5270ff" />
      </BarChart>
    ),
    feedback: {
      good: "Great choice! Bar charts work better when comparing multiple categories.",
      bad: "Too many slices make it hard to read — try bar charts for comparison.",
    },
  },
  {
    id: "outlier-distortion",
    title: "Outlier Distortion",
    description: "How does an outlier affect perception?",
    data: [
      { name: "Product A", value: 150 },
      { name: "Product B", value: 160 },
      { name: "Product X", value: 2000000 },
    ],
    badChart: (data) => (
      <BarChart data={data} width={300} height={200}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#ff5656" />
      </BarChart>
    ),
    goodChart: (data) => (
      <BarChart data={data.slice(0, 2)} width={300} height={200}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#5270ff" />
      </BarChart>
    ),
    feedback: {
      good: "Well done! Removing extreme outliers helps reveal true trends in regular data.",
      bad: "Watch out! That outlier skews the entire scale and hides useful insights.",
    },
  },
  {
    id: "color-misuse",
    title: "Color Misuse",
    description: "Which color scheme makes comparison easier?",
    data: [
      { name: "A", value: 100 },
      { name: "B", value: 110 },
      { name: "C", value: 105 },
    ],
    badChart: (data) => (
      <BarChart data={data} width={300} height={200}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value">
          {data.map((_, i) => (
            <Cell key={i} fill={["#ff0000", "#00ff00", "#0000ff"][i % 3]} />
          ))}
        </Bar>
      </BarChart>
    ),
    goodChart: (data) => (
      <BarChart data={data} width={300} height={200}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#5270ff" />
      </BarChart>
    ),
    feedback: {
      good: "Correct! A single color keeps focus on the values, not the colors.",
      bad: "Too many colors distract the viewer and suggest differences where there may be none.",
    },
  },
];

const Level5 = ({ onNext, onBack }) => {
  const [selectedPairIndex, setSelectedPairIndex] = useState(0);
  const [selection, setSelection] = useState(null);
  const pair = chartPairs[selectedPairIndex];

  const handleSelect = (type) => {
    setSelection(type);
  };

  return (
    <motion.div
      className="min-h-screen bg-white px-4 py-10 flex flex-col items-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Level 5: Visualize the Data
      </h2>
      <p className="text-gray-600 max-w-2xl text-center mb-8">
        A great chart communicates insights clearly. Poor visualizations can
        mislead or confuse. Choose the better chart in each pair.
      </p>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-700">
          {pair.title}
        </h3>
        <p className="text-gray-500 mb-4">{pair.description}</p>
        <div className="flex gap-4">
          <div
            onClick={() => handleSelect("bad")}
            className={`cursor-pointer border rounded-xl p-2 shadow-md transition ${
              selection === "bad" ? "ring-2 ring-red-400" : "hover:ring-1"
            }`}
          >
            <p className="text-center text-sm text-gray-600 mb-2">Chart A</p>
            {pair.badChart(pair.data)}
          </div>
          <div
            onClick={() => handleSelect("good")}
            className={`cursor-pointer border rounded-xl p-2 shadow-md transition ${
              selection === "good" ? "ring-2 ring-green-400" : "hover:ring-1"
            }`}
          >
            <p className="text-center text-sm text-gray-600 mb-2">Chart B</p>
            {pair.goodChart(pair.data)}
          </div>
        </div>
        {selection && (
          <div className="mt-6 text-lg text-gray-700">
            <strong>Feedback:</strong>{" "}
            {selection === "good" ? pair.feedback.good : pair.feedback.bad}
          </div>
        )}
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={onBack}
          className="bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-700"
        >
          Back
        </button>
        {selectedPairIndex < chartPairs.length - 1 ? (
          <button
            onClick={() => {
              setSelectedPairIndex((prev) => prev + 1);
              setSelection(null);
            }}
            className="bg-sky-700 text-white px-6 py-3 rounded hover:bg-sky-800"
          >
            Next Example
          </button>
        ) : (
          <button
            onClick={onNext}
            className="bg-sky-700 text-white px-6 py-3 rounded hover:bg-sky-800"
          >
            Continue to Level 6
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default Level5;
