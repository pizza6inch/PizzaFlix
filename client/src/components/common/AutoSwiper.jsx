import React from 'react'
import { Box } from '@mui/material'
import { Swiper } from 'swiper/react'
const AutoSwiper = ({ children, loopEnabled }) => {
  return (
    <Box
      sx={{
        '& .swiper-slide': {
          width: {
            xs: '50%', // 2 slides per view
            sm: '35%', // 3 slides per view
            md: '25%', // 4 slides per view
            lg: '20.5%', // 5 slides per view
          },
        },
      }}
    >
      <Swiper
        loop={loopEnabled}
        slidesPerView="auto"
        grabCursor={true}
        style={{ width: '100%', height: 'max-content' }}
      >
        {children}
      </Swiper>
    </Box>
  )
}

export default AutoSwiper
