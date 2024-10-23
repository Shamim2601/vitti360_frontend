import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components/index'
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        // Fetch posts when component mounts
        appwriteService.getAllPost().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []); 
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-row justify-center w-full px-14 py-[122px] bg-gray-50'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 flex-row w-full'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
    </div>
  )
}

export default AllPosts