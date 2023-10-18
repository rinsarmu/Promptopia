'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {

    const isUserLoggedIn = true;
    const { data: session } = useSession()
    const [providers, setProviders] = useState(null)
    const [toggleDropDown, setToggleDropDown] = useState(false)

    const [imageSrc, setImageSrc] = useState('https://lh3.googleusercontent.com/a/ACg8ocIl4mqkZDA1CZ5q-aSC7sf0ucF28i5x5uziaWaChi6sQMk=s96-c' || '/assets/images/logo.svg')

    useEffect(() => {
        const setUpProvider = async () => {
            const response = await getProviders()
            console.log(response)
            console.log(session)
            setProviders(response)
        }
        setUpProvider()
    }, [])


    useEffect(() => {
        console.log(session)

        if (session) {
            console.log(session.user.image)
            // setImageSrc(session.user.image)
        }
    }, [session])

    return (
        <nav className='flex flex-between w-full mb-16 pt-3'>
            <Link href='/' className='flex gap-2 flex-center'>
                <Image
                    src='/assets/images/logo.svg'
                    alt='proptopia Logo'
                    width={30}
                    height={30}
                    className='object-contain'
                />
                <p className='logo_text'>Promptopia</p>
            </Link>

            {/* Descktop Navigation */}

            <div className="sm:flex hidden">
                {session?.user ? (
                    <div className='flex gap-3 md:gap-5'>
                        <Link href='/create-prompt' className='black_btn'>Create Post</Link>
                        <button type='button' onClick={signOut} className='outline_btn'> Sign Out</button>

                        <Link href='/profile'>
                            <Image
                                src={imageSrc}
                                width={37}
                                height={37}
                                className='rounded-full'
                                alt='profile'
                            />
                        </Link>

                    </div>
                ) : (
                    <>
                        {providers && Object.values(providers).map(provider => (
                            <button
                                type='button'
                                key={provider.name}
                                onClick={() => signIn(provider.id)}
                                className='black_btn'

                            >
                                Sign In
                            </button>
                        ))}

                    </>
                )}
            </div>



            {/* Mobile Naviagation */}
            <div className="sm:hidden flex relative">
                {session?.user ? (
                    <div className="flex">
                        {session?.user.image && <Image
                            src={imageSrc}
                            alt='proptopia Logo'
                            width={37}
                            height={37}
                            className='rounded-full'
                            onClick={() => setToggleDropDown(prev => !prev)}

                        />}

                        {toggleDropDown && (
                            <div className='dropdown'>
                                <Link
                                    href='/profile'
                                    className='dropdown_link'
                                    onClick={() => setToggleDropDown(false)}

                                >
                                    My Profile {session?.user.name}
                                </Link>
                                <Link
                                    href='/create-prompt'
                                    className='dropdown_link'
                                    onClick={() => setToggleDropDown(false)}

                                >
                                    Create Prompt
                                </Link>

                                <button
                                    type='button'
                                    onClick={() => {
                                        setToggleDropDown(false)
                                        signOut()
                                    }}
                                    className='mt-5 w-full black_btn'
                                >
                                    Sign out

                                </button>

                            </div>
                        )}

                    </div>
                ) : (
                    <>
                        {providers && Object.values(providers).map(provider => (
                            <button
                                type='button'
                                key={provider.name}
                                onClick={() => signIn(provider.id)}
                                className='black_btn'

                            >
                                Sign In
                            </button>
                        ))}

                    </>
                )}

            </div>


        </nav>
    )
}

export default Nav