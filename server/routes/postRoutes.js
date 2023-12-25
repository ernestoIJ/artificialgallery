import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import Post from "../mongodb/models/post.js";

dotenv.config();

const router = express.Router();

cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get all posts
router.route("/").get(async (req, res) => {
   try {
      const posts = await Post.find({});

      res.status(200).json({ success: true, data: posts });
   } catch (error) {
      res.status(500).json({ success: false, message: error });
   }
});

// create a post
router.route("/").post(async (req, res) => {
   try {
      const { name, prompt, photo, userId, likes } = req.body;
      const photoUrl = await cloudinary.uploader.upload(photo);

      const newPost = await Post.create({
         name,
         prompt,
         photo: photoUrl.url,
         userId: userId,
         likes
      });

      res.status(200).json({ success: true, data: newPost });
   } catch (error) {
      res.status(500).json({ success: false, message: error });
   }
   
});

// Get a specific post by ID
router.get("/:postId", async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }
        res.status(200).json({ success: true, data: post });
    } catch (error) {
        res.status(500).json({ success: false, message: error });
    }
});

// Like a post
router.put("/:postId/like", async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.body.userId;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    let updatedPost = await Post.findById(postId);
    if (!updatedPost) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    if (updatedPost.likes.includes(userId)) {
      updatedPost.likes.pull(userId);
    } else {
      updatedPost.likes.push(userId);
    }

    await updatedPost.save();
    res.status(200).json({ success: true, data: updatedPost });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete("/:postId", async (req, res) => {
   try {
      const { postId } = req.params;
      const userId = req.body.userId;

      const post = await Post.findById(postId);
      if (!post) {
         return res.status(404).json({ success: false, message: "Post not found" });
      }

      if (post.userId !== userId) {
         return res.status(403).json({ success: false, message: "Unauthorized to delete this post" });
      }

      await Post.deleteOne({ _id: postId });
      res.status(200).json({ success: true, message: "Post deleted successfully" });

   } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: error.message });
   }
});


export default router;