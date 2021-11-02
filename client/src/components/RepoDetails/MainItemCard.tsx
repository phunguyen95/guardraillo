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
import { STATE_NOT_ALLOW_DRAGGABLE_ITEM } from '../../constants/repo'
import {addItemInContainer} from '../../store/dispatcher/index';
import {CardProps} from './DisplayItemContainer';
interface MainItemCardProps { 
 listId: string,
 index: number,
 repoId: string,
}
function MainItemCard({listId, index, repoId}:MainItemCardProps) {
  const [isAddItemShow, setIsAddItemShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const data = useSelector(state => state.data)
  const container = useMemo(
    () => data[repoId].lists.filter(list=>list.id === listId)[0],
    [repoId, data],
  )

  const [title, setTitle] = useState(container.title)

  const dispatch = useDispatch()

  const handleChange = useCallback(() => {
    setIsAddItemShow(!isAddItemShow)
  }, [isAddItemShow])

  const addItem = useCallback(
    async (value) => {
      setLoading(true);
      const { statusCode, data } = await ApiAction.postRequest(
        `/list/${listId}/card`,
        { text: value }
      );

      setLoading(false);
      if (statusCode === 400 || statusCode === 500) {
        toast.error(data);
        return;
      }
      const dataParsed = JSON.parse(data);
      toast(`Congrats!, new ticket have been added under ${container.title} column`);
      addItemInContainer(dispatch, {
        index,
        data:dataParsed,
        repoId,
        listId,
      });
    },
    [repoId, listId, dispatch, index]
  );
  return (
    <>
      <Spinner isLoading={loading} />
      <Draggable draggableId={container.id.toString()} index={index}  isDragDisabled={title.indexOf(STATE_NOT_ALLOW_DRAGGABLE_ITEM)<= 0}>
        {provided => (
          <div {...provided.draggableProps} ref={provided.innerRef}>
            <div
              style={{
                width: '400px',
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
                />
              </Box>

              {/* Conatiner | Column Body */}
              <Droppable droppableId={container.title} >
                {provided => {
                  return (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      <Box>
                        {container.cards.map((card:CardProps,cardIndex: number) => (
                          <DisplayItemContainer
                            key={cardIndex}
                            itemId={card.id || index}
                            index={cardIndex}
                            card={card}
                            repoId={repoId}
                            listId={container.id}
                            listIndex={index}
                            isDragDisabled={container.title === 'Fixed' || container.title === 'False Positive'}
                          />
                        ))}
                        {provided.placeholder}
                      </Box>

                      {isAddItemShow ? (
                        <InputComponent
                          handleChange={handleChange}
                          addItem={addItem}
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
