import React, { useState, useEffect } from "react";
import CreateRule from "../../components/CreateRule";
import EvaluateRule from "../../components/EvaluateRule";
import {
  createRule,
  evaluateRule,
  getData,
  getDataSingle,
  editRule,
  deleteRule
} from "../pages/api/Endpoints";
import toast, { Toaster } from "react-hot-toast";
import { formatToIST } from "../../utils/Utils";

const App = () => {
  const [activeTab, setActiveTab] = useState("create");
  const [ruleInput, setRuleInput] = useState("");
  const [evaluateInput, setEvaluateInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [jsonError, setJsonError] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [existingRules, setExistingRules] = useState([]);
  const [isEdit, setIsEdit] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isDrawerOpen &&
        !event.target.closest(".drawer") &&
        !event.target.closest(".hamburger-menu")
      ) {
        setIsDrawerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDrawerOpen]);

  useEffect(() => {
    fetchExistingData();
  }, [isEdit, isUpdate]);

  const fetchExistingData = async () => {
    try {
      const res = await getData();
      if (res?.data) {
        setExistingRules(res?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEvaluateSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const parsedInput = JSON.parse(evaluateInput);
      setJsonError("");
      const res = await evaluateRule({ userData: parsedInput });
      if (res?.eligible) {
        toast.success("Congratulations you are Eligible");
      } else {
        toast.error("Sorry but you are not eligible");
      }
    } catch (err) {
      setJsonError("Invalid JSON. Please try again");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRuleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      let res = {};
      if (isEdit) {
        res = await editRule({ rule: ruleInput, _id: isEdit });
      } else {
        res = await createRule({ rule: ruleInput });
      }
      if (res?.message) {
        if (isEdit) {
          toast.success("Rule successfully updated");
          setIsEdit(null)
          setRuleInput("")
        } else {
          toast.success("Rule successfully created");
        }
      } else if (res?.error) {
        toast.error(res?.error);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSingleRule = async (id) => {
    try {
      const res = await getDataSingle({ id: id });
      if (res?.data) {
        setIsEdit(res?.data?._id);
        setRuleInput(res?.data?.ruleString);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteARule = async()=>{
    try{
      const res = await deleteRule({_id:isEdit})
      if(res?.message){
        toast.success("Rule Successfully Deleted")
        setIsEdit(null)
        setRuleInput("")
      }
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-black flex flex-col">
        {/* Overlay */}
        {isDrawerOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
            aria-hidden="true"
          />
        )}

        {/* Drawer */}
        <div
          className={`drawer fixed top-0 left-0 h-full w-96 bg-white transform transition-transform duration-300 ease-in-out z-50 ${
            isDrawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Existing Rules</h2>
              <button
                onClick={() => {setIsDrawerOpen(false)}}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="space-y-3">
              {existingRules.map((rule) => (
                <div
                  key={rule._id}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    fetchSingleRule(rule._id);
                    setIsDrawerOpen(false)
                  }}
                  className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <h3 className="font-medium text-gray-900">
                    {rule?.ruleString ?? ""}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Created at: {formatToIST(rule?.createdAt)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <header className="w-full py-6 flex items-center justify-between px-6 border-b border-gray-800">
          <button
            onClick={() => {setIsDrawerOpen(true), setIsUpdate((prev)=>!prev)}}
            className="hamburger-menu p-2 text-white hover:bg-gray-800 rounded-lg"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1 className="text-3xl font-bold text-white">
            Rule Engine with AST
          </h1>
          <div className="w-8" /> {/* Spacer for visual balance */}
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
                {isEdit ? "Update Rule" : "Create Rule"}
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
                  isEdit={isEdit}
                  deleteARule={deleteARule}
                  setIsEdit={setIsEdit}
                />
              ) : (
                <EvaluateRule
                  evaluateInput={evaluateInput}
                  setEvaluateInput={setEvaluateInput}
                  handleEvaluateSubmit={handleEvaluateSubmit}
                  isLoading={isLoading}
                  jsonError={jsonError}
                  setJsonError={setJsonError}
                />
              )}
            </div>
          </div>
        </main>

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
