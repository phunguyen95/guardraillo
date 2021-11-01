import {makeStyles, Box} from '@material-ui/core'
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setReposInStore} from '../../utils/setFunctions'
import Spinner from '../Loader/Spinner'
import RepoItem from './RepoItem';

const useStyle = makeStyles({
  container: {
    padding: '0px 20px',
  },
})

function RepoContainer() {
  const classes = useStyle()

  const dispatch = useDispatch()
  const repos = useSelector(state => state.data)
  const fetch = useSelector(state => state.fetch)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    console.log('fetch',fetch);
    console.log('repos',repos)
    if (!fetch.myRepos)
      setReposInStore(dispatch, () => {
        setLoading(false)
      })
    else setLoading(false)
  }, [dispatch, fetch.myRepos, loading,])
  console.log('repos otuside',repos);
  return (
    <>
    <Spinner isLoading={loading} />
    <Box className={classes.container}>
      {Object.keys(repos).map((key, index) => (
        <RepoItem key={key} repo={repos[key]} />
      ))}
    </Box>
  </>
  )
}

export default RepoContainer
