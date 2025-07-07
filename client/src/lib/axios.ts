import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
    withCredentials: true,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;
