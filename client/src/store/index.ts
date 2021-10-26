import { createStore, applyMiddleware,compose } from 'redux'
import { withReduxDevtools } from './utils/withReduxDevTools';
import rootReducer from './reducer/rootReducer'
import reduxThunkMiddleware, {ThunkMiddleware} from 'redux-thunk';

const thunkMiddleware: ThunkMiddleware = reduxThunkMiddleware;
const middlewares  = [thunkMiddleware];

const middlewareEnhancer = applyMiddleware(...middlewares);
const enhancer = [middlewareEnhancer]
let composeEnhancer;

if (process.env.NODE_ENV !== "production") {
  composeEnhancer = withReduxDevtools(...enhancer)
}
export default createStore(
    rootReducer,
    composeEnhancer
);
  