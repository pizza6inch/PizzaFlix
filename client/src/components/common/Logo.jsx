import React from 'react'
import { Typography } from '@mui/material'
import { useTheme } from '@emotion/react'
import { Link } from 'react-router-dom'
const Logo = () => {
  const theme = useTheme()

  return (
    <Link to="/" style={{ textDecoration: 'none' }}>
      <Typography fontWeight={'700'} fontSize="1.7rem">
        <span style={{ color: 'white' }}>Nut</span>
        <span style={{ color: theme.palette.primary.main }}>Flix</span>
      </Typography>
    </Link>
  )
}

export default Logo
