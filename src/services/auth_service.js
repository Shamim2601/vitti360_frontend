import conf from '../conf/conf.js';
import axios from 'axios';

export class AuthService {
    constructor() {
        this.apiUrl = conf.apiUrl;
    }

    async createAccount({ name, email, username, password }) {
        try {
            const response = await axios.post(`${this.apiUrl}/signup/`, {
                name,
                email,
                username,
                password,
            });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    }

    async login({ username, password }) {
        try {
            const response = await axios.post(`${this.apiUrl}/login/`, {
                username,
                password,
            });
            const token = response.data.token;
            localStorage.setItem('token', token);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    }

    async getCurrentUser() {
        try {
            const response = await axios.get(`${this.apiUrl}/current_user/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    }

    async logout() {
        try {
            await axios.post(`${this.apiUrl}/logout/`, null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
						localStorage.removeItem('token');
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    }
}

const authService = new AuthService();

export default authService;