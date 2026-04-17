import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:8080/api"
});

export const getMenu = () => api.get('/menu');
export const placeOrder = (order) => api.post('/orders/place', order);
export const askAi = (query) => api.get('/ai/ask', { params: { query } });

export default api;