'use client'

import { useEffect, useState } from 'react'
import PromptCard from '@components/PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])

  const lowerCaseSearchText = searchText.toLowerCase()

  const filteredPosts = posts.filter((post) => {
    return (
      post.prompt.toLowerCase().includes(lowerCaseSearchText) ||
      post.tag.toLowerCase().includes(lowerCaseSearchText) ||
      post.creator.username.toLowerCase().includes(lowerCaseSearchText) ||
      post.creator.email.toLowerCase().includes(lowerCaseSearchText)
    )
  })

  const handleSearchChange = (event) => {
    setSearchText(event.target.value)
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
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="search"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={filteredPosts} handleTagClick={(tag) => {
        setSearchText(tag)
      }} />
    </section>
  )
}

export default Feed
