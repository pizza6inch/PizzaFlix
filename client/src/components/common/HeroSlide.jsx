import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { Box, Button, Chip, Divider, Stack, Typography, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { AutoPlay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { toast } from 'react-toastify'

import { setGlobalLoading } from '../../redux/features/globalLoadingSlice'
import { routesGen } from '../../routes/routes'

import uiConfigs from '../../configs/ui.configs'
import CircularRate from './CircularRate'

import tmdbConfigs from '../../api/configs/tmdb.configs'
import genreApi from '../../api/modules/genre.api'
import mediaApi from '../../api/modules/media.api'
const HeroSlide = ({ mediaType, mediaCategory }) => {
  const theme = useTheme()
  const dispatch = useDispatch()

  const [movies, setMovies] = useState([])
  const [genre, setGenres] = useState([])

  useEffect(() => {
    const getMedias = async () => {
      const { response, err } = await mediaApi.getList({
        mediaType,
        mediaCategory,
        pate: 1,
      })
      if (response) setMovies(response.results)
      if (err) toast.error(err.massage)
    }

    const getGenres = async () => {
      dispatch(setGlobalLoading(true))
      console.log(mediaType)
      const { response, err } = await genreApi.getList({ mediaType })

      if (response) {
        setMovies(response.results)
        getMedias()
      }
      if (err) {
        toast.error(err.massage)
        setGlobalLoading(false)
      }
      dispatch(setGlobalLoading(false))
    }

    getGenres()
  }, [mediaType, mediaCategory, dispatch])

  return <Box> HeroSlide</Box>
}

export default HeroSlide
