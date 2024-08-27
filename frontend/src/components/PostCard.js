import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../redux/slices/post.slice";

const PostCard = ({post}) => {

    const dispatch = useDispatch()
    const user = useSelector((state) => state.AuthReducer.user);

    const handleDelete = (id) => {
        dispatch(deletePost(id))
    }

  return (
    <div className="card my-3">
      <div className="row row-0">
        <div className="col-3">
          {/* Photo */}
          <img
            src= {post.image.url}
            className="w-100 h-100 object-cover card-img-start"
            alt="Beautiful blonde woman relaxing with a can of coke on a tree stump by the beach"
          />
        </div>
        <div className="col">
          <div className="card-body">
            <h1> {post.owner.firstName} {post.owner.lastName} </h1>
            <h3 className="card-title">{post.title}</h3>
            <p className="text-secondary">
                {post.description}
            </p>
          </div>
        </div>

        { user?._id == post.owner._id && 
        
        <button 
            className="btn btn-primary col-2"
            onClick={()=>handleDelete(post._id)}    
        >
            delete
        </button>}

      </div>
    </div>
  );
};

export default PostCard;
