import React from 'react'
import { Typography } from '@mui/material'
import { useTheme } from '@emotion/react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { themeModes } from '../../configs/theme.configs.js'

const Logo = () => {
  const theme = useTheme()
  const { themeMode } = useSelector(state => state.themeMode)

  return (
    <Link to="/" style={{ textDecoration: 'none' }}>
      <Typography fontWeight={'700'} fontSize="1.7rem">
        <span style={themeMode === themeModes.dark ? { color: 'white' } : { color: 'black' }}>Pizza</span>
        <span style={{ color: theme.palette.primary.main }}>Flix</span>
      </Typography>
    </Link>
  )
}

export default Logo
