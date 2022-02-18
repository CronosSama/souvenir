import mongoose from "mongoose"
//Create a Schema
const PostSchema = new mongoose.Schema({
  title : String,
  message: String,
  creator: String,
  tags: [String],
  gift : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Gift"
  },
  selectedFile: String,
  likeCount:{
    type : Number,
    default: 0
  },
  CreatedAt : {
    type : Date,
    default: new Date()
  }

})

// Turn it to a model
const Post = mongoose.model("Post",PostSchema)


export default Post;