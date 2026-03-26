import React, { useState, useEffect } from 'react';
import { Users, Trash2, Shield, User, RefreshCw } from 'lucide-react';
import axios from 'axios';

interface User {
    id: string;
    email: string;
    role: string;
    name?: string;
    phone?: string;
    professional_comment?: string;
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
            const response = await axios.get('http://localhost:3001/auth/users', {
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
                `http://localhost:3001/auth/users/${userId}/role`,
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
            await axios.delete(`http://localhost:3001/auth/users/${userId}`, {
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
                    <thead className="bg-desert-bg/30 border-b border-desert-accent/10">
                        <tr>
                            <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-desert-primary">Identidad</th>
                            <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-desert-primary">Contacto</th>
                            <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-desert-primary">Rol</th>
                            <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-desert-primary">Visión (Mensaje)</th>
                            <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-desert-primary text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-desert-accent/5">
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="p-12 text-center text-desert-text italic">
                                    Invocando a la tribu...
                                </td>
                            </tr>
                        ) : users.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-12 text-center text-desert-text italic">
                                    No hay almas registradas aún.
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr
                                    key={user.id}
                                    className="hover:bg-desert-bg/10 transition-colors group"
                                >
                                    <td className="p-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-desert-primary/10 flex items-center justify-center text-desert-primary font-bold border border-desert-accent/20">
                                                {user.name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="font-cinzel font-bold text-desert-primary">{user.name || 'Anónimo'}</div>
                                                <div className="text-[10px] text-desert-text/60 font-montserrat">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="text-xs font-montserrat text-desert-primary">{user.phone || 'No provisto'}</div>
                                        <div className="text-[9px] text-desert-accent/60 uppercase tracking-tighter">{formatDate(user.createdAt)}</div>
                                    </td>
                                    <td className="p-6">
                                        <span
                                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${user.role === 'admin'
                                                ? 'bg-desert-accent text-desert-primary shadow-sm'
                                                : 'bg-desert-primary/5 text-desert-primary border border-desert-accent/10'
                                                }`}
                                        >
                                            {user.role === 'admin' ? <Shield size={10} /> : <User size={10} />}
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="p-6">
                                        <div className="text-xs text-desert-text italic max-w-xs line-clamp-2 hover:line-clamp-none transition-all cursor-help border-l-2 border-desert-accent/20 pl-3">
                                            {user.professional_comment || 'Sin mensaje profesional'}
                                        </div>
                                    </td>
                                    <td className="p-6 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleRoleToggle(user.id, user.role)}
                                                className="p-2 text-desert-accent hover:bg-desert-accent/10 rounded-lg transition-all"
                                                title={`Cambiar a ${user.role === 'admin' ? 'user' : 'admin'}`}
                                            >
                                                <Shield size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user.id, user.email)}
                                                className="p-2 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
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
