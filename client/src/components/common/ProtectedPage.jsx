import React, { Children } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setAuthModalOpen } from '../../redux/features/authModalSlice'
const ProtectedPage = ({ Children }) => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.user)
  useEffect(() => {
    dispatch(setAuthModalOpen(!user)) // if not user then show AuthModal
  }, [user, dispatch])

  return user ? Children : null
}

export default ProtectedPage
