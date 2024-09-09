import React from 'react'
import { LoadingButton } from '@mui/lab'
import { Box, Stack, TextField } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Container from '../components/common/Container'
import uiConfigs from '../configs/ui.configs'
import { useState } from 'react'
import userApi from '../api/modules/user.api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/features/userSlice'
import { setAuthModalOpen } from '../redux/features/authModalSlice'

const PasswordUpdate = () => {
  const [onRequest, setOnRequest] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const form = useFormik({
    initialValues: {
      password: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema: Yup.object({
      password: Yup.string().min(8, 'Password must be at least 8 characters').required('password is Required'),
      newPassword: Yup.string().min(8, 'newPassword must be at least 8 characters').required('newPassword is Required'),
      confirmNewPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'confirmNewPassword not match') // 必須符合是newPassword
        .min(8, 'confirmNewPassword must be at least 8 characters')
        .required('confirmNewPassword is Required'),
    }),
    onSubmit: async values => onUpdate(values),
  })

  const onUpdate = async values => {
    if (onRequest) return
    setOnRequest(true)

    const { response, err } = await userApi.passwordUpdate(values)

    setOnRequest(false)

    if (err) toast.error(err.message)
    if (response) {
      form.resetForm()
      navigate('/')
      dispatch(setAuthModalOpen(true))
      dispatch(setUser(null))
      toast.success('Password updated! Please re-login')
    }
  }

  return (
    <Box
      sx={{
        ...uiConfigs.style.container,
      }}
    >
      <Container header="update password">
        <Box component="form" maxWidth="400px" onSubmit={form.handleSubmit}>
          <Stack spacing={2}>
            <TextField
              type="password"
              placeholder="password"
              name="password"
              fullWidth
              value={form.values.password}
              onChange={form.handleChange}
              color="success"
              error={form.touched.password && form.errors.password !== undefined}
              helperText={form.touched.password && form.errors.password}
            />
            <TextField
              type="password"
              placeholder="new password"
              name="newPassword"
              fullWidth
              value={form.values.newPassword}
              onChange={form.handleChange}
              color="success"
              error={form.touched.newPassword && form.errors.newPassword !== undefined}
              helperText={form.touched.newPassword && form.errors.newPassword}
            />
            <TextField
              type="password"
              placeholder="confirm new password"
              name="confirmNewPassword"
              fullWidth
              value={form.values.confirmNewPassword}
              onChange={form.handleChange}
              color="success"
              error={form.touched.confirmNewPassword && form.errors.confirmNewPassword !== undefined}
              helperText={form.touched.confirmNewPassword && form.errors.confirmNewPassword}
            />
            <LoadingButton type="submit" fullWidth variant="contained" sx={{ marginTop: 4 }} loading={onRequest}>
              update password
            </LoadingButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}

export default PasswordUpdate
