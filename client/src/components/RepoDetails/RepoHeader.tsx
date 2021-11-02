import {Box, makeStyles} from '@material-ui/core'
import React, {memo, useCallback, useMemo, useState} from 'react'
import {TextElement} from '../common/TextElement';

interface ColumnHeader {
  title: string,
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

function ColumnHeader({
  title,
}:ColumnHeader) {
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
      </Box>
    </div>
  )
}

export default memo(ColumnHeader)
