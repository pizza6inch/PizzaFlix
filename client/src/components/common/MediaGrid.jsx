import { Grid } from '@mui/material'

const MediaGrid = ({ medias, mediaType }) => {
  return (
    <Grid container spacing={1} sx={{ marginRight: '-8px!important' }}>
      {medias.map(media => (
        <Grid key={media.id} item xs={6} sm={4} md={3}>
          <MediaItem media={media} mediaType={mediaType} />
        </Grid>
      ))}
    </Grid>
  )
}

export default MediaGrid
