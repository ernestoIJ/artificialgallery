import React, { useState, useEffect } from 'react';

import { Loader, Card, FormField } from "../components";

const RenderCards = ({ data, title }) => {
   if (data?.length > 0) {
      return data.map((post) => <Card key={post._id} {...post} />);
   }

   return (
      <h2 className='mt-5 font-bold text-[#6449ff] text-xl uppercase'>{title}</h2>
   )
}

function Home() {

   const [loading, setLoading] = useState(false);
   const [allPosts, setAllPosts] = useState(null);

   const [searchText, setSearchText] = useState("");
   const [searchedResults, setSearchedResults] = useState(null);
   const [searchTimeout, setSearchTimeout] = useState(null);

   const [sortMethod, setSortMethod] = useState('latest');
   const [originalPosts, setOriginalPosts] = useState(null);

   useEffect(() => {
      const fetchPosts = async () => {
         setLoading(true);

         try {
            const response = await fetch("https://artificialgallery-api.vercel.app//api/v1/post", {
               method: "GET",
               headers: {
                  "Content-Type": "application/json",
               },
            });

            if (response.ok) {
               const result = await response.json();

               // setAllPosts(result.data.reverse());
                setOriginalPosts(result.data);
               sortPosts(result.data);
            }
         } catch (error) {
            alert(error);
         } finally {
            setLoading(false);
         }
      }

      fetchPosts();
   }, []);

   const handleSearchChange = (e) => {
      clearTimeout(searchTimeout);

      setSearchText(e.target.value);

      setSearchTimeout(
         setTimeout(() => {
            const searchResults = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));

            setSearchedResults(searchResults);
         }, 500)
      );
   }
   
   useEffect(() => {
      // Effect to handle sorting whenever sortMethod changes
      if (originalPosts) {
         sortPosts([...originalPosts]);
      }
   }, [sortMethod]);

const sortPosts = (posts) => {
  let sortedPosts;
  switch (sortMethod) {
    case 'latest':
      sortedPosts = [...posts].reverse();
      break;
    case 'oldest':
      sortedPosts = [...posts];
      break;
    case 'popular':
      sortedPosts = [...posts].sort((a, b) => b.likes.length - a.likes.length);
      break;
    default:
      sortedPosts = [...posts];
  }
  setAllPosts(sortedPosts);
};

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
         <h1 className='font-extrabold text-white text-[32px]'>Visionary Canvas</h1>
         <p className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'>Explore the World of AI-Crafted Masterpieces. Unveiling the Symphony of Human Creativity and DALL-E's Innovation</p>
      </div>

      <div className='mt-16'>
         <FormField 
            LabelName="Search posts"
            type="text"
            name="text"
            placeholder="Search posts or username"
            value={searchText}
            handleChange={handleSearchChange}
         />
      </div>

      <div className="text-white mt-10">
         <label htmlFor="sorting" className='text-white'>Sort by: </label>
         <select
            name="sorting"
            id="sorting"
            onChange={(e) => setSortMethod(e.target.value)}
            className='bg-[#6469ff] rounded-lg px-2 py-2'
         >
            <option value="latest">Latest - Oldest</option>
            <option value="oldest">Oldest - Latest</option>
            <option value="popular">Most Popular</option>
         </select>
      </div>

      <div className='mt-10'>
         {loading ? (
            <div className='flex justify-center items-center'>
               <Loader />
            </div>
         ) : (
            <>
               {searchText && (
                  <h2 className='font-medium text-xl mb-3 text-slate-400'>
                     Showing results for <span className='text-[#6469ff]'>{searchText}</span>
                  </h2>
               )}

               <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
                  {searchText ? (
                     <RenderCards 
                        data={searchedResults}
                        title="No search results found"
                     />
                  ) : (
                     <RenderCards 
                        data={allPosts}
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

export default Home
