import {Box} from '@material-ui/core'
import React, {memo, useCallback, useMemo, useState} from 'react'
import {Draggable, Droppable} from 'react-beautiful-dnd'
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import {colors} from '../Theme/ColorPalette'
import { ApiAction } from '../../utils/apiActions'
import ColumnHeader from  './RepoHeader';

import InputContainer from '../common/InputContainer'
import DisplayItemContainer from './DisplayItemContainer'
import Spinner from '../Loader/Spinner'
import InputComponent from '../common/InputComponent';
import AddItemComponent from '../common/AddItemComponent';

function MainItemCard({listId, index, repoId}) {
  const [isAddItemShow, setIsAddItemShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const data = useSelector(state => state.data)
  const container = useMemo(
    () => data[repoId].lists.filter(list=>list.id === listId)[0],
    [repoId, data],
  )
    console.log('container',container)

  const [title, setTitle] = useState(container.title)

  const dispatch = useDispatch()

  const handleChange = useCallback(() => {
    setIsAddItemShow(!isAddItemShow)
  }, [isAddItemShow])


  return (
    <>
      <Spinner isLoading={loading} />
      <Draggable draggableId={container.id.toString()} index={index}>
        {provided => (
          <div {...provided.draggableProps} ref={provided.innerRef}>
            <div
              style={{
                width: '300px',
                backgroundColor: 'grey',
                padding: '0px 35px',
                borderRadius: '6px',
                marginRight: '20px',
              }}
            >
              {/* Container | Column Header */}
              <Box {...provided.dragHandleProps}>
                <ColumnHeader
                  title={title}
                  setTitle={setTitle}
                  repoId={repoId}
                  listId={container.id}
                  index={index}
                />
              </Box>

              {/* Conatiner | Column Body */}
              <Droppable droppableId={container.id.toString()}>
                {provided => {
                  return (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      <Box>
                        {container.cards.map((card,index) => (
                          <DisplayItemContainer
                            key={index}
                            itemId={card.id || index}
                            index={index}
                            card={card}
                            repoId={repoId}
                            listId={container.id}
                          />
                        ))}
                        {provided.placeholder}
                      </Box>

                      {isAddItemShow ? (
                        <InputComponent
                          handleChange={handleChange}
                          buttonText={'Add'}
                          placeholder={'Please enter title'}
                        />
                      ) : (
                        <AddItemComponent
                          handleChange={handleChange}
                          buttonText={'Add New Card'}
                        />
                      )}
                    </div>
                  )
                }}
              </Droppable>
              {/* </DragDropContext> */}
            </div>
          </div>
        )}
      </Draggable>
    </>
  )
}

export default memo(MainItemCard)
