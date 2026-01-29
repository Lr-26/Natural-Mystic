import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, Sparkles } from 'lucide-react';
import { login as apiLogin } from '../services/auth.service';
import { useAdmin } from '../context/AdminContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAdmin();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const data = await apiLogin(email, password);
            login(data.user);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error al iniciar sesión. Verifica tus credenciales.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-desert-bg flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 rounded-sm shadow-2xl max-w-md w-full border border-desert-accent/20"
            >
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-desert-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="text-desert-primary" size={32} />
                    </div>
                    <h2 className="font-cinzel text-2xl font-bold text-desert-primary tracking-widest uppercase">Admin Panel</h2>
                    <p className="font-montserrat text-desert-text text-sm mt-2 italic">Acceso exclusivo a la alquimia</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-500 p-3 rounded-sm text-sm mb-6 border border-red-100 font-montserrat">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs font-montserrat font-bold text-desert-primary uppercase tracking-widest mb-2">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-desert-accent/50" size={18} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-desert-bg/5 border border-desert-accent/20 focus:outline-none focus:border-desert-primary transition-colors font-montserrat text-sm"
                                placeholder="tu@email.com"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-montserrat font-bold text-desert-primary uppercase tracking-widest mb-2">Contraseña</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-desert-accent/50" size={18} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-desert-bg/5 border border-desert-accent/20 focus:outline-none focus:border-desert-primary transition-colors font-montserrat text-sm"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-desert-primary text-white font-cinzel font-bold tracking-widest uppercase hover:bg-desert-primary/90 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                    >
                        {loading ? 'Validando...' : (
                            <>
                                <span>Entrar</span>
                                <LogIn size={18} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;
