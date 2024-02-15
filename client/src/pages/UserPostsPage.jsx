import React, { useState, useEffect } from 'react';

import { Loader, Card } from "../components";

import { useAuth } from "@clerk/clerk-react"

const RenderCards = ({ data, title, onDelete, showDeleteButton }) => {
   if (data?.length > 0) {
      return data.map((post) => <Card key={post._id} {...post} onDelete={onDelete} showDeleteButton={showDeleteButton}/>);
   }

   return (
      <h2 className='mt-5 font-bold text-[#6449ff] text-xl uppercase'>{title}</h2>
   )
}

function UserPostsPage() {

   const [loading, setLoading] = useState(false);
   const [userPosts, setUserPosts] = useState(null);

   const { userId } = useAuth();

   useEffect(() => {
      const fetchPosts = async () => {
         setLoading(true);

         try {
            const response = await fetch("https://artificialgallery.onrender.com/api/v1/post", {
               method: "GET",
               headers: {
                  "Content-Type": "application/json",
               },
            });

            if (response.ok) {
               const result = await response.json();
               
               const myPosts = result.data.filter((post) => post.userId === userId);

               setUserPosts(myPosts.reverse());
            }
         } catch (error) {
            alert(error);
         } finally {
            setLoading(false);
         }
      }

      fetchPosts();
   }, []);

   const handleDeletePost = async (postId) => {
      try {
         const response = await fetch(`https://artificialgallery.onrender.com/api/v1/post/${postId}`, {
            method: "DELETE",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId })
         });

         if (response.ok) {
            setUserPosts(userPosts.filter((post) => post._id !== postId));
         }
      } catch (error) {
         console.error("Error deleting post:", error);
      }
   }

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
         <h1 className='font-extrabold text-white text-[32px]'>My Posts</h1>
      </div>

      <div className='mt-10'>
         {loading ? (
            <div className='flex justify-center items-center'>
               <Loader />
            </div>
         ) : (
            <>
               <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
                  {(
                     <RenderCards 
                        data={userPosts}
                        title="No posts found"
                        onDelete={handleDeletePost}
                        showDeleteButton={true}
                     />
                  )}
               </div>
            </>
         )}
      </div>
    </section>
  )
}

export default UserPostsPage;
