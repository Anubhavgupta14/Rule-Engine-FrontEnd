import React, { useState } from 'react';

const CreateRule = () => {
  const [ruleInput, setRuleInput] = useState('');

  const handleRuleSubmit = (e) => {
    e.preventDefault();
    console.log('Creating Rule:', ruleInput);
  };

  return (
    <form onSubmit={handleRuleSubmit} className="space-y-6">
      <div className="space-y-3">
        <label 
          htmlFor="ruleInput" 
          className="block text-black text-lg font-medium"
        >
          Enter Rule
        </label>
        <textarea
          id="ruleInput"
          value={ruleInput}
          onChange={(e) => setRuleInput(e.target.value)}
          className="w-full px-6 py-4 rounded bg-gray-100 text-black text-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-black min-h-[200px] resize-y"
          placeholder="Type your rule here..."
        />
      </div>
      <button
        type="submit"
        className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors duration-200 text-lg"
      >
        Create Rule
      </button>
    </form>
  );
};

export default CreateRule;