import {Box, makeStyles} from '@material-ui/core'
import React, {memo, useCallback, useMemo, useState} from 'react'
import {SketchPicker} from 'react-color'
import {useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import {colors} from '../Theme/ColorPalette'
import { ApiAction } from '../../utils/apiActions'
import CustomDeleteIcon from '../Icon/DeleteIcon'
import CustomEditIcon from '../Icon/EditIcon'
import {TextElement} from '../common/TextElement';
import ButtonContainer from '../common/ButtonContainer';
import CustomTransitionsModal from '../Modal/Modal';
import InputContainer from '../common/InputContainer';

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
  },
  buttonPosition: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '20px',
  },
}))

function ColumnHeader({
  title,
  setTitle,
  repoId,
  listId,
  index,
}) {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [open, setOpen] = React.useState(false)
  const [isPalateOpen, setIsPalateOpen] = useState(false)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialTitle = useMemo(() => title, [])


  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = useCallback(() => {
    setOpen(false)
    setTitle(initialTitle)
  }, [initialTitle, setTitle])

  const handleNameChange = useCallback(
    e => {
      setTitle(e.target.value)
    },
    [setTitle],
  )

  const handleClickInColorPalate = useCallback(() => {
    setIsPalateOpen(!isPalateOpen)
  }, [isPalateOpen])


  return (
    <div>
      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <TextElement font="bold" fontType="h4">
          {title}
        </TextElement>
        <Box style={{display: 'flex'}}>
          <CustomEditIcon
            fillColor={colors.lightBlue}
            toolTipText={'Edit'}
          />
          <CustomDeleteIcon
            fillColor={colors.deleteRed}
            toolTipText={'Delete'}
          />
        </Box>
      </Box>

      <CustomTransitionsModal open={open} handleClose={handleClose}>
        <Box className={classes.container}>
          <Box style={{width: '100%'}}>
            <InputContainer
              textType="text"
              inputLable="Title"
              inputValue={title}
              placeholder={'Please Enter your title'}
              onChange={handleNameChange}
              style={styles.input}
            />

            <Box
              onClick={handleClickInColorPalate}
              className={classes.colorPalate}
              style={{backgroundColor: 'grey'}}
            >
              <TextElement font="bold" fontType="h8" textStyle={styles.text}>
                {isPalateOpen ? 'Done' : 'Change Color'}
              </TextElement>
            </Box>

            {isPalateOpen ? (
              <SketchPicker
                color={"grey"}
              ></SketchPicker>
            ) : null}

            <Box className={classes.buttonPosition}>
              <ButtonContainer
                customButtonStyle={{
                  ...styles.submitbutton,
                  backgroundColor: "grey",
                }}
                title={'Edit Column'}
              />
            </Box>
          </Box>
        </Box>
      </CustomTransitionsModal>
    </div>
  )
}

export default memo(ColumnHeader)
const styles = {
  input: {
    width: '100%',
  },
  submitbutton: {
    // width: "24%",
    height: '45px',
    borderRadius: '12px',
    marginTop: '20px',
    color: colors.black,
  },
}
