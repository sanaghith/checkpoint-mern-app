import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import FormAddPost from '../components/FormAddPost'
import { getMe } from '../redux/slices/auth.slice'

const Profile = () => {

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getMe())
  },[])



  return (
    <div  className='text-center container-md' >
      <h1> Welcome to my profile </h1>
      <FormAddPost/>
      
    </div>
  )
}

export default Profile