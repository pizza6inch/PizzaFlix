import React, { useEffect, useState } from 'react'
import { SwiperSlide } from 'swiper/react'
import AutoSwiper from './AutoSwiper'
import { toast } from 'react-toastify'
import mediaApi from '../../api/modules/media.api'

import MediaItem from './MediaItem'

const MediaSlide = ({ mediaType, mediaCategory }) => {
  const [medias, setMedias] = useState([])
  useEffect(() => {
    const getMedias = async () => {
      const { response, err } = await mediaApi.getList({
        mediaType,
        mediaCategory,
        page: 1,
      })
      if (response) setMedias(response.results)
      if (err) toast.error(err)
    }
    getMedias()
  }, [mediaType, mediaCategory])

  return (
    <AutoSwiper>
      {medias.map(media => (
        <SwiperSlide key={media.id}></SwiperSlide>
      ))}
    </AutoSwiper>
  )
}

export default MediaSlide
