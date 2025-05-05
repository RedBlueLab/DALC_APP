// Level6.jsx
import { useState } from "react";
import { motion } from "framer-motion";

const mockData = [
  { age: 25, income: 30000, purchased: false },
  { age: 35, income: 50000, purchased: true },
  { age: 45, income: 70000, purchased: true },
  { age: 22, income: 20000, purchased: false },
];

const buildSimpleModel = (data) => {
  // Step 1: Clean data (skip for simplicity)
  // Step 2: Define basic rule: if income > 40000 and age > 30 -> likely to purchase
  return (age, income) => {
    if (income > 40000 && age > 30) return true;
    return false;
  };
};

const model = buildSimpleModel(mockData);

const Level6 = ({ onNext, onBack }) => {
  const [age, setAge] = useState(30);
  const [income, setIncome] = useState(40000);
  const [prediction, setPrediction] = useState(null);
  const [feedback, setFeedback] = useState("");

  const handlePredict = () => {
    const result = model(age, income);
    setPrediction(result);
    setFeedback(
      result
        ? "✔️ Based on the pattern we observed in the data, this person is likely to purchase."
        : "❌ Based on the data, this person is unlikely to purchase right now.",
    );
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
        Level 6: Predict with Machine Learning
      </h2>
      <p className="text-gray-600 max-w-2xl text-center mb-8">
        Machine Learning starts *after* understanding the business question and
        preparing the data. Here, we simulate building a simple model based on a
        few examples.
      </p>

      <div className="mb-6 text-left max-w-md w-full">
        <h3 className="text-xl font-semibold mb-2 text-gray-700">
          Step 1: Review the data
        </h3>
        <ul className="text-gray-600 list-disc pl-5 mb-4">
          {mockData.map((d, i) => (
            <li key={i}>
              Age: {d.age}, Income: ${d.income.toLocaleString()}, Purchased:{" "}
              {d.purchased ? "Yes" : "No"}
            </li>
          ))}
        </ul>

        <h3 className="text-xl font-semibold mb-2 text-gray-700">
          Step 2: Build the Model
        </h3>
        <p className="text-gray-600 mb-4">
          We observed that people over 30 years old with income over $40,000 are
          more likely to purchase. This is a basic rule we use as our prediction
          model.
        </p>

        <h3 className="text-xl font-semibold mb-2 text-gray-700">
          Step 3: Try It Yourself
        </h3>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Age: {age}
          </label>
          <input
            type="range"
            min="18"
            max="65"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Income: ${income.toLocaleString()}
          </label>
          <input
            type="range"
            min="10000"
            max="100000"
            step="1000"
            value={income}
            onChange={(e) => setIncome(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        <button
          onClick={handlePredict}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Predict Purchase
        </button>

        {prediction !== null && (
          <div className="mt-4 p-4 bg-gray-100 rounded text-gray-800">
            <strong>Prediction:</strong>{" "}
            {prediction ? "Likely to Purchase ✅" : "Unlikely to Purchase ❌"}
            <p className="mt-2">{feedback}</p>
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
        <button
          onClick={onNext}
          className="bg-sky-700 text-white px-6 py-3 rounded hover:bg-sky-800"
        >
          Finish Level
        </button>
      </div>
    </motion.div>
  );
};

export default Level6;
