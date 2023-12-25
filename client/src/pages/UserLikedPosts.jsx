import React, { useState, useEffect } from 'react';

import { Loader, Card } from "../components";

import { useAuth } from "@clerk/clerk-react"

const RenderCards = ({ data, title }) => {
   if (data?.length > 0) {
      return data.map((post) => <Card key={post._id} {...post} />);
   }

   return (
      <h2 className='mt-5 font-bold text-[#6449ff] text-xl uppercase'>{title}</h2>
   )
}

function UserLikedPosts() {

   const [loading, setLoading] = useState(false);
   const [userPosts, setUserPosts] = useState(null);

   const { userId } = useAuth();

   useEffect(() => {
      const fetchPosts = async () => {
         setLoading(true);

         try {
            const response = await fetch("http://localhost:8080/api/v1/post", {
               method: "GET",
               headers: {
                  "Content-Type": "application/json",
               },
            });

            if (response.ok) {
               const result = await response.json();
               
               const myLikes = result.data.filter((posts) => posts.likes.includes(userId));

               setUserPosts(myLikes.reverse());
            }
         } catch (error) {
            alert(error);
         } finally {
            setLoading(false);
         }
      }

      fetchPosts();
   }, []);

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
         <h1 className='font-extrabold text-white text-[32px]'>My Likes</h1>
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
                     />
                  )}
               </div>
            </>
         )}
      </div>
    </section>
  )
}

export default UserLikedPosts;
