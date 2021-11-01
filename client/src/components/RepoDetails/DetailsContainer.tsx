import {Box} from '@material-ui/core'
import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {DragDropContext, Droppable} from 'react-beautiful-dnd'
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify'

import { ApiAction } from '../../utils/apiActions'
import {useHistory} from 'react-router-dom'
import { setIndividualRepoInStore } from '../../utils/setFunctions'
import MainItemCard from './MainItemCard'
import { TextElement } from '../common/TextElement'
import Spinner from '../Loader/Spinner'

function DetailsContainer({repoId}) {
  const repo = useSelector(state => state.data)
  const fetch = useSelector(state => state.fetch)
  const [loading, setLoading] = useState(true)
  const {replace} = useHistory()
  const dispatch = useDispatch()
  const columnArr = useMemo(() => {
    return repo[repoId]?.lists || []
  }, [repo, repoId])

  console.log('columnArr',columnArr)
  const handleDragEnd = useCallback(
    result => {
      console.log('result 1', result)
    },
    [repoId, dispatch],
  )

  useEffect(() => {
    ;(async () => {
      if (!fetch.myRepos)
        setIndividualRepoInStore(dispatch, replace, repoId, true, () => {
          setLoading(false)
        })
      else if (!fetch.repos[repoId])
      setIndividualRepoInStore(dispatch, replace, repoId, false, () => {
          setLoading(false)
        })
      else setLoading(false)
    })()
  }, [repoId, dispatch, fetch.repos, fetch.myRepos, replace])

  return (
    <>
      <Spinner isLoading={loading} />
      <div style={{padding: '0px 0px 0px 50px'}}>
        <TextElement font="bold" fontType="h2">
          {repo[repoId]?.name}
        </TextElement>
      </div>
      <Box
        style={{
          display: 'flex',
          flexGrow: 1,
          padding: '0px 20px',
          overflow: 'scroll',
        }}
      >
        <Box
          style={{
            display: 'flex',

            flexGrow: 1,
          }}
        >
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable
              droppableId={repoId}
              direction="horizontal"
              type="column"
            >
              {provided => (
                <Box
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    display: 'flex',
                    width: `calc(300px * ${columnArr.length} + ${columnArr.length}px * 50)`,
                  }}
                >
                  {repo[repoId]?.lists &&
                    columnArr.map(({id}, index) => (
                      <MainItemCard
                        key={id}
                        listId={id}
                        index={index}
                        repoId={repoId}
                      />
                    ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </DragDropContext>

          {/* Show input component or a add component */}
        </Box>
      </Box>
    </>
  )
}

export default DetailsContainer
