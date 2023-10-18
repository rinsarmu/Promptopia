import React from 'react'
import Link from 'next/link'

const Form = ({
    type,
    post,
    setPost,
    submitting,
    handleSubmit }) => {
    return (
        <section className='  max-w-full flex flex-center flex-col md:px-0 px-3'>
            <h1 className='head_text text-left'>
                <span className='blue_gradient'>{type}</span>
            </h1>
            <p className='desc text-left max-w-md'>
                {type} and share amazing prompts with the world, and let your imagination run wild with any AI-powered platform.
            </p>

            <form
                onSubmit={handleSubmit}
                className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism border-3 border-gray-500'

            >
                <label htmlFor="">
                    <span className='font-satoshi font-semibold text-base text-gray-700'>Your AI prompt</span>
                </label>

                <textarea
                    value={post.prompt}
                    onChange={(e) => setPost({ ...post, prompt: e.target.value })}
                    placeholder='Write your prompt here'
                    className='form_textarea'

                ></textarea>

                <label htmlFor="">
                    <span className='font-satoshi font-semibold text-base text-gray-700'>Tag
                        <span>(#product, #webdevelopment, #idea)</span>
                    </span>
                </label>

                <textarea
                    value={post.tag}
                    onChange={(e) => setPost({ ...post, tag: e.target.value })}
                    placeholder='#tag'
                    className='form_textarea'

                ></textarea>

                <div className="flex-end mx-3 mb-5 gap-4">
                    <Link href='/' className='text-gray-500 text-sm'> Cancel</Link>
                    <button
                        type='submit'
                        disabled={submitting}
                        className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'


                    >
                        {submitting ? `${type}...` : type}


                    </button>
                </div>

            </form>

        </section>
    )
}

export default Form