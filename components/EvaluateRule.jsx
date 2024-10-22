import React, { useState } from 'react';

const EvaluateRule = ({evaluateInput, setEvaluateInput, handleEvaluateSubmit, isLoading}) => {

  return (
    <form onSubmit={handleEvaluateSubmit} className="space-y-6">
      <div className="space-y-3">
        <div 
          htmlFor="evaluateInput" 
          className="block text-black text-lg font-medium rule-h"
        >
          Enter JSON
        </div>
        <textarea
          id="evaluateInput"
          value={evaluateInput}
          onChange={(e) => setEvaluateInput(e.target.value)}
          className="w-full px-6 py-4 rounded bg-gray-100 text-black text-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-black min-h-[200px] resize-y text"
          placeholder="Type your JSON here..."
        />
      </div>
      <button
        type="submit"
        disabled={evaluateInput.length>0 ? false:true}
        className={`w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors duration-200 text-lg btn ${evaluateInput.length==0 && "pointer-not"}`}
      >
        {isLoading ?
        "Loading..."
        : 
        "Evaluate"
        }
      </button>
    </form>
  );
};

export default EvaluateRule;
