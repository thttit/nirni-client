import axios from 'axios';

const API_URL = 'http://localhost:1337/api/carts'; // Update with your Strapi API URL

export const createCartItem = async (data: any) => {
    try {
        const response = await axios.post(API_URL, data);
        return response.data;
    } catch (error) {
        console.error('Error creating cart item:', error);
        throw error;
    }
};

export const getCartItems = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error getting cart items:', error);
        throw error;
    }
};

export const getCartItem = async (id: string) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error getting cart item:', error);
        throw error;
    }
};

export const deleteCartItem = async (id: string) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting cart item:', error);
        throw error;
    }
};