import React from 'react'
import { Typography } from '@mui/material'
import { useTheme } from '@emotion/react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Logo = () => {
  const theme = useTheme()
  const { mode } = useSelector(state => state.theme)

  return (
    <Link to="/" style={{ textDecoration: 'none' }}>
      <Typography fontWeight={'700'} fontSize="1.7rem">
        <span style={mode === 'dark' ? { color: 'white' } : { color: 'black' }}>Pizza</span>
        <span style={{ color: theme.palette.primary.main }}>Flix</span>
      </Typography>
    </Link>
  )
}

export default Logo
