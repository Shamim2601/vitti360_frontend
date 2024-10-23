import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components/index'
import appwriteService from '../appwrite/config'
import { Helmet } from "react-helmet";

function Home() {

    const [posts, setPosts] = useState([])
    useEffect(() => {
        appwriteService.getAllPost()
            .then((posts) => posts ? setPosts(posts.documents) : null)
            .catch((error) => console.error(error))
    }, [])

    return (
        <>
            {posts.length === 0 ? (
                <div className="w-full py-8 mt-4 text-center">
                    <Container>
                        <div className="flex flex-wrap">
                            <div className="p-2 w-full">
                                <h1 className="text-2xl font-bold hover:text-gray-500">
                                    No Post Available
                                </h1>
                            </div>
                        </div>
                    </Container>
                </div>
            ) : (
                <div className='w-full py-8'>
                    <Container>
                        <div className="w-full">
                            <h1 className="text-center text-5xl font-bold">
                                Our Latest Posts
                            </h1>
                        </div>
                        <div className='flex justify-center gap-5 mt-8 flex-wrap '>
                            {posts.map((post) => (
                                <div key={post.$id} className='p-2 w-full sm:w-1/2 md:w-1/3 xl:w-1/4'>
                                    <PostCard {...post} />
                                </div>
                            ))}
                        </div>
                    </Container>
                </div>

            )}
        </>
    )
}

export default Home
