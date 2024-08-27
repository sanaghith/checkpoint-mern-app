import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PostCard from '../components/PostCard'
import { getAllPost } from '../redux/slices/post.slice'

const Feed = () => {

  const dispatch = useDispatch()
  const posts = useSelector((state) => state.PostReducer.posts);
  const isLoading = useSelector((state) => state.PostReducer.isLoading);
  const error = useSelector((state) => state.PostReducer.errors);

   
  useEffect(()=>{
    dispatch(getAllPost())
  },[posts])


  return (
    <div className='text-center container-md' >

        {
          posts.map((elm,i)=>
            <PostCard post={elm} key={i}/>)
        }
     

    </div>
  )
}

export default Feed