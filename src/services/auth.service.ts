import api from './api.config';

export const login = async (email: string, pass: string) => {
    const response = await api.post('/auth/login', { email, password: pass });
    if (response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
};

export const register = async (email: string, pass: string) => {
    const response = await api.post('/auth/register', { email, password: pass });
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    try {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    } catch {
        return null;
    }
};
