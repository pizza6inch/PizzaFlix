import React from 'react'

import HeroSlide from '../components/common/HeroSlide'
import tmdbConfigs from '../api/configs/tmdb.configs'
import { Box } from '@mui/material'
import uiConfigs from '../configs/ui.configs'
import second from '../components/common/Container'

const HomePage = () => {
  return (
    <div>
      <HeroSlide mediaType={tmdbConfigs.mediaType.movie} mediaCategory={tmdbConfigs.mediaCategory.popular} />
      <Box marginTop="-4rem" sx={{ ...uiConfigs.style.mainContent }}></Box>
    </div>
  )
}

export default HomePage
