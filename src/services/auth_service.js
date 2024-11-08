import conf from '../conf/conf.js';
import axios from 'axios';

export class AuthService {
    constructor() {
        this.apiUrl = conf.apiUrl;
    }

    async createAccount({ first_name, email, username, password }) {
        try {
            const response = await axios.post(`${this.apiUrl}/auth/signup/`, {
                first_name,
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
            const response = await axios.post(`${this.apiUrl}/auth/login/`, {
                username,
                password,
            });
            const token = response.data.access;
            const refresh = response.data.refresh;
            localStorage.setItem('token', token);
            localStorage.setItem('refresh', refresh);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    }

    async getCurrentUser() {
        try {
            const response = await axios.get(`${this.apiUrl}/auth/current_user/`, {
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
            const refreshToken = localStorage.getItem('refresh');
            await axios.post(`${this.apiUrl}/auth/logout/`, { refresh: refreshToken }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            localStorage.removeItem('token');
            localStorage.removeItem('refresh');
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    }    
}

const authService = new AuthService();

export default authService;