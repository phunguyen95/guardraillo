import {
    SET_REPOS
} from '../types';
const initState = {}
type Repo = {
    id: string,
}
const repoReducer = (state = initState, action:{type:string,payload:any}) => {
    let newState: { [x: string]: Repo; }, payload

    switch (action.type) {
        case SET_REPOS:
            newState = {}
            // eslint-disable-next-line array-callback-return
            action.payload.map((repo: Repo) => {
                console.log('repo',repo)
              newState[repo.id] = repo
            })
            return newState
        default:
        return state
    }
}
export default repoReducer