import React, { useState, useEffect, useCallback } from 'react'

import { LoadingButton } from '@mui/lab'
import { Box, Button, Stack, TextField, Toolbar } from '@mui/material'
import { toast } from 'react-toastify'
import mediaApi from '../api/modules/media.api'
import MediaGrid from '../components/common/MediaGrid'
import uiConfig from '../configs/ui.configs'

const mediaTypes = ['movie', 'tv', 'people']
let timer
const timeout = 500

const MediaSearch = () => {
  const [query, setQuery] = useState('')
  const [onSearch, setOnSearch] = useState(false)
  const [mediaType, setMediaType] = useState(mediaTypes[0])
  const [medias, setMedias] = useState([])
  const [page, setPage] = useState(1)

  const search = useCallback(async () => {
    setOnSearch(true)

    const { response, error } = await mediaApi.searchMedia({ mediaType, query, page })

    setOnSearch(false)

    if (error) toast.error(error)
    if (response) setMedias(m => [...m, ...response.results])
  }, [mediaType, query, page])

  useEffect(() => {
    window.scrollTo(0, 0)
    if (query.trim().length === 0) {
      setMedias([])
      setPage(1)
    } else search()
  }, [search, query, mediaType])

  useEffect(() => {
    setMedias([])
    setPage(1)
  }, [mediaType])

  const onCategoryChange = selectedCategory => setMediaType(selectedCategory)

  const onQueryChange = e => {
    // debounce
    const newQuery = e.target.value
    clearTimeout(timer)
    timer = setTimeout(() => setQuery(newQuery), timeout)
  }

  return (
    <>
      <Toolbar />
      <Box sx={{ ...uiConfig.style.mainContent }}>
        <Stack spacing={2}>
          <Stack spacing={2} direction="row" justifyContent="center" sx={{ width: '100%' }}>
            {mediaTypes.map((item, index) => (
              <Button
                size="large"
                key={index}
                variant={mediaType === item ? 'contained' : 'text'}
                sx={{
                  color: mediaType === item ? 'primary.contrastText' : 'text.primary',
                }}
                onClick={() => onCategoryChange(item)}
              >
                {item}
              </Button>
            ))}
          </Stack>
          <TextField
            color="success"
            placeholder="Search PizzaFlix"
            sx={{
              width: '100%',
            }}
            autoFocus
            onChange={onQueryChange}
          />
        </Stack>
      </Box>
    </>
  )
}

export default MediaSearch
