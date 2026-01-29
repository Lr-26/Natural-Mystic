import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, logout as apiLogout } from '../services/auth.service';

interface AdminContextType {
    user: any | null;
    isAdmin: boolean;
    login: (userData: any) => void;
    logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any | null>(null);

    useEffect(() => {
        const savedUser = getCurrentUser();
        if (savedUser) setUser(savedUser);
    }, []);

    const login = (userData: any) => {
        setUser(userData);
    };

    const logout = () => {
        apiLogout();
        setUser(null);
    };

    const isAdmin = !!user;

    return (
        <AdminContext.Provider value={{ user, isAdmin, login, logout }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (context === undefined) {
        throw new Error('useAdmin must be used within an AdminProvider');
    }
    return context;
};
