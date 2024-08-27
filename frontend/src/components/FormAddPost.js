import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../redux/slices/post.slice";

const FormAddPost = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.PostReducer.isLoading);
  const error = useSelector((state) => state.PostReducer.errors);

  const [selectedImage, setSelectedImage] = useState("");
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
  });
  const handleChange = (e) => {
    e.preventDefault();
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    });
  };

  const handleImgChange = (e) => {
    e.preventDefault();
    console.log(e);
    if (e.target.files.length) {
      const myImg = e.target.files[0];
      //create reader to convert img to file
      const reader = new FileReader();
      reader.readAsDataURL(myImg);
      reader.onload = () => {
        setSelectedImage(reader.result);
        setNewPost({ ...newPost, image: reader.result });
      };
    }
  };

  const addNewPost = () => {
    dispatch(addPost(newPost));
    setNewPost({
      title: "",
      description: "",
    });
    setSelectedImage("");
  };

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">Add your new post</h3>

        <div className="input-icon my-3 text-start">
          <label className="form-label required"> Post Image : </label>

          <input
            type="file"
            className="form-control"
            onChange={handleImgChange}
          />

          {selectedImage && (
            <img src={selectedImage} width="250" height="250" />
          )}
        </div>

        <div className="input-icon my-3 text-start">
          <label className="form-label required"> Post title : </label>
          <input
            type="text"
            className="form-control"
            placeholder="Post title"
            name="title"
            onChange={handleChange}
          />
        </div>

        <div className="input-icon text-start">
          <label className="form-label required"> Post description : </label>
          <input
            type="text"
            className="form-control"
            placeholder="Post description"
            name="description"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="card-footer">
        <div className="row">
          <button
            className="btn btn-primary col-2"
            disabled={isLoading}
            onClick={addNewPost}
          >
            {isLoading ? "loading" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormAddPost;
