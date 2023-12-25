import React from 'react';

import { download, deleteBin } from '../assets';
import { downloadImage } from "../utils";

import { useAuth } from '@clerk/clerk-react';

import LikeButton from './LikeButton';

function Card({ _id, userId, name, prompt, photo, onDelete, showDeleteButton }) {

  const currentUser = useAuth().userId;

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      onDelete(_id);
    }
  };

  return (
    <div className='rounded-xl group relative shadow-card hover:shadow-cardhover card'>
      <img src={photo} alt={prompt} className='w-full h-auto object-cover rounded-xl'/>
      <div className='group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md'>
        <p className='text-white text-md overflow-y-auto prompt'>{prompt}</p>
        <div className='flex items-center justify-between'>
          <LikeButton postId={_id} userId={currentUser} />
        {currentUser === userId && showDeleteButton && (<button className='text-[#6469ff]' onClick={handleDelete}>
          <img className='w-5 h-auto' src={deleteBin} alt="" />
        </button>)}
        </div>
        <div className='mt-5 flex justify-between items-center gap-2'>
          <div className='flex items-center gap-2'>
            <div className='w-7 h-7 rounded-full object-cover bg-[#6469ff] flex justify-center items-center text-white text-xs font-bold'>
              {name[0].toUpperCase()}
            </div>
            <p className='text-white text-sm'>{name}</p>
          </div>
          
          <button type='button' onClick={() => downloadImage(_id, photo)} className='outline-none bg-transparent border-none'>
            <img src={download} alt="download" className='w-6 h-6 object-contain invert'/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card
