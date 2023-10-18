'use client'
import React from 'react'
import { useState, useEffect } from 'react'

import PromptCard from './PromptCard'
const Feed = () => {
    const [searchText, setSearchText] = useState('')
    const [posts, setPosts] = useState([])
    const handleSearchChange = () => {

    }

    const PromptCardList = ({ data, handleTagClick }) => {
        return <div className="mt-16 prompt_layout">
            {data.map(post => (
                <PromptCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}

                />
            ))}
        </div>
    }

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/prompt', {
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

        fetchPosts()
    }, [])

    return (
        <section className='feed'>
            <form className='relative w-full flex-center'>
                <input
                    type='text'
                    placeholder='Search for a tag or username'
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className='search_input peer'
                />

            </form>

            <PromptCardList data={posts} handleTagClick={() => { }} />

        </section>
    )
}

export default Feed