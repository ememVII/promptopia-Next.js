'use client'

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const PromptCard = ({post, handleTagClick, handleEdit, handleDelete}) => {
  const {data: session } = useSession()
  const pathName = usePathname()
  
  const [copied, setCopied] = useState('')
  
  const handleCopy = () => {
    setCopied(post.prompt)
    navigator.clipboard.writeText(post.prompt)
    setTimeout(() => setCopied(''),3000)
  }
  
  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-center'>
        <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
          <Image
            src={post.creator.image}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />
          <div className='flex flex-col space-y-0'>
            <h3 className='font-satoshi text-gray-900 font-semibold'>{post.creator.username}</h3>
            {post.creator._id === '65a014fde9b08194bbe2b3f8' && <span className='font-inter italic text-[10px] font-semibold tracking-wide text-red-800'>Authour</span>}
          </div>
        </div>
        
        <div className='copy_btn' onClick={handleCopy}>
          <Image 
            src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
            alt='copy-prompt'
            width={12}
            height={12}
          />
        </div>
      </div>
      
        <p className='my-4 font-satoshi text-sm text-gray-500'>{post.prompt}</p>
        <p className='font-inter text-sm blue_gradient cursor-pointer' onClick={() => handleTagClick && handleTagClick(post.tag)}>#{post.tag}</p>
        
        {session?.user.id === post.creator._id && pathName === '/profile' && <div className='mt-8 flex flex-center gap-4 border-t border-gray-300 py-5'>
          <p className='green_gradient cursor-pointer' onClick={handleEdit}>Edit</p>
          <p className='orange_gradient cursor-pointer' onClick={handleDelete}>Delete</p>
        </div>}
        
        
    </div>
  )
}

export default PromptCard