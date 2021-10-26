import { FETCH_REPOS, SET_REPOS } from "../types";
const createFunc = (type) => {
  return (dispatch, data) => {
    try {
      dispatch({
        type: type,
        payload: data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
export const setRepos = createFunc(SET_REPOS);

export const fetchMyRepos = createFunc(FETCH_REPOS);
