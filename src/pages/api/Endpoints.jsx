import Headers from "./Header";
import { ProcessAPI, Const } from "../../../utils/Constant";

export const createRule = async (body) => {
  const res = await fetch(Const.Link + `api/create_rule`, new Headers("POST", body));
  return ProcessAPI(res);
};

export const evaluateRule = async (body) => {
  const res = await fetch(Const.Link + `api/evaluate_rule`, new Headers("POST", body));
  return ProcessAPI(res);
};

