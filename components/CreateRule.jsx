import React, { useState } from "react";

const CreateRule = ({
  ruleInput,
  setRuleInput,
  handleRuleSubmit,
  isLoading,
  isEdit,
  setIsEdit,
  deleteARule
}) => {
  return (
    <form onSubmit={handleRuleSubmit} className="space-y-6">
      <div className="space-y-3">
        <div
          htmlFor="ruleInput"
          style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}
          className="block text-black text-lg font-medium rule-h"
        >
          <p>Enter Rule</p>
          {isEdit && 
          <p style={{color:"red", cursor:'pointer'}} onClick={()=>{deleteARule()}}>Delete Rule</p>
          }
        </div>
        <textarea
          id="ruleInput"
          value={ruleInput}
          onChange={(e) => setRuleInput(e.target.value)}
          className="w-full px-6 py-4 rounded bg-gray-100 text-black text-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-black min-h-[200px] resize-y text"
          placeholder="Type your rule here..."
        />
      </div>
      <button
        type="submit"
        disabled={ruleInput?.length > 0 ? false : true}
        className={`w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors duration-200 text-lg btn ${
          ruleInput?.length == 0 && "pointer-not"
        }`}
      >
        {isLoading ? "Loading..." : `${isEdit ? "Update Rule" : "Create Rule"}`}
      </button>
      {isEdit && (
        <button
          onClick={() => {
            setIsEdit(null);
            setRuleInput("");
          }}
          style={{ marginTop: "10px", border: "1px solid", color: "black" }}
          className={`w-full bg-white text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors duration-200 text-lg btn ${
            ruleInput?.length == 0 && "pointer-not"
          }`}
        >
          Create New Rule
        </button>
      )}
    </form>
  );
};

export default CreateRule;
