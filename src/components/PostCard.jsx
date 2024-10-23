import React from 'react'
import service from '../appwrite/config'
import { Link } from 'react-router-dom'
import parse from "html-react-parser";

function PostCard({ $id, title, featuredImage, content }) {
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl'>
                <div className='w-full mb-4 shadow-xs rounded'>
                    <img src={service.getFilePreview(featuredImage)} alt={title} className='rounded' />
                </div>
                <div>
                    <h2 className='text-xl font-bold text-center'>{title}</h2>
                    <div className='p-3'>{parse(content)}</div>
                </div>
            </div>

        </Link>
    )
}

export default PostCard