'use client'

import { useEffect, useState } from 'react'
import Form from '@components/Form'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'

const UpdatePrompt = () => {
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  })

  const router = useRouter()
  const { data: session } = useSession()
  const promptId = useSearchParams().get('id')

  useEffect(() => {
    const fetchPrompt = async () => {
      const response = await fetch(`/api/prompt/${promptId}`)
      const post = await response.json()

      if (promptId) {
        setPost(post)
      }
    }

    fetchPrompt()
  }, [promptId])

  const updatePrompt = async (e) => {
    e.preventDefault()

    setSubmitting(true)

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      })

      if (response.ok) {
        await router.push('/')
      }
    } catch (error) {
      console.error(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  )
}

export default UpdatePrompt
