'use client'
import { useEffect, useState } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div>
      <div className="mt-16 prompt_layout">
        {data.map(post => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))}
      </div>
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])

  const handleTagClick = () => {}

  const fetchPosts = async () => {
    const response = await fetch('/api/prompt')
    const data = await response.json()

    setPosts(data)
  }

  useEffect(() => {
    fetchPosts()
  }, [])
  console.log(posts);
  return (``
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          className="search_input peer"
          onChange={e => setSearchText(e.target.value)}
          value={searchText}
          required
          placeholder="Search for similar tags"
        />
      </form>

      <PromptCardList data={posts} handleTagClick={handleTagClick} />
    </section>
  )
}

export default Feed
