import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getMe } from '../redux/slices/auth.slice'

const Profile = () => {

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getMe())
  },[])



  return (
    <div>Profile</div>
  )
}

export default Profile