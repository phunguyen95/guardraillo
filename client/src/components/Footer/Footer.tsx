import React, {memo} from 'react'
import {Box} from '@material-ui/core'
import {TextElement} from '../common/TextElement'
import {colors} from '../Theme/ColorPalette'
import FavoriteIcon from '@material-ui/icons/Favorite'
function Footer() {
  return (
    <Box
      style={{
        height: '40px',
        backgroundColor: colors.lightBlue,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // position: 'absolute',
        bottom: 0,
      }}
    >
      <TextElement font="bold" fontType="h5">
       Guardraillo
      </TextElement>
    </Box>
  )
}

export default memo(Footer)
