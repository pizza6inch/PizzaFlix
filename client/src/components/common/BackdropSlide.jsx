import { Box } from '@mui/material'
import { SwiperSlide } from 'swiper/react'
import tmdbConfigs from '../../api/configs/tmdb.configs'
import NavigationSwiper from './NavigationSwiper'

const BackdropSlide = ({ backdrops }) => {
  return (
    <NavigationSwiper>
      {backdrops.splice(0, 10).map(backdrop => (
        <SwiperSlide key={backdrop.file_path}>
          <Box
            sx={{
              paddingTop: '60%',
              backgroundPosition: 'top',
              backgroundSize: 'cover',
              backgroundImage: `url(${tmdbConfigs.backdropPath(backdrop.file_path)})`,
            }}
          ></Box>
        </SwiperSlide>
      ))}
    </NavigationSwiper>
  )
}

export default BackdropSlide
