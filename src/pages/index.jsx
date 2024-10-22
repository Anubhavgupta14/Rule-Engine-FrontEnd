import React, { useState } from "react";
import CreateRule from "../../components/CreateRule";
import EvaluateRule from "../../components/EvaluateRule";
import {createRule,evaluateRule} from "../pages/api/Endpoints"
import toast, { Toaster } from 'react-hot-toast';

const App = () => {
  const [activeTab, setActiveTab] = useState("create");
  const [ruleInput, setRuleInput] = useState("");
  const [evaluateInput, setEvaluateInput] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const handleEvaluateSubmit = async(e) => {
    e.preventDefault();
    try{
      setIsLoading(true)
      const parsedInput = JSON.parse(evaluateInput);
      const res = await evaluateRule({userData:parsedInput})
      if(res?.eligible){
        toast.success("Congratulations you are Eligible")
      }
      else{
        toast.error("Sorry but you are not eligible")
      }
    }
    catch(err){
      console.log(err);
    }
    finally{
      setIsLoading(false)
    }
  };

  const handleRuleSubmit = async(e) => {
    e.preventDefault();
    try{
      setIsLoading(true)
      const res = await createRule({rule:ruleInput})
      if(res?.message){
        toast.success("Rule successfully created")
      }
    }
    catch(err){
      console.log(err);
    }
    finally{
      setIsLoading(false)
    }
  };

  return (
    <>
    <Toaster />
    <div className="min-h-screen bg-black flex flex-col">
      <header className="w-full py-6 text-center border-b border-gray-800">
        <h1 className="text-3xl font-bold text-white">Rule Engine with AST</h1>
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-3/4 max-w-3xl bg-white rounded-lg shadow-lg">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("create")}
              className={`flex-1 py-4 text-lg font-medium transition-colors duration-200 
                ${
                  activeTab === "create"
                    ? "bg-white text-black border-b-2 border-black"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              Create Rule
            </button>
            <button
              onClick={() => setActiveTab("evaluate")}
              className={`flex-1 py-4 text-lg font-medium transition-colors duration-200 
                ${
                  activeTab === "evaluate"
                    ? "bg-white text-black border-b-2 border-black"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              Evaluate
            </button>
          </div>

          <div className="p-8">
            {activeTab === "create" ? (
              <CreateRule
                handleRuleSubmit={handleRuleSubmit}
                ruleInput={ruleInput}
                setRuleInput={setRuleInput}
                isLoading={isLoading}
              />
            ) : (
              <EvaluateRule
                evaluateInput={evaluateInput}
                setEvaluateInput={setEvaluateInput}
                handleEvaluateSubmit={handleEvaluateSubmit}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 text-center border-t border-gray-800">
        <a
          href="https://www.linkedin.com/in/anubhavgupta14"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-300 transition-colors duration-200"
        >
          Created by Anubhav Gupta
        </a>
      </footer>
    </div>
    </>
  );
};

export default App;
