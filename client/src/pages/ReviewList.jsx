import React from 'react'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Divider, Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import tmdbConfigs from '../api/configs/tmdb.configs'
import reviewApi from '../api/modules/review.api'
import Container from '../components/common/Container'
import uiConfigs from '../configs/ui.configs'
import { setGlobalLoading } from '../redux/features/globalLoadingSlice'
import DeleteIcon from '@mui/icons-material/Delete'
import { routesGen } from '../routes/routes'

const ReviewItem = ({ review, onRemoved }) => {
  const [onRequest, setOnRequest] = useState(false)

  const onRemove = async () => {
    if (onRequest) return
    setOnRequest(true)
    const { response, err } = await reviewApi.remove({ reviewId: review.id }) // 告訴database要刪除哪一筆review
    setOnRequest(false)

    if (err) toast.error("couldn't remove review")
    if (response) {
      toast.success('review removed')
      onRemoved(review.id) // 更新當前頁面UI
    }
  }
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        padding: 1,
        opacity: onRequest ? 0.6 : 1,
        '&:hover': { backgroundColor: 'background.paper' },
      }}
    >
      <Box sx={{ width: { xs: 0, md: '10%' } }}>
        <Link
          to={routesGen.mediaDetail(review.mediaType, review.mediaId)}
          style={{ color: 'unset', textDecoration: 'none' }}
        >
          <Box
            sx={{
              paddingTop: '160%',
              ...uiConfigs.style.backgroundImage(tmdbConfigs.posterPath(review.mediaPoster)),
            }}
          ></Box>
        </Link>
      </Box>
      <Box
        sx={{
          width: { xs: '100%', md: '80%' },
          padding: { xs: 0, md: '0 2rem' },
        }}
      >
        <Stack spacing={1}>
          <Link
            to={routesGen.mediaDetail(review.mediaType, review.mediaid)}
            style={{ color: 'unset', textDecoration: 'none' }}
          >
            <Typography variant="h6" sx={{ ...uiConfigs.style.typoLines(1, 'left') }}>
              {review.mediaTitle}
            </Typography>
          </Link>
          <Typography variant="caption">{dayjs(review.createdAt).format('DD-MM-YYYY HH:mm:dddd')}</Typography>
          <Typography>{review.content}</Typography>
        </Stack>
      </Box>
      <LoadingButton
        variant="contained"
        sx={{
          position: { xs: 'relative', md: 'absolute' },
          right: { xs: 0, md: '10px' },
          marginTop: { xs: 2, md: 0 },
          width: 'max-content',
        }}
        loading={onRequest}
        onClick={onRemove}
        loadingPosition="start"
        startIcon={<DeleteIcon />}
      >
        remove
      </LoadingButton>
    </Box>
  )
}
const ReviewList = () => {
  const [reviews, setReviews] = useState([])
  const [filteredReviews, setFilteredReviews] = useState([])
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0)
  const skip = 8

  const dispatch = useDispatch()

  useEffect(() => {
    const getReviews = async () => {
      dispatch(setGlobalLoading(true))
      const { response, err } = await reviewApi.getList()
      dispatch(setGlobalLoading(false))

      if (err) toast.error(err.message)
      if (response) {
        setReviews([...response])
        setFilteredReviews([...response].splice(0, skip))
        setCount(response.length)
      }
    }
    getReviews()
  }, [])

  const onLoadMore = () => {
    setFilteredReviews([...filteredReviews, ...[...reviews].slice(page * skip, (page + 1) * skip)])
    setPage(page + 1)
  }

  const onRemoved = id => {
    const newReviews = [...reviews].filter(media => media.id !== id)
    setReviews(newReviews)
    setFilteredReviews([...newReviews].slice(0, (page + 1) * skip))
    setCount(count - 1)
  }
  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header={`Your reviews (${count})`}>
        <Stack spacing={2}>
          {filteredReviews.map(review => (
            <Box key={review.id}>
              <ReviewItem review={review} onRemoved={onRemoved} />
              <Divider
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              />
            </Box>
          ))}
          {filteredReviews.length < reviews.length && <Button onClick={onLoadMore}>load more</Button>}
        </Stack>
      </Container>
    </Box>
  )
}

export default ReviewList
