/* Structure of the application state store
  state : {
    myRepos : Boolean,
    repos :{
        repoId : Boolean
    }
  }
   */
  import {
    FETCH_REPOS,
    SET_INITIAL_STATE_FETCH_REDUCER,
  } from '../types';
  
  const initState = {
    myRepos: false,
    repos: {},
  }
  
  const fetchReducer = (state = initState, action:any) => {
    switch (action.type) {
      case FETCH_REPOS:
        return {
          ...state,
          myRepos: true,
        }
      case SET_INITIAL_STATE_FETCH_REDUCER:
        return {}
      default:
        return state
    }
  }
  
  export default fetchReducer
  