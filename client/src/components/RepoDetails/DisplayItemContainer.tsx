import {Box} from '@material-ui/core'
import React, {memo} from 'react'
import {Draggable} from 'react-beautiful-dnd'

import DisplayItem from './DisplayItem'

const DisplayItemContainer = memo(
  ({itemId, index,card,repoId,listId,isDragDisabled,listIndex}) => {


    return (
      <Draggable draggableId={itemId} index={index} isDragDisabled={isDragDisabled}>
        {provided => (
          <Box
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <DisplayItem
              item={card}
              repoId={repoId}
              listId={listId}
              cardId={itemId}
              cardIndex={index}
              listIndex={listIndex}
            />
          </Box>
        )}
      </Draggable>
    )
  },
)

export default DisplayItemContainer
