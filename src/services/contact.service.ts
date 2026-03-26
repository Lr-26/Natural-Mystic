import api from './api.config';

export interface ContactMessage {
    id: string;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    created_at: string;
}

export interface ContactEntry {
    email: string;
    name: string;
    phone: string;
    last_contact: string;
}

export const getMessages = async (): Promise<ContactMessage[]> => {
    const response = await api.get('/contact');
    return response.data;
};

export const getContacts = async (): Promise<ContactEntry[]> => {
    const response = await api.get('/contact/contacts');
    return response.data;
};
