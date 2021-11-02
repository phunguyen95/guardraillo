import {
  FETCH_REPOS,
  SET_REPOS,
  EDIT_REPO,
  FETCH_INDIVIDUAL_REPO,
  SET_COLUMNS,
  ADD_ITEM,
  EDIT_ITEM,
  DELETE_ITEM,
  CHANGE_ITEM_POSITION_IN_SAME_CONTAINER,
  CHANGE_ITEM_POSITION_IN_DIFFERNT_CONTAINER,
  ADD_REPOS,
  DELETE_REPO,
} from "../types";
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
export const addRepos = createFunc(ADD_REPOS);
export const deleteRepo = createFunc(DELETE_REPO);
export const fetchMyRepos = createFunc(FETCH_REPOS);
export const editRepo = createFunc(EDIT_REPO);
export const fetchIndividualRepo = createFunc(FETCH_INDIVIDUAL_REPO);
export const setColumns = createFunc(SET_COLUMNS);
export const addItemInContainer = createFunc(ADD_ITEM);
export const editItemInContainer = createFunc(EDIT_ITEM);
export const deleteItemInContainer = createFunc(DELETE_ITEM);
export const changePositionInSameContainer = createFunc(
  CHANGE_ITEM_POSITION_IN_SAME_CONTAINER
);
export const changePositionInDiffrentContainer = createFunc(
  CHANGE_ITEM_POSITION_IN_DIFFERNT_CONTAINER
);
