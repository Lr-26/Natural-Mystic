import api from './api.config';

export interface Product {
    id?: string;
    _id?: string; // MongoDB ID
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    stock: number;
}

export const getProducts = async (): Promise<Product[]> => {
    const response = await api.get('/products');
    return response.data;
};

export const createProduct = async (product: Partial<Product>) => {
    const response = await api.post('/products', product);
    return response.data;
};

export const deleteProduct = async (id: string) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
};
