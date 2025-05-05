import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const dataSources = [
  {
    name: "Emails",
    description:
      "Customer feedback and communication are scattered across different email threads. We need to extract the relevant feedback.",
    table: [
      ["Customer", "Feedback", "Date"],
      ["John Doe", "Great service!", "2025-04-20"],
      ["Jane Smith", "Not satisfied with product.", "2025-04-21"],
      ["Emily Brown", "Loved the new feature!", "2025-04-22"],
      ["Dummy User", "xyz123 fake feedback", "2025-04-23"], // Fuzzy data
      ["NaN", "No feedback", "NaN"], // Missing data
      ["Samantha Ray", "Can’t really remember, lol.", "2025-04-22"], // Inconsistent feedback
    ],
    action:
      "Collect all feedback into a central document to understand overall sentiment and issues. Note: Some feedback looks suspicious and might require cleaning.",
  },
  {
    name: "Spreadsheets",
    description:
      "Sales data spread across different Excel sheets needs to be consolidated.",
    table: [
      ["Product", "Sales", "Region", "Date"],
      ["Product A", "100", "North", "2025-04-01"],
      ["Product B", "120", "South", "2025-04-02"],
      ["Product A", "150", "West", "2025-04-03"],
      ["Product C", "Not a number", "East", "2025-04-04"], // Fuzzy data
      ["Product X", "2000000", "Central", "2025-04-05"], // Outlier
      ["Product B", "", "South", "2025-04-06"], // Missing value
    ],
    action:
      "Consolidate the data from all spreadsheets into a single dataset for analysis. Be careful with some values like 'Not a number' and missing sales data.",
  },
  {
    name: "CRM Systems",
    description:
      "Customer data from different regional CRMs needs to be unified to get a clear picture.",
    table: [
      ["Customer", "Region", "Product", "Purchase Amount"],
      ["Jane Doe", "North", "Product A", "$100"],
      ["Sam Lee", "South", "Product B", "$200"],
      ["Mark Green", "North", "Product A", "$150"],
      ["Dummy Customer", "Central", "Product C", "$xyz"], // Fuzzy data
      ["", "North", "Product A", "$250"], // Missing customer name
      ["Olivia Brown", "South", "Product X", "one hundred"], // Inconsistent formatting
    ],
    action:
      "Combine CRM data into one platform to ensure consistency and prevent errors in analysis. Pay attention to entries like missing customer names and inconsistent formats.",
  },
];

function Level2({ onNext, onBack, prog }) {
  useEffect(() => {
    prog();
  }, [prog]);

  const [collectedData, setCollectedData] = useState(
    Array(dataSources.length).fill(false),
  );
  const [markedRows, setMarkedRows] = useState(
    Array(dataSources.length).fill([]),
  ); // To keep track of marked problematic rows

  const handleCollect = (index) => {
    const newCollected = [...collectedData];
    newCollected[index] = true;
    setCollectedData(newCollected);
  };

  const handleRowClick = (sourceIndex, rowIndex) => {
    const newMarkedRows = [...markedRows];
    if (newMarkedRows[sourceIndex].includes(rowIndex)) {
      // Deselect if already marked
      newMarkedRows[sourceIndex] = newMarkedRows[sourceIndex].filter(
        (row) => row !== rowIndex,
      );
    } else {
      // Mark as problematic
      newMarkedRows[sourceIndex].push(rowIndex);
    }
    setMarkedRows(newMarkedRows);
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-white px-6 py-12 text-center"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-[#5270ff]">
        Level 2: Collect Data from the Right Sources
      </h2>

      <p className="text-lg text-gray-700 max-w-2xl mb-8">
        To answer your business question, you need to collect data from the
        right sources. In this step, you'll explore data from various sources
        and decide what data to collect. Be aware — some of the data looks
        suspicious and will need cleaning!
      </p>

      {/* Data Sources */}
      <div className="w-full max-w-4xl">
        {dataSources.map((source, index) => (
          <motion.div
            key={index}
            className={`mb-8 p-6 border rounded-lg shadow-md transition-all duration-300 ${
              collectedData[index]
                ? "bg-[#eef3ff] border-[#5270ff]"
                : "bg-[#f9fafb] border-gray-300"
            }`}
            whileHover={{ scale: 1.02 }}
            onClick={() => handleCollect(index)}
          >
            <h3 className="font-semibold text-xl text-[#5270ff] mb-2">
              {source.name}
            </h3>
            <p className="text-sm text-gray-600 mb-4">{source.description}</p>

            {/* When collected, show the data table */}
            {collectedData[index] && (
              <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse">
                  <thead>
                    <tr className="bg-[#5270ff] text-white">
                      {source.table[0].map((header, idx) => (
                        <th key={idx} className="px-4 py-2">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {source.table.slice(1).map((row, idx) => (
                      <tr
                        key={idx}
                        className={`border-b hover:bg-gray-100 cursor-pointer ${
                          markedRows[index].includes(idx) ? "bg-yellow-300" : ""
                        }`}
                        onClick={() => handleRowClick(index, idx)}
                      >
                        {row.map((cell, cellIdx) => (
                          <td key={cellIdx} className="px-4 py-2">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="mt-4 text-sm text-gray-600">{source.action}</p>
                <p className="mt-2 text-red-600 font-semibold">
                  Warning: Some data looks incorrect and may require cleaning.
                </p>
              </div>
            )}

            {/* If not collected, show action description */}
            {!collectedData[index] && (
              <motion.button
                className="mt-4 bg-[#5270ff] text-white rounded px-6 py-3 hover:bg-blue-800 transition"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click from triggering collect
                  handleCollect(index);
                }}
              >
                Collect Data
              </motion.button>
            )}
          </motion.div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <motion.button
        onClick={onNext}
        className="mt-6 rounded-xl bg-[#5270ff] px-6 py-3 text-white hover:bg-blue-800 transition"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Continue to Level 3 🧑‍💻
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

export default Level2;
