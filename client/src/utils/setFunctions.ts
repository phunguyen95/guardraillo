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
    const {data} = await ApiAction.getRequest('/repo')

    const res = JSON.parse(data)
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
  
    const {data} = await ApiAction.getRequest(url)
    const res = JSON.parse(data)
    setColumns(dispatch, {repoId, columns: res.columns})
    fetchIndividualRepo(dispatch, repoId)
    callBack()
  }
  