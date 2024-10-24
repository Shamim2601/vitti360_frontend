import React from 'react';
import service from '../appwrite/config';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

function PostCard({ $id, title, featuredImage, content }) {
    const parsedContent = content && typeof content === 'string' ? parse(content) : 'No content available';
    
    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-gray-100 rounded-xl">
                {featuredImage ? (
                    <div className="w-full mb-4 shadow-xs rounded">
                        <img
                            src={service.getFilePreview(featuredImage)}
                            alt={title}
                            className="rounded"
                        />
                    </div>
                ): (
                    <></>
                )}
                <div>
                    <h2 className="text-xl font-bold text-center">{title}</h2>
                    <div className="p-3">{parsedContent}</div>
                </div>
            </div>
        </Link>
    );
}

export default PostCard;
