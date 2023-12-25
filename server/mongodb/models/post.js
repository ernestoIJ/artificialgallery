import mongoose, { mongo } from "mongoose";

const Post = new mongoose.Schema({
   name: { type: String, required: true},
   prompt: { type: String, required: true},
   photo: { type: String, required: true},
   userId: { type: String, required: true},
   likes: [{ type: String }],
});

const PostSchema = mongoose.model("Post", Post);

export default PostSchema;