'use client'
import { useEffect, useState } from 'react'
import PromptCard from './PromptCard'
import { useSession } from 'next-auth/react'

const PromptCardList = ({data, handleTagClick}) => {
  const { data: session } = useSession()
  
  return (
    <div>
      {session ? <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard key={post._id} post={post} handleTagClick={handleTagClick}/>
      ))}
      </div> : <h1 className='mt-16 font-satoshi font-semibold blue_gradient text-xl ring-1 py-3 px-8 rounded-lg'>Sign In to see All Posts</h1>}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  
  const handleTagClick = () => {
    
  }
  
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()
      
      setPosts(data)
    }
    
    fetchPosts()
  }, [])
  
  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
        className='search_input peer'
        onChange={(e) => setSearchText(e.target.value)}
        value={searchText}
        required
        placeholder='Search for similar tags'
        />
      </form>
      
      <PromptCardList data={posts} handleTagClick={handleTagClick} />
    </section>
  )
}

export default Feed