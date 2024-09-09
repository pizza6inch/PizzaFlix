import React from 'react'
import { Box, Toolbar, Typography, Stack, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PersonMediaGrid from '../components/common/PersonMediaGrid'
import tmdbConfigs from '../api/configs/tmdb.configs'
import uiConfigs from '../configs/ui.configs'
import Container from '../components/common/Container'
import personApi from '../api/modules/person.api'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setGlobalLoading } from '../redux/features/globalLoadingSlice'

const PersonDetail = () => {
  const { personId } = useParams()
<<<<<<< HEAD
  const [person, setPerson] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    const getPerson = async () => {
      dispatch(setGlobalLoading(true))
      const { response, error } = await personApi.detail({ personId })
      dispatch(setGlobalLoading(false))
      if (error) toast.error(error.errors)
      if (response) setPerson(response)
    }
    getPerson()
  }, [personId, dispatch])
=======
  const [person, setPerson] = useState()
  const dispatch = useDispatch()
  useEffect(() => {
    const getPerson = async () => {
      dispatch(setGlobalLoading(true))
      const { response, err } = await personApi.detail({ personId })
      dispatch(setGlobalLoading(false))
      if (err) toast.error(err.message)
      if (response) setPerson(response)
    }
    getPerson()
  }, [personId])
>>>>>>> d58861f0c0cab312335f4ca2ae2441b8988f645b

  return (
    <>
      <Toolbar />
      {person && (
        <>
          <Box sx={{ ...uiConfigs.style.mainContent }}>
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
              }}
            >
              <Box
                sx={{
                  width: { xs: '50%', md: '20%' },
                }}
              >
                <Box
                  sx={{
                    paddingTop: '160%',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundColor: 'darkgray',
                    backgroundImage: `url(${tmdbConfigs.posterPath(person.profile_path)})`,
                  }}
                />
              </Box>
              <Box
                sx={{
                  padding: { xs: '1rem', md: '1rem 2rem' },
                  width: { xs: '100%', md: '80%' },
                }}
              >
                <Stack spacing={2}>
                  <Typography variant="h5" fontWeight="700">
                    {`${person.name} (${person.birthday.split('-')[0]}`}
                    {person.deathDay && ` - ${person.deathDay.split('-')[0]}`}
                    {')'}
                  </Typography>
                  <Typography sx={{ ...uiConfigs.style.typoLines(10) }}>{person.biography}</Typography>
                </Stack>
              </Box>
            </Box>
            <Container header="medias">
              <PersonMediaGrid personId={personId} />
            </Container>
          </Box>
        </>
      )}
    </>
  )
}

export default PersonDetail
