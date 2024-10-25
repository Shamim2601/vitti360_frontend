import conf from '../conf/conf.js';
import axios from 'axios';

export class AuthService {
    constructor() {
        this.apiUrl = conf.apiUrl;
    }

    async createAccount({ name, email, phone, password }) {
        try {
            const response = await axios.post(`${this.apiUrl}/signup/`, {
                name,
                email,
                phone,
                password,
            });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    }

    async login({ email, password }) {
        try {
            const response = await axios.post(`${this.apiUrl}/login/`, {
                email,
                password,
            });
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
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    }
}

const authService = new AuthService();

export default authService;