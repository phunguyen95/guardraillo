import {combineReducers} from 'redux'
import repoReducer from './repoReducer';
import fetchReducer from './fetchDataReducer'

 const rootReducer = combineReducers({
  data: repoReducer,
  fetch: fetchReducer,
})
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>
