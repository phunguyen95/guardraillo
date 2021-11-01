import {
    fetchMyRepos,
    setRepos,
    fetchIndividualRepo,
    setColumns
  } from '../store/dispatcher'
  import {ApiAction} from './apiActions';
  
  export const setReposInStore = async (
    dispatch:any,
    callBack = () => {},
  ) => {
    const {statusCode, data} = await ApiAction.getRequest('/repo')

    // if (statusCode === 400 || statusCode === 500) {
    //   // toast.error(data)
    //   logout() (for login future implementation)
    //   replace('/signin')
    //   return
    // }
    const res = JSON.parse(data)
    console.log({res: res})
    setRepos(dispatch, res.repos)
  
    fetchMyRepos(dispatch)
    callBack()
  }
  export const setIndividualRepoInStore = async (
    dispatch:any,
    replace: ()=>void,
    repoId: string,
    isMyRepoFetch = false,
    callBack = () => {},
  ) => {
  
    const url = '/repo/' + repoId 
    if (isMyRepoFetch) await setReposInStore(dispatch)
  
    const {statusCode, data} = await ApiAction.getRequest(url)
    const res = JSON.parse(data)
    console.log({res})
    setColumns(dispatch, {repoId, columns: res.columns})
    fetchIndividualRepo(dispatch, repoId)
    callBack()
  }
  