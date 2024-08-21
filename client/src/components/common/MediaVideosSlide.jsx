import { Box } from '@mui/material'
import { useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import tmdbConfigs from '../../api/configs/tmdb.configs'
import NavigationSwiper from './NavigationSwiper'

const MediaVideo = ({ video }) => {
  const iframeRef = useRef()

  useEffect(() => {
    const handleResize = () => {
      const height = (iframeRef.current.offsetWidth * 9) / 16 + 'px'
      iframeRef.current.setAttribute('height', height)
    }

    window.addEventListener('resize', handleResize)

    // Initialize the iframe size on mount
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [iframeRef])

  return (
    <Box sx={{ height: 'max-content' }}>
      <iframe
        key={video.key}
        src={tmdbConfigs.youtubePath(video.key)}
        ref={iframeRef}
        width="100%"
        title={video.id}
        style={{ border: 0 }}
      ></iframe>
    </Box>
  )
}

const MediaVideosSlide = ({ videos }) => {
  // console.log({ videos })
  return (
    <NavigationSwiper>
      {videos.map(video => (
        <SwiperSlide key={video.key}>
          <MediaVideo video={video} />
        </SwiperSlide>
      ))}
    </NavigationSwiper>
  )
}

export default MediaVideosSlide
