'use client'
import React from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Profile from '@components/Profile'
import { useSession } from 'next-auth/react'

const MyProfile = () => {
    const { data: session } = useSession()
    const [posts, setPosts] = useState([])
    const router = useRouter()

    const handleEdit = async (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }
    const handleDelete = async (post) => {
        console.log('handleDelete')
        const hasConfirmed = confirm('Are u sure u want to delete?')
        if (!hasConfirmed) return false;

        try {
            await fetch(`/api/prompt/${post._id.toString()}`, {
                method: 'DELETE'
            });

            const filteredPosts = posts.filter(p => p._id !== post._id)
            setPosts(filteredPosts)


        } catch (error) {

        }
    }

    useEffect((post) => {


        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`, {
                method: 'GET'
            });

            console.log(response)

            if (!response.ok) {
                console.log('response is not ok')
                return;

            }
            const data = await response.json();
            setPosts(data)
        }

        if (session?.user.id) fetchPosts()
    }, [])

    return (
        <Profile
            name='my'
            desc='Welcome to your personalised profile page'
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}

        />
    )
}

export default MyProfile