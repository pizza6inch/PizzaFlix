import { Button, Grid } from '@mui/material'
import { useState, useEffect } from 'react'
import tmdbConfigs from '../../api/configs/tmdb.configs'
import personApi from '../../api/modules/person.api'
import MediaItem from './MediaItem'
import { toast } from 'react-toastify'

const PersonMediaGrid = ({ personId }) => {
  const [medias, setMedias] = useState([])
  const [filteredMedias, setFilteredMedias] = useState([])
  const [page, setPage] = useState(1)
  const skip = 8

  useEffect(() => {
    const getMedias = async () => {
      const { response, err } = await personApi.medias({ personId })

      if (err) toast.error(err.errors)
      if (response) {
        const mediasSorted = response.cast.sort((a, b) => getReleaseDate(b) - getReleaseDate(a))
        setMedias([...mediasSorted])
        setFilteredMedias([...mediasSorted].splice(0, skip))
      }
    }

    getMedias()
  }, [personId])

  const getReleaseDate = media => {
    const date =
      media.media_type === tmdbConfigs.mediaType.movie ? new Date(media.release_date) : new Date(media.first_air_date)
    return date.getTime()
  }

  const onLoadMore = () => {
    setFilteredMedias([...filteredMedias, ...[...medias].splice(page * skip, skip)])
    setPage(page + 1)
  }
  return (
    <>
      <Grid container spacing={1} sx={{ marginRight: '-8px!important' }}>
        {filteredMedias.map(media => (
          <Grid item key={media.id} xs={6} sm={4} md={3}>
            <MediaItem media={media} mediaType={media.media_type} />
          </Grid>
        ))}
      </Grid>
      {medias.length > filteredMedias.length && <Button onClick={onLoadMore}>Load More</Button>}
    </>
  )
}

export default PersonMediaGrid
