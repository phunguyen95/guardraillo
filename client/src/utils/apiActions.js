import { config } from "./config";

const getRequest = async (path) => {
  try {
    const params = {
      method: "GET",
      headers: {},
    };
    const res = await fetch(config.baseURL + path, params);
    const data = await res.text();
    return { statusCode: res.status, data };
  } catch (e) {
    console.log(`error in get Request (${path}) :- `, e);
  }
};

export const ApiAction = {
  getRequest,
};
