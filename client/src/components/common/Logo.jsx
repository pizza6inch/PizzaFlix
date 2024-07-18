import React from 'react'
import { Typography } from '@mui/material'
import { useTheme } from '@emotion/react'

const Logo = () => {
  const theme = useTheme()

  return (
    <Typography fontWeight={'700'} fontSize="1.7rem">
      Pizza<span style={{ color: theme.palette.primary.main }}>Flix</span>
    </Typography>
  )
}

export default Logo
