import React, { memo, useCallback } from 'react'
import CustomToolTip from '../styledComponent/CustomToolTip';
import DeleteIcon from '@material-ui/icons/Delete';
import ComfirmationDailouge from '../Modal/ConfirmationDialouge';
import { colors } from '../Theme/ColorPalette';

interface CustomDeleteIcon {
    fillColor: string,
    toolTipText: string,
    onClick: ()=>void,
    styles: React.CSSProperties
}
function CustomDeleteIcon({ fillColor, styles, toolTipText, onClick }:CustomDeleteIcon) {
    const [open, setOpen] = React.useState(false);
    const _handleClick = useCallback(
        () => {
            setOpen(false)
            onClick()

        }, [onClick]
    )
    const _handleDilog = () => {

        if (typeof onClick === "function") {
            setOpen(true)
        }
    }
    return (<>
        <CustomToolTip title={toolTipText} placement="top" arrow style={{ color: colors.black }}>
            <DeleteIcon style={{ fill: fillColor || colors.white, cursor: "pointer", styles }} onClick={_handleDilog} />
        </CustomToolTip>
        <ComfirmationDailouge description={"Are You sure to Delete This ?"} onOk={_handleClick} onCancel={() => setOpen(false)} open={open} />
    </>
    )
}

export default memo(CustomDeleteIcon)
