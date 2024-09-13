import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { Box, Button, Chip, Divider, Stack, Typography, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { toast } from 'react-toastify'
import { Autoplay } from 'swiper/modules'
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
  const [genres, setGenres] = useState([])
  const [loopEnabled, setLoopEnabled] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setGlobalLoading(true))

      const [genreResponse, mediaResponse] = await Promise.all([
        genreApi.getList({ mediaType }),
        mediaApi.getList({ mediaType, mediaCategory, page: 1 }),
      ])

      dispatch(setGlobalLoading(false))

      if (genreResponse.response) {
        setGenres(genreResponse.response.genres)
      } else {
        toast.error(genreResponse.err.errors)
      }

      if (mediaResponse.response) {
        setMovies(mediaResponse.response.results)
        setLoopEnabled(mediaResponse.response.results.length > 1)
      } else {
        toast.error(mediaResponse.err.errors)
      }
    }

    fetchData()
  }, [mediaType, mediaCategory, dispatch])

  return (
    <Box
      sx={{
        position: 'relative',
        color: 'primary.contrastText',
        minWidth: '100%',
        aspectRatio: { lg: '2.5/1', md: '2/1', sm: '1.5/1', xs: '1/1' }, // decease cumualtive layout shift
        '&::before': {
          content: '""',
          width: '100%',
          height: '30%',
          position: 'absolute',
          top: '70%',
          left: 0,
          zIndex: 2,
          pointerEvents: 'none',
          ...uiConfigs.style.gradientBgImage[theme.palette.mode],
        },
      }}
    >
      <Swiper
        grabCursor={true}
        loop={loopEnabled}
        modules={[Autoplay]}
        style={{ width: '100%', height: '100%' }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                paddingTop: {
                  xs: '130%',
                  sm: '80%',
                  md: '60%',
                  lg: '45%',
                },
                backgroundPosition: 'top',
                backgroundSize: 'cover',
                backgroundImage: `url(${tmdbConfigs.backdropPath(movie.backdrop_path || movie.poster_path)})`,
              }}
            />
            <Box
              sx={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                ...uiConfigs.style.horizontalGradientBgImage[theme.palette.mode],
              }}
            />
            <Box
              sx={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                paddingX: { sm: '10px', md: '5rem', lg: 'rem' },
              }}
            >
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  paddingX: '30px',
                  color: 'text.primary',
                  width: { sm: 'unset', md: '30%', lg: '40%' },
                }}
              >
                <Stack spacing={4} direction="column">
                  {/* title */}
                  <Typography
                    variant="h4"
                    fontSize={{ xs: '2rem', md: '2rem', lg: '4rem' }}
                    fontWeight="700"
                    sx={{ ...uiConfigs.style.typoLines(2) }}
                  >
                    {movie.title || movie.name}
                  </Typography>
                  {/* title */}
                  <Stack direction="row" spacing={1} alignItems="center">
                    {/* rating */}
                    <CircularRate value={movie.vote_average} />
                    {/* rating */}
                    <Divider orientation="vertical" />
                    {/* genres */}
                    {[...movie.genre_ids].splice(0, 2).map((genreId, index) => (
                      <Chip
                        variant="filled"
                        color="primary"
                        key={index}
                        label={genres.find(e => e.id === genreId) && genres.find(e => e.id === genreId).name}
                      />
                    ))}
                    {/* genres */}
                  </Stack>
                  {/* overview */}
                  <Typography
                    variant="body1"
                    sx={{
                      ...uiConfigs.style.typoLines(3),
                    }}
                  >
                    {movie.overview}
                  </Typography>
                  {/* overview */}
                  {/* buttons */}
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<PlayArrowIcon />}
                    component={Link}
                    to={routesGen.mediaDetail(mediaType, movie.id)}
                    sx={{ width: 'max-content' }}
                  >
                    watch now
                  </Button>
                  {/* buttons */}
                </Stack>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}

export default HeroSlide
