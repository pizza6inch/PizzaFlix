import React from 'react'
import { LoadingButton } from '@mui/material'
import { Box, Button, Stack, Typography } from '@mui/material'
import { useEffect, useState, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import tmdbConfigs from '../api/configs/tmdb.configs'
import mediaApi from '../api/modules/media.api'
import uiConfigs from '../configs/ui.configs'
import usePrevious from '../hooks/userPrevious'
import HeroSlide from '../components/common/HeroSlide'
import MediaGrid from '../components/common/MediaGrid'
import { setAppState } from '../redux/features/appStateSlice'
import { setGlobalLoading } from '../redux/features/globalLoadingSlice'
import { toast } from 'react-toastify'

const MediaList = () => {
  const { mediaType } = useParams()

  const [medias, setMedias] = useState([])
  const [mediaLoading, setMediaLoading] = useState(false)
  const [currCategory, setCurrCategory] = useState(0)
  const [currPage, setCurrPage] = useState(1)

  const prevMediaType = usePrevious(mediaType)
  const dispatch = useDispatch()

  const mediaCategories = useMemo(() => ['popular', 'top_rated'], [])
  const category = ['Popular', 'top_rated']

  useEffect(() => {
    dispatch(setAppState(mediaType))
    window.scrollTo(0, 0)
  }, [mediaType, dispatch])

  useEffect(() => {
    const getMedias = async () => {
      if (currPage === 1) dispatch(setGlobalLoading(true))
      setMediaLoading(true)

      const { response, error } = await mediaApi.getList({
        mediaType,
        mediaCategory: mediaCategories[currCategory],
        page: currPage,
      })

      setMediaLoading(false)
      dispatch(setGlobalLoading(false))

      if (error) toast.error(error.errors)
      if (response) {
        if (currPage !== 1) setMedias(m => [...m, ...response.data.results])
        else setMedias([...response.results])
      }
    }

    if (mediaType !== prevMediaType) {
      setCurrCategory(0)
      setCurrPage(1)
    }
    console.log(mediaType, currCategory, currPage, prevMediaType, mediaCategories)
    getMedias()
  }, [mediaType, currCategory, currPage, prevMediaType, mediaCategories, dispatch])

  const onCategoryChange = categoryIndex => {
    if (currCategory === categoryIndex) return
    setCurrCategory(categoryIndex)
    setCurrPage(1)
    setMedias([])
  }

  const onLoadMore = () => {
    setCurrPage(currPage + 1)
  }

  return (
    <>
      <HeroSlide mediaType={mediaType} mediaCategory={mediaCategories[currCategory]} />
      {/* <Box sx={{ uiConfigs }}></Box> */}
    </>
  )
}

export default MediaList
