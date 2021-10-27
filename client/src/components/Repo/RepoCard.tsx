import React, {FunctionComponent,useCallback}  from 'react'
import {toast} from 'react-toastify'
import {useDispatch} from 'react-redux'

import CustomEditIcon from '../Icon/EditIcon'
import CustomDeleteIcon from '../Icon/DeleteIcon';
import { makeStyles,Box } from '@material-ui/core'
import { colors } from '../Theme/ColorPalette'
import { TextElement } from '../common/TextElement'
import { RepoItemProps } from './RepoItem'
import { ApiAction } from '../../utils/apiActions';
import { editRepo } from '../../store/dispatcher';
import { HTTPResponseReturn,Repo } from '../../types/api';
export interface RepoCardProps {
    repo?:Repo
    title?:string,
    color?: string,
}
const useStyle = makeStyles(props => ({
    card: {
      width: '250px',
      height: '150px',
      backgroundColor: props => props.color || colors.lightBlue,
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '16px',
    },
    text: {
      color: 'white',
      textAlign: 'left',
    },
    avatarImage: {
      width: '28px',
      height: '28px',
      cursor: 'pointer',
    },
    center: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  }))

export const RepoCard:FunctionComponent<RepoCardProps> = ({title,color,repo}) => {
    const classes = useStyle({color:  color || repo.bgColor})
    const dispatch = useDispatch()

    const handleEdit = useCallback(
      async ({titleError, title, color}) => {
        const {statusCode, data} = await ApiAction.putRequest(`/repo/${repo.id}`, {
          name: title,
          bgColor: color.color,
          id: repo.id,
        })
        if (statusCode === 400 || statusCode === 500) {
          toast.error(data)
          return
        }
        const {updatedRepo, message} = JSON.parse(data)
        editRepo(dispatch, updatedRepo)
        toast(message)
      },
      [repo?.id, dispatch],
    )
  
    return (
        <Box className={classes.card}>
        <Box style={{cursor: 'pointer'}} >
          <TextElement font="bold" fontType="h5" className={classes.text}>
            {title || repo && repo.name|| 'Your titles goes here'}
          </TextElement>
        </Box>
        <Box className={classes.center}>
          <CustomEditIcon
            toolTipText={'Edit Board'}
            isRepo={{edit: true, repo}}
            onClick={repo && handleEdit}
          />
          <CustomDeleteIcon
            toolTipText={'Delete Board'}
          />
        </Box>
      </Box>
    )
}
export default RepoCard;
