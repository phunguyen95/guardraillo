import {
    fetchMyRepos,
    setRepos,
  } from '../store/dispatcher'
  import {ApiAction} from './apiActions';
  
  export const setReposInStore = async (
    dispatch:any,
    callBack = () => {},
  ) => {
    console.log('Is it run... setBoardsInStore')
    const {statusCode, data} = await ApiAction.getRequest('/repo')
  
    // if (statusCode === 400 || statusCode === 500) {
    //   // toast.error(data)
    //   logout()
    //   replace('/signin')
    //   return
    // }
    const res = JSON.parse(data)
    console.log({res: res})
    setRepos(dispatch, res.repos)
  
    fetchMyRepos(dispatch)
    callBack()
  }
  