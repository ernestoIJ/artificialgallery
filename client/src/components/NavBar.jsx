import React, { useState } from 'react';
import { UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

function NavBar() {
  const { isSignedIn } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className='w-full bg-gray-900 px-4 py-4 border-b border-gray-900'>
      <div className='flex justify-between items-center'>
        <Link to={isSignedIn ? "/account" : "/"} className='text-white py-2 px-4 rounded-3xl bg-gradient-to-r from-purple-500 to-blue-500 text-sm sm:text-lg md:text-xl lg:text-2xl'>
          ArtificialGallery
        </Link>
        {isSignedIn && (
          <div className='flex items-center space-x-4'>
            <Link to="/create-post" className='hidden sm:block font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md'>Create</Link>
            <Link to="/account" className='hidden sm:block font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md'>Home</Link>
            <Link to="/my-post" className='hidden sm:block font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md'>My Posts</Link>
            <Link to="/my-likes" className='hidden sm:block font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md'>My Likes</Link>
            <UserButton afterSignOutUrl="/" className='hidden sm:block'/>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className='sm:hidden text-white'>
              {isMenuOpen ? '✖' : '☰'}
            </button>
          </div>
        )}
      </div>
      {isMenuOpen && isSignedIn && (
        <div className='sm:hidden flex flex-col items-start mt-2 space-y-2'>
          <Link to="/create-post" className='font-inter font-medium bg-[#6469ff] text-white px-2 py-2 rounded-md'>Create</Link>
          <Link to="/account" className='font-inter font-medium bg-[#6469ff] text-white px-2 py-2 rounded-md'>Home</Link>
          <Link to="/my-post" className='font-inter font-medium bg-[#6469ff] text-white px-2 py-2 rounded-md'>My Posts</Link>
          <Link to="/my-likes" className='font-inter font-medium bg-[#6469ff] text-white px-2 py-2 rounded-md'>My Likes</Link>
        </div>
      )}
    </header>
  );
}

export default NavBar;
