import conf from '../conf/conf.js';
import axios from 'axios';

export class PostService {
    constructor() {
        this.apiUrl = conf.apiUrl;
    }

    async createPost({ title, category, description, type }) {
        try {
            const endpoint = type === 'blog' ? 'blogs' : 'circulars';
            const response = await axios.post(`${this.apiUrl}/api/${endpoint}/`, {
                title,
                category,
                description,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    }

    async getPosts(type) {
        try {
            const endpoint = type === 'blog' ? 'blogs' : 'circulars';
            const response = await axios.get(`${this.apiUrl}/api/${endpoint}/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    }

    async getPostDetails(id, type) {
        try {
            const endpoint = type === 'blog' ? 'blogs' : 'circulars';
            const response = await axios.get(`${this.apiUrl}/api/${endpoint}/${id}/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    }

    async updatePost(id, { title, category, description }, type) {
        try {
            const endpoint = type === 'blog' ? 'blogs' : 'circulars';
            const response = await axios.patch(`${this.apiUrl}/api/${endpoint}/${id}/`, {
                title,
                category,
                description,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    }

    async deletePost(id, type) {
        try {
            const endpoint = type === 'blog' ? 'blogs' : 'circulars';
            const response = await axios.delete(`${this.apiUrl}/api/${endpoint}/${id}/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    }
}

const postService = new PostService();

export default postService;
