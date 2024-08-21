import React from 'react'
import { LoadingButton } from '@mui/material'
import { Box, Button, Stack, Typography } from '@mui/material'
import { useEffect, useState, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import tmdbConfigs from '../api/configs/tmdb.configs'
import mediaApi from '../api/modules/media.api'
import uiConfigs from '../configs/ui.configs'
import usePrevious from '../hooks/usePrevious'
import HeroSlide from '../components/common/HeroSlide'
import MediaGrid from '../components/common/MediaGrid'
import { setAppState } from '../redux/features/appStateSlice'
import { setGlobalLoading } from '../redux/features/globalLoadingSlice'

const MediaList = () => {
  const { mediaType } = useParams()
  const [medias, setMedias] = useState([])
  const [mediaLoading, setMediaLoading] = useState(false)
  const [currCategory, setCurrCategory] = useState(0)
  const [currPage, setCurrPage] = useState(1)
  const prevMediaType = usePrevious(mediaType)

  const dispatch = useDispatch()

  const mediaCategories = useMemo(() => ['popular', 'top_rated'])
  const category = ['Popular', 'top_rated']

  useEffect(() => {
    dispatch(setAppState(mediaType))
    window.scrollTo(0, 0)
  }, [mediaType, dispatch])

  useEffect(() => {})

  return <div>MediaList</div>
}

export default MediaList
