import React, { useState, useEffect } from 'react';

import { heartfill, heartline } from '../assets/index.js';

function LikeButton({ postId, userId }) {
  const [liked, setLiked] = useState(false);
  const [numLikes, setNumLikes] = useState(0);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await fetch(`https://artificialgallery.onrender.com/api/v1/post/${postId}`);
        const data = await response.json();
        if (response.ok) {
          const isLiked = data.data.likes ? data.data.likes.includes(userId) : false;
          setLiked(isLiked);
          setNumLikes(data.data.likes.length);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchLikes();
  }, [postId, userId]);


  const handleLike = async () => {
   if (!userId) {
      console.error('User ID is undefined or null');
      return;
   }

    try {
      const response = await fetch(`https://artificialgallery.onrender.com/api/v1/post/${postId}/like`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId})
      });

      const result = await response.json();
      if (result.success) {
        setLiked(result.data.likes.includes(userId));
        setNumLikes(result.data.likes.length);
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <button onClick={handleLike} className="flex items-center gap-1 text-[#6469ff]">
      <img className="w-5 h-auto" src={liked ? heartfill : heartline} alt="" /> 
      {numLikes}
      {/* {liked ? "Liked!" : "Like"} */}
    </button>
  );
}

export default LikeButton;
