import React, { useState, useEffect } from 'react';
import { Users, Trash2, Shield, User, RefreshCw } from 'lucide-react';
import axios from 'axios';

interface User {
    id: string;
    email: string;
    role: string;
    createdAt?: string;
}

interface UserManagementProps {
    token: string;
}

const UserManagement: React.FC<UserManagementProps> = ({ token }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:3000/auth/users', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(response.data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error al cargar usuarios');
            console.error('Error fetching users:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [token]);

    const handleRoleToggle = async (userId: string, currentRole: string) => {
        const newRole = currentRole === 'admin' ? 'user' : 'admin';
        const confirmMessage = `¿Cambiar rol de ${currentRole} a ${newRole}?`;

        if (!window.confirm(confirmMessage)) return;

        try {
            await axios.patch(
                `http://localhost:3000/auth/users/${userId}/role`,
                { role: newRole },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchUsers();
        } catch (err: any) {
            alert(err.response?.data?.message || 'Error al cambiar rol');
        }
    };

    const handleDelete = async (userId: string, email: string) => {
        if (!window.confirm(`¿Eliminar usuario ${email}?`)) return;

        try {
            await axios.delete(`http://localhost:3000/auth/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchUsers();
        } catch (err: any) {
            alert(err.response?.data?.message || 'Error al eliminar usuario');
        }
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="bg-desert-accent/10 p-2 rounded-full">
                        <Users size={24} className="text-desert-accent" />
                    </div>
                    <div>
                        <h2 className="font-cinzel text-2xl font-bold text-desert-primary">Gestión de Usuarios</h2>
                        <p className="text-xs text-desert-text uppercase tracking-wider">
                            {users.length} usuario{users.length !== 1 ? 's' : ''} registrado{users.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                </div>
                <button
                    onClick={fetchUsers}
                    className="p-2 hover:bg-desert-bg/10 rounded-full transition-colors"
                    title="Refrescar"
                >
                    <RefreshCw size={20} className="text-desert-primary" />
                </button>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-sm">
                    {error}
                </div>
            )}

            <div className="bg-white border border-desert-accent/10 shadow-sm overflow-x-auto">
                <table className="w-full text-left font-montserrat">
                    <thead className="bg-desert-secondary/5 border-b border-desert-accent/10">
                        <tr>
                            <th className="p-4 text-xs font-bold uppercase tracking-widest text-desert-primary">Email</th>
                            <th className="p-4 text-xs font-bold uppercase tracking-widest text-desert-primary">Rol</th>
                            <th className="p-4 text-xs font-bold uppercase tracking-widest text-desert-primary">Fecha Registro</th>
                            <th className="p-4 text-xs font-bold uppercase tracking-widest text-desert-primary text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={4} className="p-12 text-center text-desert-text italic">
                                    Cargando usuarios...
                                </td>
                            </tr>
                        ) : users.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="p-12 text-center text-desert-text italic">
                                    No hay usuarios registrados
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr
                                    key={user.id}
                                    className="border-b border-desert-accent/5 hover:bg-desert-bg/5 transition-colors"
                                >
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <div className="text-sm font-medium text-desert-primary">{user.email}</div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span
                                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${user.role === 'admin'
                                                ? 'bg-desert-accent/10 text-desert-accent'
                                                : 'bg-gray-100 text-gray-600'
                                                }`}
                                        >
                                            {user.role === 'admin' ? <Shield size={12} /> : <User size={12} />}
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm text-desert-text">{formatDate(user.createdAt)}</td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => handleRoleToggle(user.id, user.role)}
                                                className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-desert-primary/10 text-desert-primary hover:bg-desert-primary hover:text-white rounded-sm transition-all"
                                                title={`Cambiar a ${user.role === 'admin' ? 'user' : 'admin'}`}
                                            >
                                                {user.role === 'admin' ? 'Quitar Admin' : 'Hacer Admin'}
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user.id, user.email)}
                                                className="p-2 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                                                title="Eliminar usuario"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;
