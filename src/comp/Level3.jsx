import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const dirtyData = [
  {
    name: "Emails",
    description:
      "Customer feedback from various emails is full of inconsistencies and missing information.",
    table: [
      ["Customer", "Feedback", "Date"],
      ["John Doe", "Great service!", "2025-04-20"],
      ["Jane Smith", "Not satisfied with product.", "2025-04-21"],
      ["Emily Brown", "Loved the new feature!", "2025-04-22"],
      ["Dummy User", "xyz123 fake feedback", "2025-04-23"], // Problematic
      ["NaN", "No feedback", "NaN"], // Missing data
      ["Samantha Ray", "Can’t really remember, lol.", "2025-04-22"], // Inconsistent
    ],
    action: "Click on the problematic feedback and select the proper action.",
  },
  {
    name: "Spreadsheets",
    description:
      "Sales data is full of errors, including outliers, missing values, and incorrect entries.",
    table: [
      ["Product", "Sales", "Region", "Date"],
      ["Product A", "100", "North", "2025-04-01"],
      ["Product B", "120", "South", "2025-04-02"],
      ["Product A", "150", "West", "2025-04-03"],
      ["Product C", "Not a number", "East", "2025-04-04"], // Problematic
      ["Product X", "2000000", "Central", "2025-04-05"], // Outlier
      ["Product B", "", "South", "2025-04-06"], // Missing value
    ],
    action: "Fix the invalid entries or outliers in the data.",
  },
  {
    name: "CRM Systems",
    description:
      "Customer data is inconsistent with missing fields and incorrect formatting.",
    table: [
      ["Customer", "Region", "Product", "Purchase Amount"],
      ["Jane Doe", "North", "Product A", "$100"],
      ["Sam Lee", "South", "Product B", "$200"],
      ["Mark Green", "North", "Product A", "$150"],
      ["Dummy Customer", "Central", "Product C", "$xyz"], // Problematic
      ["", "North", "Product A", "$250"], // Missing customer name
      ["Olivia Brown", "South", "Product X", "one hundred"], // Inconsistent format
    ],
    action: "Clean the CRM data by handling missing and incorrect values.",
  },
];

function Level3({ onNext, onBack, prog }) {
  useEffect(() => {
    prog();
  }, [prog]);

  const [cleanedData, setCleanedData] = useState(
    Array(dirtyData.length).fill(false),
  );
  const [data, setData] = useState(dirtyData);
  const [fixReasons, setFixReasons] = useState([]);
  const [removeReasons, setRemoveReasons] = useState([]);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleFix = (index, action) => {
    const updatedData = [...data];
    const newFixReasons = [...fixReasons];
    const newFeedbackMessage = `Data for "${updatedData[index].name}" has been fixed successfully.`;

    // Modify the data based on the selected action (Fix)
    if (action === "Fix") {
      updatedData[index].table = updatedData[index].table.map((row) => {
        return row.map((cell) => {
          let fixedCell = cell;
          let reason = null;

          // Fix common issues
          if (cell === "NaN" || cell === "") {
            fixedCell = "Missing Data";
            reason =
              "Replaced 'NaN' with 'Missing Data' to indicate a blank entry.";
          } else if (cell === "Not a number") {
            fixedCell = "Valid Number";
            reason = "Replaced 'Not a number' with a valid placeholder.";
          } else if (cell === "xyz123 fake feedback") {
            fixedCell = "Valid feedback";
            reason = "Replaced fake feedback with a valid response.";
          } else if (cell === "one hundred") {
            fixedCell = "$100";
            reason =
              "Replaced inconsistent format with a correct dollar amount.";
          }

          if (reason) {
            newFixReasons.push(reason);
          }

          return fixedCell;
        });
      });
    }

    // Update the state with the fixed data
    setData(updatedData);

    const newCleanedData = [...cleanedData];
    newCleanedData[index] = true;
    setCleanedData(newCleanedData);
    setFixReasons(newFixReasons);
    setFeedbackMessage(newFeedbackMessage);
  };

  const handleRemoveInvalid = (index) => {
    const updatedData = [...data];
    const newRemoveReasons = [...removeReasons];
    const newFeedbackMessage = `Invalid entries for "${updatedData[index].name}" have been removed successfully.`;

    // Remove invalid rows (rows with missing or incorrect data)
    updatedData[index].table = updatedData[index].table.filter((row) =>
      row.every(
        (cell) => cell !== "" && cell !== "NaN" && cell !== "Not a number",
      ),
    );

    // Reason for removal
    newRemoveReasons.push(
      "Removed invalid entry due to missing or incorrect data.",
    );

    // Update the state with the modified data
    setData(updatedData);

    const newCleanedData = [...cleanedData];
    newCleanedData[index] = true;
    setCleanedData(newCleanedData);
    setRemoveReasons(newRemoveReasons);
    setFeedbackMessage(newFeedbackMessage);
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
        Level 3: Clean Dirty Data
      </h2>

      <p className="text-lg text-gray-700 max-w-2xl mb-8">
        In this level, you will clean up the data by fixing errors, removing
        invalid values, and handling outliers. Take action to clean the data!
      </p>

      {/* Display Feedback Message */}
      {feedbackMessage && (
        <motion.div
          className="bg-green-100 text-green-700 p-4 rounded-lg mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <span>{feedbackMessage}</span>
        </motion.div>
      )}

      {/* Data Sources */}
      <div className="w-full max-w-4xl">
        {data.map((source, index) => (
          <motion.div
            key={index}
            className={`mb-8 p-6 border rounded-lg shadow-md transition-all duration-300 ${
              cleanedData[index]
                ? "bg-[#eef3ff] border-[#5270ff]"
                : "bg-[#f9fafb] border-gray-300"
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="font-semibold text-xl text-[#5270ff] mb-2">
              {source.name}
            </h3>
            <p className="text-sm text-gray-600 mb-4">{source.description}</p>

            {/* When cleaned, show the cleaned table */}
            {cleanedData[index] ? (
              <div>
                <h4 className="font-semibold text-lg mb-4">Data Cleaned!</h4>
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
                      <tr key={idx} className="border-b">
                        {row.map((cell, cellIdx) => (
                          <td
                            key={cellIdx}
                            className={`px-4 py-2 ${
                              cell === "Fixed Value" ? "bg-green-200" : ""
                            }`}
                          >
                            {cell === "Fixed Value" ? (
                              <span className="text-green-600">Fixed</span>
                            ) : (
                              cell
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="mt-4 text-sm text-gray-600">{source.action}</p>
              </div>
            ) : (
              <div>
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
                        className="border-b hover:bg-gray-100 cursor-pointer"
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
                <div className="mt-4 flex space-x-4">
                  <motion.button
                    className="bg-[#5270ff] text-white rounded px-6 py-3 hover:bg-blue-800 transition"
                    onClick={() => handleFix(index, "Fix")}
                    disabled={cleanedData[index]} // Disable button after fixing
                  >
                    Fix Data
                  </motion.button>
                  <motion.button
                    className="bg-red-500 text-white rounded px-6 py-3 hover:bg-red-600 transition"
                    onClick={() => handleRemoveInvalid(index)}
                    disabled={cleanedData[index]} // Disable button after removal
                  >
                    Remove Invalid
                  </motion.button>
                </div>
              </div>
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
        Continue to Level 4 📊
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

export default Level3;
