import {Box} from '@material-ui/core'
import React, {memo} from 'react'
import {Draggable} from 'react-beautiful-dnd'

import DisplayItem from './DisplayItem'

const DisplayItemContainer = memo(
  ({itemId, index,card,repoId,listId}) => {
    console.log('DisplayItem run....')

    return (
      <Draggable draggableId={itemId} index={index}>
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
              index={index}
            />
          </Box>
        )}
      </Draggable>
    )
  },
)

export default DisplayItemContainer
