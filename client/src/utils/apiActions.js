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
    return { statusCode: 500, data: {} };
    console.log(`error in get Request (${path}) :- `, e);
  }
};
const putRequest = async (path, body) => {
  try {
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    const res = await fetch(config.baseURL + path, params);
    const data = await res.text();
    return { statusCode: res.status, data };
  } catch (e) {
    console.log(`error in PUT Request (${path}) :- `, e);
    return { statusCode: 500, data: {} };
  }
};
export const ApiAction = {
  getRequest,
  putRequest,
};
