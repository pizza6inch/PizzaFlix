import React from 'react'

import Container from './Container'
import { Paper, Stack, Box, Button } from '@mui/material'
import Logo from './Logo'
import menuConfigs from '../../configs/menu.configs'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <Container>
      <Paper square={true} sx={{ backgroundImage: 'unset', padding: '2rem' }}>
        <Stack
          alignItems="center"
          justifyContent="space-between"
          direction={{ xs: 'column', md: 'row' }}
          sx={{ height: 'max-content' }} //stack高度根據子元件決定，一定要讓子元件顯示
        >
          <Logo />
          <Box>
            {menuConfigs.main.map((item, index) => (
              <Button key={index} sx={{ color: 'inherit' }} component={Link} to={item.path}>
                {item.display}
              </Button>
            ))}
          </Box>
        </Stack>
      </Paper>
    </Container>
  )
}

export default Footer
