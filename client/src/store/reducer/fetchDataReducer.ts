/* Structure of the taskify state store
  state : {

    myBoards : Boolean,
    boards :{
        bordId : Boolean
    }
  }
   */

  import {
    FETCH_INDIVIDUAL_REPO,
    FETCH_REPOS,
    SET_INITIAL_STATE_FETCH_REDUCER,
  } from '../types';
  
  const initState = {
    myRepos: false,
    repos: {},
  }
  
  const fetchReducer = (state = initState, action:any) => {
    console.log('action',action.type)
    switch (action.type) {
      case FETCH_REPOS:
        return {
          ...state,
          myRepos: true,
        }
    //   case FETCH_INDIVIDUAL_REPO:
    //     state.repos[action.payload] = true
    //     return {
    //       ...state,
    //     }
      case SET_INITIAL_STATE_FETCH_REDUCER:
        return {}
      default:
        return state
    }
  }
  
  export default fetchReducer
  