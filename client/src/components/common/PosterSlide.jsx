import { Box } from '@mui/material'
import { SwiperSlide } from 'swiper/react'
import tmdbConfigs from '../../api/configs/tmdb.configs'
import AutoSwiper from './AutoSwiper'

const PosterSlide = ({ posters }) => {
  return (
    <AutoSwiper loopEnabled={posters}>
      {[...posters].splice(0, 10).map(item => (
        <SwiperSlide key={item.file_path}>
          <Box
            sx={{
              paddingTop: '160%',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundImage: `url(${tmdbConfigs.backdropPath(item.file_path)})`,
            }}
          ></Box>
        </SwiperSlide>
      ))}
    </AutoSwiper>
  )
}

export default PosterSlide
