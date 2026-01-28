import axios from 'axios';

const API_BASE_URL = import.meta.env.API_BASE_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (!error.response) {
            console.error('Error de conexión con el servidor:', error.message);
        }
        return Promise.reject(error);
    }
);

export default api;