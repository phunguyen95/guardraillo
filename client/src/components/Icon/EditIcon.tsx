import React, { memo, useCallback } from 'react'
import { colors } from '../Theme/ColorPalette';
import CustomToolTip from '../styledComponent/CustomToolTip';
import EditIcon from '@material-ui/icons/Edit';
import RepoModel from '../Repo/RepoModel'
import { RepoItemProps } from '../Repo/RepoItem';
interface CustomEditIconProps {
    fillColor?: string,
    styles?: any,
    toolTipText?: string,
    onClick: () => void,
    isRepo: {
        edit: boolean,
        repo?: RepoItemProps | {}
    }
}
function CustomEditIcon({ fillColor, styles, toolTipText, onClick, isRepo = { edit: false, repo: {} } }: CustomEditIconProps) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = useCallback(() => {
        setOpen(true);
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    const handleEditButton = () => {
        if (!isRepo.edit) {
            onClick()
            return
        }
        handleOpen()
    }

    return (<>
        <CustomToolTip title={toolTipText} placement="top" arrow style={{ color: colors.black }}>
            <EditIcon style={{ fill: fillColor || colors.white, ...styles }} onClick={handleEditButton} />
        </CustomToolTip>
        <RepoModel open={open} handleClose={handleClose} repo={isRepo.repo} handleSubmit={onClick} />
    </>
    )
}

export default memo(CustomEditIcon)
