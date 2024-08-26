const cloudinary = require('../helpers/cloudinary.config')
const Post = require('../models/post.schema')





const postCtrl = {
    addPost : async (req,res) => {
        try {
            const {title,description,image} = req.body
            const userId = req.user.id ;
            const newPost = new Post ({
                title , 
                description,
                owner : userId
            })
            
            if(image){
                const savedImage = await cloudinary.uploader.upload(image,{
                    timestamp : 6000,
                    upload_preset : "mern_App_morning"
                })

                if(!savedImage){
                    console.log('error', error)
                    return res.status(500).json('error occurred')
                }
                
                newPost.image = {
                    url : savedImage.url,
                    public_id : savedImage.public_id
                }

            }
            
            const post = await newPost.save()


            return res.status(200).json(post)
            
        } catch (error) {
            console.log('err', error)   
            return res.status(500).json(error)
        }
    },

    updatePost : async (req,res) => {
        try {
            const postId = req.params.id
            
            const existPost = await Post.findOne({
                _id : postId
            })

            if(!existPost){
                return res.status(404).json('post does not exist')
            } 
            const {title,description} = req.body
            const updatedPost = await Post.updateOne(
                {_id:postId},
                {   
                    $set:{
                        title ,
                        description,
                        updatedAt:new Date()
                    }
                }
            )
            
            return res.status(200).json(updatedPost)
            
        } catch (error) {
            console.log('err', error)   
            return res.status(500).json(error)
        }
    },

    deletePost : async (req,res) => {
        try {

            await Post.deleteOne({
                _id : req.params.id
            })

            return res.status(200).json('post deleted successfully')
        } catch (error) {
            console.log('err', error)   
            return res.status(500).json(error)
        }
    }
}

module.exports = postCtrl