import {
    SET_REPOS,
    EDIT_REPO
} from '../types';
const initState = {}
type Repo = {
    id: string,
}
const repoReducer = (state = initState, action:{type:string,payload:any}) => {
    let newState: { [x: string]: Repo; }, payload

    switch (action.type) {
        case SET_REPOS:{
            newState = {}
            // eslint-disable-next-line array-callback-return
            action.payload.map((repo: Repo) => {
              newState[repo.id] = repo
            })
            return newState
        }
        case EDIT_REPO: {
            console.log('action.payload',action.payload);
            state[action.payload.id] = {
                ...state[action.payload.id],
                name: action.payload.name,
                bgColor: action.payload.bgColor,
              }
              console.log(state);
              return {...state}
        }
        default:
        return state
    }
}
export default repoReducer