import React, { useState } from 'react'

import { LoadingButton } from '@mui/lab'
import { Alert, Box, Button, Stack, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import userApi from '../../api/modules/user.api.js'
import { setAuthModalOpen } from '../../redux/features/authModalSlice.js'
import { setUser } from '../../redux/features/userSlice.js'

const SigninForm = ({ switchAuthState }) => {
  const dispatch = useDispatch()

  const [isLoginRequest, setIsLoginRequest] = useState(false)
  const [errorMessage, setErrorMessage] = useState()

  const SigninForm = useFormik({
    initialValues: {
      password: '',
      username: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().min(8, 'username minimum 8 characters').required('username is required'),
      password: Yup.string().min(8, 'password minimum 8 characters').required('password is required'),
    }),
    onSubmit: async values => {
      setErrorMessage(undefined)
      setIsLoginRequest(true)
      //console.log('asdasdasdasd')
      const { response, err } = await userApi.signin(values)
      setIsLoginRequest(false)
      if (response) {
        SigninForm.resetForm()
        dispatch(setUser(response))
        dispatch(setAuthModalOpen(false))
        toast.success('Sign in success')
      }

      if (err) setErrorMessage(err.message)
    },
  })

  return (
    <Box component="form" onSubmit={SigninForm.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          type="text"
          placeholder="username"
          name="username"
          fullWidth
          value={SigninForm.values.username}
          onChange={SigninForm.handleChange}
          color="success"
          error={SigninForm.touched.username && SigninForm.errors.username !== undefined}
          helperText={SigninForm.touched.username && SigninForm.errors.username}
        ></TextField>
        <TextField
          type="password"
          placeholder="password"
          name="password"
          fullWidth
          value={SigninForm.values.password}
          onChange={SigninForm.handleChange}
          color="success"
          error={SigninForm.touched.password && SigninForm.errors.password !== undefined}
          helperText={SigninForm.touched.password && SigninForm.errors.password}
        ></TextField>
      </Stack>
      <LoadingButton
        type="submit"
        fullWidth
        size="large"
        variant="contained"
        sx={{ marginTop: 4 }}
        loading={isLoginRequest}
      >
        sign in
      </LoadingButton>

      <Button fullWidth sx={{ marginTop: 1 }} onClick={() => switchAuthState()}>
        sign up
      </Button>

      {errorMessage && (
        <Box sx={{ marginTop: 2 }}>
          <Alert severity="error" variant="outlined">
            {errorMessage}
          </Alert>
        </Box>
      )}
    </Box>
  )
}

export default SigninForm
