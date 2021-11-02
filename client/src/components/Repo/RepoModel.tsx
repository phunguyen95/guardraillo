import {Box, Divider, makeStyles} from '@material-ui/core'
import React, {useCallback, useState} from 'react'
import {SketchPicker} from 'react-color'
import { colors } from '../Theme/ColorPalette'
import CustomTransitionsModal from '../Modal/Modal'
import ErrorText from '../common/ErrorText';
import InputContainer from '../common/InputContainer';
import { TextElement } from '../common/TextElement'
import RepoCard from './RepoCard'
import ButtonContainer from '../common/ButtonContainer';
import {Repo } from '../../types/api';


interface RepoModel {
  open: boolean,
  handleSubmit: (param: SubmitParam) => void,
  handleClose: () => void,
  repo:Repo,
}
interface SubmitParam  {
  titleError:string,
  title:string, 
  color:{
    color: string,
    isPalateOpen: boolean | false
  }
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
  },
  buttonPosition: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '20px',
  },
}))
function RepoModel({open, handleClose, handleSubmit, repo}:RepoModel) {
  const classes = useStyles()
  const [title, setTitle] = useState(repo?.name || '')
  const [color, setColor] = useState({
    color: colors.lightBlue,
    isPalateOpen: false,
  })
  const [titleError, setTitleError] = useState('')
  const handleNameChange = useCallback(e => {
    setTitle(e.target.value)
  }, [])

  const handleChangeColor = useCallback(
    fetchColor => {
      setColor({color: fetchColor.hex, isPalateOpen: color.isPalateOpen})
    },
    [color.isPalateOpen],
  )

  const handleClickInColorPalate = useCallback(() => {
    setColor({color: color.color, isPalateOpen: !color.isPalateOpen})
  }, [color.color, color.isPalateOpen])

  const titleValidate = useCallback(() => {
    if (title === '') {
      setTitleError('Enter Title')
    } else {
      setTitleError('')
    }
  }, [title])

  const _handleSubmit = useCallback(() => {
    handleSubmit({
      titleError,
      title,
      color: {color: color.color, isPalateOpen: color.isPalateOpen},
    })
    handleClose()
  }, [
    color.color,
    color.isPalateOpen,
    handleClose,
    handleSubmit,
    title,
    titleError,
  ])

  return (
    <CustomTransitionsModal open={open} handleClose={handleClose}>
      <Box className={classes.container}>
        {/* Preview Mode */}
        <Box>
          <RepoCard title={title} color={color.color} />
        </Box>

        <Divider variant="middle" className={classes.devider} />

        {/* Input Of Users */}
        <Box style={{width: '100%'}}>
          <InputContainer
            textType="text"
            inputLable="Title"
            inputValue={title}
            placeholder={'Please Enter your title'}
            onChange={handleNameChange}
            onBlur={titleValidate}
            errorMessage={<ErrorText errorMessage={titleError} />}
            error={titleError === '' ? false : true}
            style={styles.input}
            autoFocus
          />
          <Box
            onClick={handleClickInColorPalate}
            className={classes.colorPalate}
            style={{backgroundColor: color.color}}
          >
            <TextElement font="bold" fontType="h8" textStyle={styles.text}>
              {color.isPalateOpen ? 'Done' : 'Change Color'}
            </TextElement>
          </Box>

          {color.isPalateOpen ? (
            <SketchPicker
              color={color.color}
              onChangeComplete={handleChangeColor}
            ></SketchPicker>
          ) : null}

          {/* add member component */}

          <Box className={classes.buttonPosition}>
            <ButtonContainer
              customButtonStyle={{
                ...styles.submitbutton,
                backgroundColor: color.color,
              }}
              title={repo ? 'Edit Repo' : 'Create Repo'}
              onClick={_handleSubmit}
            />
          </Box>
        </Box>
      </Box>
    </CustomTransitionsModal>
  )
}

export default RepoModel

const styles = {
  link: {
    color: colors.lightBlue,
  },
  input: {
    width: '100%',
  },
  text: {
    color: colors.white,
    // backgroundColor: "red"
  },
  submitbutton: {
    // width: "24%",
    height: '45px',
    borderRadius: '12px',
    marginTop: '20px',
  },
}
