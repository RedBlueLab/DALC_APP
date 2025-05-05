import { useState } from "react";
import { motion } from "framer-motion";

const analysisData = [
  {
    name: "Emails",
    description: "Customer feedback from various emails after cleaning.",
    headers: ["Customer", "Feedback", "Date"],
    rows: [
      ["John Doe", "Great service!", "2025-04-20"],
      ["Jane Smith", "Not satisfied with product.", "2025-04-21"],
      ["Emily Brown", "Loved the new feature!", "2025-04-22"],
      ["Samantha Ray", "Can’t really remember, lol.", "2025-04-22"],
    ],
    actions: [
      {
        label: "Identify Positive Feedback",
        key: "positive",
        feedback:
          "Great work! Highlighted comments show customer satisfaction — a strong indicator of product or service success.",
        highlightedRows: [0],
      },
      {
        label: "Identify Negative Feedback",
        key: "negative",
        feedback:
          "These responses show dissatisfaction. Identifying them helps prioritize areas that need improvement.",
        highlightedRows: [1],
      },
    ],
  },
  {
    name: "Spreadsheets",
    description:
      "Sales data after cleaning. Identify trends and potential outliers.",
    headers: ["Product", "Sales", "Region", "Date"],
    rows: [
      ["Product A", "100", "North", "2025-04-01"],
      ["Product B", "120", "South", "2025-04-02"],
      ["Product A", "150", "West", "2025-04-03"],
      ["Product C", "200", "East", "2025-04-04"],
      ["Product X", "2000000", "Central", "2025-04-05"],
      ["Product B", "150", "South", "2025-04-06"],
    ],
    actions: [
      {
        label: "Spot Outliers",
        key: "outlier",
        feedback:
          "Well spotted! Product X’s unusually high sales stand out as an outlier — double-check if it's a data error or a special case.",
        highlightedRows: [4],
      },
      {
        label: "Best Performing Product",
        key: "best-product",
        feedback:
          "Awesome! Product B is selling consistently across regions, showing strong performance in the market.",
        highlightedRows: [1, 5],
      },
    ],
  },
  {
    name: "CRM Systems",
    description:
      "Customer data analysis. Investigate purchase trends by region and product.",
    headers: ["Customer", "Region", "Product", "Purchase Amount"],
    rows: [
      ["Jane Doe", "North", "Product A", "$100"],
      ["Sam Lee", "South", "Product B", "$200"],
      ["Mark Green", "North", "Product A", "$150"],
      ["Olivia Brown", "South", "Product X", "$250"],
    ],
    actions: [
      {
        label: "Highest Sales by Region",
        key: "region-sales",
        feedback:
          "Nice! The highest purchase in the South region came from Product X — this could indicate a localized preference.",
        highlightedRows: [3],
      },
      {
        label: "Average Purchase Amount",
        key: "average",
        feedback:
          "Perfect! The average purchase amount is $175. Analyzing average purchases helps you understand typical customer spend and identify valuable customer segments.",
        highlightedRows: [0, 1, 2, 3],
      },
    ],
  },
];

const DataTable = ({ headers, rows, highlightedRows }) => (
  <div className="overflow-x-auto mt-4">
    <table className="min-w-full border text-sm">
      <thead className="bg-gray-100 text-gray-700">
        <tr>
          {headers.map((header, i) => (
            <th key={i} className="px-4 py-2 border">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => (
          <tr
            key={idx}
            className={`${
              highlightedRows.includes(idx)
                ? "bg-yellow-100 text-blue-800 font-semibold"
                : ""
            }`}
          >
            {row.map((cell, i) => (
              <td key={i} className="border px-4 py-2">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Level4 = ({ onNext, onBack, prog }) => {
  const [selectedDatasetIndex, setSelectedDatasetIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [highlightedRows, setHighlightedRows] = useState([]);

  const dataset = analysisData[selectedDatasetIndex];

  const handleAction = (action) => {
    setFeedback(action.feedback);
    setHighlightedRows(action.highlightedRows);
    prog();
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
        Level 4: Analyze the Data
      </h2>
      <p className="text-gray-600 max-w-2xl text-center mb-8">
        After cleaning your data, it’s time to analyze it. Avoid common traps
        like outliers, wrong conclusions, and missing trends.
      </p>

      {/* Dataset Selector */}
      <div className="flex space-x-2 mb-6">
        {analysisData.map((ds, index) => (
          <button
            key={ds.name}
            onClick={() => {
              setSelectedDatasetIndex(index);
              setFeedback("");
              setHighlightedRows([]);
            }}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedDatasetIndex === index
                ? "bg-sky-700 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {ds.name}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="w-full max-w-4xl border p-4 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold mb-2 text-gray-700">
          {dataset.name}
        </h3>
        <p className="text-gray-500 mb-4">{dataset.description}</p>

        <DataTable
          headers={dataset.headers}
          rows={dataset.rows}
          highlightedRows={highlightedRows}
        />

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mt-6">
          {dataset.actions.map((action) => (
            <motion.button
              key={action.key}
              onClick={() => handleAction(action)}
              className="bg-sky-700 text-white px-4 py-2 rounded hover:bg-sky-800 transition-all"
              whileTap={{ scale: 0.95 }}
            >
              {action.label}
            </motion.button>
          ))}
        </div>

        {feedback && (
          <div className="mt-6 text-green-600 text-lg">
            <strong>Feedback:</strong> {feedback}
          </div>
        )}
      </div>

      <div className="mt-10 flex gap-4">
        <motion.button
          onClick={onBack}
          className="bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-700 transition"
        >
          Back
        </motion.button>
        <motion.button
          onClick={onNext}
          className="bg-sky-700 text-white px-6 py-3 rounded hover:bg-sky-800 transition"
        >
          Continue to Level 5
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Level4;
