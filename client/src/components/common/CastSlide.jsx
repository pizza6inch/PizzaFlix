import React from 'react'
import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import tmdbConfigs from '../../api/configs/tmdb.configs'
import uiConfigs from '../../configs/ui.configs'
import { routesGen } from '../../routes/routes'

const CastSlide = ({ casts, loopEnabled }) => {
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
        loop={loopEnabled}
        style={{ width: '100%', height: 'max-content' }}
      >
        {casts.map(cast => (
          <SwiperSlide key={cast.name}>
            <Link to={routesGen.person(cast.id)}>
              <Box
                sx={{
                  paddingTop: '120%',
                  color: 'white',
                  ...uiConfigs.style.backgroundImage(tmdbConfigs.posterPath(cast.profile_path)),
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    width: '100%',
                    height: 'max-content',
                    bottom: 0,
                    padding: '10px',
                    backgroundColor: 'rgba(0,0,0,0.6)',
                  }}
                >
                  <Typography sx={{ ...uiConfigs.style.typoLines(1, 'left') }}>{cast.name}</Typography>
                </Box>
              </Box>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}

export default CastSlide
