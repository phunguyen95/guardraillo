import { Box, makeStyles } from '@material-ui/core'
import React, { memo, useCallback, useState } from 'react'
import { SketchPicker } from 'react-color'
import { useDispatch } from 'react-redux'
import TextareaAutosize from 'react-textarea-autosize'
import { toast } from 'react-toastify'

import { colors } from '../Theme/ColorPalette'
import ButtonContainer from '../common/ButtonContainer'
import CustomTransitionsModal from '../Modal/Modal'

import DeleteIcon from '../Icon/DeleteIcon'
import EditIcon from '../Icon/EditIcon'
import InputContainer from '../common/InputContainer'

import { TextElement } from '../common/TextElement'
import { editItemInContainer,deleteItemInContainer } from '../../store/dispatcher'
import { ApiAction } from '../../utils/apiActions'
interface DisplayItemProps {
  item:ItemProps,
  repoId: string,
  listId: string,
  cardId: string,
  cardIndex: number,
  listIndex: number,
}
interface ItemProps {
  id: string,
  noteTicket?: string | '',
  text: string,
}
const useStyles = makeStyles(theme => ({
  container: {
    width: '550px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  devider: {
    width: '100%',
    height: '1px',
    margin: '10px 0px',
  },
  colorPalate: {
    width: '100px',
    height: '30px',
    marginTop: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    cursor: 'pointer',
    border: '1px solid',
  },
  buttonPosition: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px 0px',
  },
}))
function DisplayItem({ item, repoId, listId, cardId, cardIndex, listIndex }: DisplayItemProps) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false)
  const [isPalateOpen, setIsPalateOpen] = useState(false)
  const [noteTicket, setNoteTicket] = useState(item.noteTicket || "");
  const [title, setTitle] = useState(item.text || "")
  const [color, setColor] = useState(colors.white)
  const handleOpen = () => {
    console.log('vao');
    setOpen(true)
  }

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const handleNameChangeTitle = useCallback(e => {
    setTitle(e.target.value)
  }, [])
  const handleOnChangeNoteTicket = useCallback((e) => {
    setNoteTicket(e.target.value);
  }, []);

  const handleClickInColorPalate = useCallback(() => {
    setIsPalateOpen(!isPalateOpen)
  }, [isPalateOpen])

  const handleChangeColor = useCallback(fetchColor => {
    setColor(fetchColor.hex)
  }, [])
  const handleEditItem = useCallback(async () => {
    const { statusCode, data } = await ApiAction.putRequest(
      `/card/${cardId}`,
      { text: title, id: cardId, noteTicket:noteTicket },
    )
    if (statusCode === 400 || statusCode === 500) {
      toast.error(data)
      return
    }
    const { message, card } = JSON.parse(data)
    toast(message)
    editItemInContainer(dispatch, {
      listId,
      repoId,
      card,
      cardId,
      cardIndex,
      listIndex
    })
    handleClose()
  }, [
    title,
    noteTicket
  ])
  const handleDeleteItem = useCallback(async () => {
    const { statusCode, data } = await ApiAction.DeleteRequest(
      `/card/${cardId}`
    );
    if (statusCode === 400 || statusCode === 500) {
      toast.error(data);
      return;
    }
    const { message } = JSON.parse(data);
    toast(message);
    deleteItemInContainer(dispatch, {
      listId,
      repoId,
      cardId,
      cardIndex,
      listIndex
    });
  }, [repoId, listId, cardId, dispatch, cardIndex, item.id]);

  return (
    <>
      <Box style={{ margin: '5px 0px' }} />
      <Box
        style={{
          backgroundColor: color,
          padding: '5px 10px',
          borderRadius: '6px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Box style={{ width: '90%' }}>
          <TextElement
            font="bold"
            fontType="h6"
            textStyle={{ overflowWrap: 'break-word' }}
          >
            {title}
          </TextElement>

          <hr />
          <TextElement
            font="bold"
            fontType="h6"
            textStyle={{ overflowWrap: 'break-word' }}
          >
            Note:{noteTicket}
          </TextElement>
        </Box>
        <Box style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <EditIcon
            toolTipText={'Edit'}
            fillColor={colors.lightBlue}
            styles={{ margin: '3px 0px 3px 0px' }}
            onClick={handleOpen}
          />
          <DeleteIcon
            toolTipText={'Delete'}
            fillColor={colors.deleteRed}
            styles={{ margin: '3px 0px 3px 0px' }}
            onClick={handleDeleteItem}
          />
        </Box>
      </Box>

      <CustomTransitionsModal open={open} handleClose={handleClose}>
        <Box className={classes.container}>
          <Box style={{ width: '100%' }}>
            <InputContainer
              textType="text"
              inputLabel="Title"
              inputValue={title}
              placeholder={'Please Enter your title'}
              onChange={handleNameChangeTitle}
              style={styles.input}
            />
      <TextareaAutosize
              minRows={4}
              style={{
                width: "100%",
                textDecoration: "none",
                border: `0.5px solid ${colors.darkWhite}`,
                borderRadius: "5px",
                padding: "10px 0px 0px 10px",
                marginTop: "5px",
              }}
              placeholder={"Add Description Here..."}
              value={noteTicket}
              onChange={handleOnChangeNoteTicket}
            />

            <Box
              onClick={handleClickInColorPalate}
              className={classes.colorPalate}
              style={{ backgroundColor: color }}
            >
              <TextElement font="bold" fontType="h8" textStyle={styles.text}>
                {isPalateOpen ? 'Done' : 'Change Color'}
              </TextElement>
            </Box>

            {isPalateOpen ? (
              <SketchPicker
                color={color}
                onChangeComplete={handleChangeColor}
              ></SketchPicker>
            ) : null}

            <Box className={classes.buttonPosition}>
              <ButtonContainer
                customButtonStyle={{
                  ...styles.submitbutton,
                }}
                title={'Close'}
                onClick={handleClose}
              />
              <ButtonContainer
                customButtonStyle={{
                  ...styles.submitbutton,
                  backgroundColor: color,
                  color: colors.black,
                }}
                title={'Add Changes'}
                onClick={handleEditItem}
              />
            </Box>
          </Box>
        </Box>
      </CustomTransitionsModal>
    </>
  )
}

export default memo(DisplayItem)
const styles = {
  text: {
    color: colors.black,
  },
  input: {
    width: '100%',
  },
  submitbutton: {
    // width: "24%",
    height: '45px',
    borderRadius: '12px',
    // marginTop: "20px",
    color: colors.white,
  },
}
