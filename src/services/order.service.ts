import axios from 'axios';

const API_URL = 'http://localhost:3000';

export interface OrderItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export interface ShippingAddress {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    province: string;
    postalCode: string;
}

export interface CreateOrderData {
    items: OrderItem[];
    total: number;
    shippingAddress: ShippingAddress;
    email: string;
    paymentMethod: 'card' | 'transfer' | 'cash' | 'mercadopago';
    userId?: string;
    notes?: string;
}

export interface Order extends CreateOrderData {
    _id: string;
    orderNumber: string;
    status: string;
    paymentStatus: string;
    createdAt: string;
    updatedAt: string;
}

export const createOrder = async (orderData: CreateOrderData): Promise<Order> => {
    const response = await axios.post(`${API_URL}/orders`, orderData);
    return response.data;
};

export const getUserOrders = async (userId: string): Promise<Order[]> => {
    const response = await axios.get(`${API_URL}/orders/user/${userId}`);
    return response.data;
};

export const getOrderById = async (orderId: string): Promise<Order> => {
    const response = await axios.get(`${API_URL}/orders/${orderId}`);
    return response.data;
};
