import React, { useState, useEffect } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Grid } from '@mui/material'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import MediaItem from '../components/common/MediaItem'
import Container from '../components/common/Container'
import uiConfigs from '../configs/ui.configs'
import favoriteApi from '../api/modules/favorite.api'
import { setGlobalLoading } from '../redux/features/globalLoadingSlice'
import { removeFavorite } from '../redux/features/userSlice'

const FavoriteItem = ({ media, onRemoved }) => {
  const dispatch = useDispatch()

  const [onReuqest, setOnRequest] = useState(false)

  const onRemove = async () => {
    if (onReuqest) return
    setOnRequest(true)
    const { response, err } = await favoriteApi.remove({ favoriteId: media.id })
    setOnRequest(false)

    if (err) toast.error("couldn't remove from favorites")
    if (response) {
      toast.success('removed from favorites')
      dispatch(removeFavorite({ mediaId: media.mediaId }))
      onRemoved(media.id)
    }
  }
  return (
    <>
      <MediaItem media={media} mediaType={media.mediaType} />
      <LoadingButton
        fullWidth
        variant="contained"
        sx={{ marginTop: 2 }}
        startIcon={<DeleteIcon />}
        loading={onReuqest}
        onClick={onRemove}
      >
        {'remove'}
      </LoadingButton>
    </>
  )
}

const FavoriteList = () => {
  const [medias, setMedias] = useState([])
  const [filteredMedias, setFilteredMedias] = useState([])
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0)
  const skip = 8

  const dispatch = useDispatch()

  useEffect(() => {
    const getFavorites = async () => {
      dispatch(setGlobalLoading(true))
      const { response, err } = await favoriteApi.getList()
      dispatch(setGlobalLoading(false))

      if (err) toast.error(err.message)
      if (response) {
        setMedias([...response])
        setFilteredMedias([...response].splice(0, skip))
        setCount(response.length)
      }
    }
    getFavorites()
  }, [dispatch])

  const onLoadMore = () => {
    setFilteredMedias([...filteredMedias, ...[...medias].slice(page * skip, (page + 1) * skip)])
    setPage(page + 1)
  }

  const onRemoved = id => {
    const newMedias = [...medias].filter(media => media.id !== id)
    setMedias(newMedias)
    setFilteredMedias([...newMedias].slice(0, (page + 1) * skip))
    setCount(count - 1)
  }

  return (
    <>
      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Container header={`your favorites (${count})`}>
          <Grid container spacing={1} sx={{ marginRight: '-8px!' }}>
            {filteredMedias.map(media => (
              <Grid item xs={6} sm={4} md={3} key={media.id}>
                <FavoriteItem media={media} onRemoved={onRemoved} />
              </Grid>
            ))}
          </Grid>
          {filteredMedias.length < medias.length && <Button onClick={onLoadMore}>load more</Button>}
        </Container>
      </Box>
    </>
  )
}
export default FavoriteList
