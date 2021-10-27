import {Box, makeStyles} from '@material-ui/core'
import React, {FunctionComponent} from 'react'
import {Repo } from '../../types/api';

import RepoCard from './RepoCard'

export interface RepoItemProps {
    repo?: Repo,
}
export interface ListCards {
    title: string,
    cards: Array<any>,
    id: string
    
}

const useStyle = makeStyles({
  container: {
    width: '100%',
    // backgroundColor: "red",
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    // backgroundColor: "red"
  },
})
export const RepoItem: FunctionComponent<RepoItemProps> = ({repo}) => {
    console.log('repo',repo)
  const classes = useStyle()

  return (
    <Box className={classes.container}>
      {/* Card of repo */}
      <Box>
       <RepoCard repo={repo} /> 
      </Box>
    </Box>
  )
}

export default RepoItem
