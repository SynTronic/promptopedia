'use client'

import Profile from '@components/Profile'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const ProfilePage = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState(null);
  const userId = useSearchParams().get('id') ?? session.user.id

  useEffect(() => {
    const fetchPosts = async (id) => {
      const response = await fetch(`/api/users/${id}/posts`)
      if (!response.ok) {
        return
      }
      const data = await response.json()
      setPosts(data)
    }

      fetchPosts(userId)
  }, [userId])

  useEffect(() => {
    const fetchUser = async(id) => {
      const response = await fetch(`/api/users/${id}/info`);
      if (!response.ok) {
        setUser(null);
        return;
      }
      const user = await response.json();
      setUser(user);
    }

    fetchUser(userId)

  }, [userId])

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  }

  const handleDelete = async (post) => {
    const response = await fetch(`/api/prompt/${post._id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      return
    }

    setPosts((posts) => posts.filter((p) => p._id !== post._id))
  }

  return (
    <Profile
      name={user?.username}
      desc="Welcome to you personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default ProfilePage
