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

export const getDataSingle = async (body) => {
  const res = await fetch(Const.Link + `api/getData/edit`, new Headers("POST", body));
  return ProcessAPI(res);
};

export const editRule = async (body) => {
  const res = await fetch(Const.Link + `api/create_rule/edit`, new Headers("POST", body));
  return ProcessAPI(res);
};

export const deleteRule = async (body) => {
  const res = await fetch(Const.Link + `api/getData/delete`, new Headers("PATCH", body));
  return ProcessAPI(res);
};

export const getData = async () => {
  const res = await fetch(Const.Link + `api/getData`, new Headers("GET"));
  return ProcessAPI(res);
};

