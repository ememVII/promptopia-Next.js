'use client'

import Profile from "@components/Profile"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

const MyProfile = () => {
    const {data: session} = useSession()
    const router = useRouter()
    
    const [posts, setPosts] = useState([])
    
    useEffect(() => {
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${session?.user.id}/posts`)
          const data = await response.json()
          
          setPosts(data)
        }
        
        if(session?.user.id) fetchPosts()
      }, [session?.user.id])
    
    const handleEdit = (post) => {
      router.push(`/update-prompt?id=${post._id}`)
    }
    
    const handleDelete = async (post) => {
      const hasConfirmed = confirm('are you sure')
      
      if(hasConfirmed) {
        try {
          await fetch(`/api/prompt/${post._id.toString()}`, {
            method: 'DELETE'
          })
          
          const filteredPosts = posts.filter((p) => p._id.toString() !== post._id.toString())
          
          setPosts(filteredPosts)
        } catch (error) {
          console.log(error);
        }
      }
    }
    
  return (
    <Profile
        name='My'
        desc='Welcome to your Profile'
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile