import {Box} from '@material-ui/core'
import React, {useEffect, useMemo} from 'react'
import ContainerBody from '../components/RepoDetails/DetailsContainer'

import Footer from '../components/Footer/Footer'
function Home({match}) {
  const repoId = useMemo(() => match.params.repoId, [match.params.repoId])
 
  return (
    <Box style={{display: 'flex', flexDirection: 'column', flexGrow: 1}}>
      <Box style={{flexGrow: 1, display: 'flex', flexDirection: 'column'}}>
        <ContainerBody repoId={repoId} />
      </Box>

      <Box>
        <Footer />
      </Box>
    </Box>
  )
}

export default Home
