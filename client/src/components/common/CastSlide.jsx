import React from 'react'
import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import tmdbConfigs from '../../api/configs/tmdb.configs'
import uiConfigs from '../../configs/ui.configs'
import { routesGen } from '../../routes/routes'

import 'swiper/swiper.min.css'
const CastSlide = ({ casts }) => {
  return (
    <Box
      sx={{
        '& .swiper-slide': {
          width: { xs: '50%', md: '25%', lg: '20.5%' },
          color: 'primary.contrastText',
        },
      }}
    >
      <Swiper
        spaceBetween={10}
        slidesPerView={'auto'}
        grabCursor
        style={{ width: '100%', height: 'max-content' }}
      ></Swiper>
    </Box>
  )
}

export default CastSlide
