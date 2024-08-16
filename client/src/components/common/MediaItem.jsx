import React from 'react'
import PlayArrow from '@mui/icons-material/PlayArrow'
import { Box, Typography, Button, Stack } from '@mui/material'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import tmdbConfigs from '../../api/configs/tmdb.configs'
import uiConfigs from '../../configs/ui.configs'
import { routesGen } from '../../routes/routes'
import FavoriteList from '../../pages/FavoriteList'
import CircularProgress from '@mui/material'
import { useSelector } from 'react-redux'
import FavoriteUtils from '../../utils/favorite.utils'

const MediaItem = ({ media, mediaType }) => {
  const { listFavorites } = useSelector(state => state.user)

  const [title, setTitle] = useState('')
  const [posterPath, setPosterPath] = useState('')
  const [releaseDate, setReleaseDate] = useState(null)
  const [rate, setRate] = useState(null)

  useEffect(() => {
    setTitle(media.title || media.name || media.mediaTitle)
    setPosterPath(
      tmdbConfigs.posterPath(media.poster_path || media.backdrop_path || media.mediaPoster || media.profile_path)
    )
    if (mediaType === tmdbConfigs.mediaType.movie)
      setReleaseDate(media.release_date && media.release_date.split('-')[0])
    else setReleaseDate(media.first_air_date && media.first_air_date.split('-')[0])

    setRate(media.vote_average || media.mediaRate)
  }, [media, mediaType])
  return (
    <Link
      to={
        mediaType !== 'poeple'
          ? routesGen.mediaDetail(mediaType, media.id || media.mediaid)
          : routesGen.person(media.id)
      }
    >
      <Box
        sx={{
          ...uiConfigs.style.backgroundImage(posterPath),
          paddingTop: '160%',
          '&:hover .media-info': { opacity: 1, bottom: 0 },
          '&:hover .media-back-drop .media-play-btn': { opacity: 1 },
          color: 'priary.contrastText',
        }}
      ></Box>
    </Link>
  )
}

export default MediaItem
