import React, { useState } from 'react';

const EvaluateRule = () => {
  const [evaluateInput, setEvaluateInput] = useState('');

  const handleEvaluateSubmit = (e) => {
    e.preventDefault();
    console.log('Evaluating JSON:', evaluateInput);
  };

  return (
    <form onSubmit={handleEvaluateSubmit} className="space-y-6">
      <div className="space-y-3">
        <label 
          htmlFor="evaluateInput" 
          className="block text-black text-lg font-medium"
        >
          Enter JSON
        </label>
        <textarea
          id="evaluateInput"
          value={evaluateInput}
          onChange={(e) => setEvaluateInput(e.target.value)}
          className="w-full px-6 py-4 rounded bg-gray-100 text-black text-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-black min-h-[200px] resize-y"
          placeholder="Type your JSON here..."
        />
      </div>
      <button
        type="submit"
        className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors duration-200 text-lg"
      >
        Evaluate
      </button>
    </form>
  );
};

export default EvaluateRule;