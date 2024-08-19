import React, { useEffect, useState } from 'react'
import { SwiperSlide } from 'swiper/react'
import AutoSwiper from './AutoSwiper'
import { toast } from 'react-toastify'
import mediaApi from '../../api/modules/media.api'

import MediaItem from './MediaItem'

const MediaSlide = ({ mediaType, mediaCategory }) => {
  const [medias, setMedias] = useState([])
  const [loopEnabled, setLoopEnabled] = useState(false)
  useEffect(() => {
    const getMedias = async () => {
      const { response, err } = await mediaApi.getList({
        mediaType,
        mediaCategory,
        page: 1,
      })
      if (response) {
        setLoopEnabled(response.results.length > 1)
        setMedias(response.results)
      }
      if (err) toast.error(err)
    }
    getMedias()
  }, [mediaType, mediaCategory])

  return (
    <AutoSwiper loopEnabled={loopEnabled}>
      {medias.map(media => (
        <SwiperSlide key={media.id}>
          <MediaItem media={media} mediaType={mediaType} />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  )
}

export default MediaSlide
