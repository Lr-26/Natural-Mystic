import api from './api.config';

export interface PaymentPreferenceData {
    items: {
        productId: string;
        name: string;
        price: number;
        quantity: number;
    }[];
    orderId: string;
}

export const createMPPreference = async (data: PaymentPreferenceData) => {
    const response = await api.post('/payments/mercadopago/preference', data);
    return response.data;
};

export const createPolarCheckout = async (data: { total: number, orderId: string }) => {
    const response = await api.post('/payments/polar/checkout', data);
    return response.data;
};

