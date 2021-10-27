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
      default:
        return state
    }
  }
  
  export default fetchReducer
  