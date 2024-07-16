import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
const ProtectedPage = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.user)
  useEffect(() => {
    if (!user) dispatch(setAuth)
  }, [user, dispatch])

  return <div>ProtectedPage</div>
}

export default ProtectedPage
