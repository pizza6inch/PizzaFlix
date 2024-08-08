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

  const [isLogin, setIsLogin] = useState(false)
  const [errorMessage, setErrorMessage] = useState()

  const SigninForm = useFormik({
    initialValues: {
      password: '',
      usename: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().min(8, 'username minimum 8 characters').required('username is required'),
      password: Yup.string().min(8, 'password minimum 8 characters').required('password is required'),
    }),
  })

  return <div>SigninForm</div>
}

export default SigninForm
