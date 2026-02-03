import React, { useState } from 'react';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, Mail, Lock, Sparkles, UserPlus, ArrowLeft } from 'lucide-react';
import { login as apiLogin, register as apiRegister } from '../services/auth.service';
import { useAdmin } from '../context/AdminContext';

const Login = () => {
    const navigate = useNavigate();
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAdmin();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (isRegister && password !== confirmPassword) {
            toast.error('Las contraseñas no coinciden');
            setLoading(false);
            return;
        }

        try {
            if (isRegister) {
                await apiRegister(email, password);
                // Auto-login after registration
                const data = await apiLogin(email, password);
                login(data.user);

                if (data.user.role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/');
                    toast.success('¡Cuenta creada con éxito! Bienvenido a la tribu. 🌿');
                }
            } else {
                const data = await apiLogin(email, password);
                login(data.user);

                // Redirect based on role
                if (data.user.role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/');
                    toast.success('¡Bienvenido de nuevo! Que bueno verte. ✨');
                }
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Error al procesar la solicitud. Verifica tus datos.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-desert-bg flex items-center justify-center p-4">
            <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 rounded-sm shadow-2xl max-w-md w-full border border-desert-accent/20"
            >
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-desert-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        {isRegister ? <UserPlus className="text-desert-primary" size={32} /> : <Sparkles className="text-desert-primary" size={32} />}
                    </div>
                    <h2 className="font-cinzel text-2xl font-bold text-desert-primary tracking-widest uppercase">
                        {isRegister ? 'Crear Cuenta' : 'Iniciar Sesión'}
                    </h2>
                    <p className="font-montserrat text-desert-text text-sm mt-2 italic">
                        {isRegister ? 'Únete a nuestra comunidad alquímica' : 'Accede a tu cuenta'}
                    </p>
                </div>

                <AnimatePresence mode="wait">
                    {error && (
                        <motion.div
                            key="error"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-red-50 text-red-500 p-3 rounded-sm text-sm mb-6 border border-red-100 font-montserrat"
                        >
                            {error}
                        </motion.div>
                    )}
                    {success && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-green-50 text-green-500 p-3 rounded-sm text-sm mb-6 border border-green-100 font-montserrat"
                        >
                            {success}
                        </motion.div>
                    )}
                </AnimatePresence>

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

                    <AnimatePresence>
                        {isRegister && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                            >
                                <label className="block text-xs font-montserrat font-bold text-desert-primary uppercase tracking-widest mb-2">Confirmar Contraseña</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-desert-accent/50" size={18} />
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-desert-bg/5 border border-desert-accent/20 focus:outline-none focus:border-desert-primary transition-colors font-montserrat text-sm"
                                        placeholder="••••••••"
                                        required={isRegister}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-desert-primary text-white font-cinzel font-bold tracking-widest uppercase hover:bg-desert-primary/90 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                    >
                        {loading ? 'Procesando...' : (
                            <>
                                <span>{isRegister ? 'Registrarse' : 'Entrar'}</span>
                                {isRegister ? <UserPlus size={18} /> : <LogIn size={18} className="group-hover:translate-x-1 transition-transform" />}
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-desert-accent/10 text-center">
                    <button
                        onClick={() => {
                            setIsRegister(!isRegister);
                            setError('');
                            setSuccess('');
                        }}
                        className="text-desert-primary font-montserrat text-xs font-bold uppercase tracking-widest hover:text-desert-accent transition-colors flex items-center justify-center gap-2 mx-auto"
                    >
                        {isRegister ? (
                            <>
                                <ArrowLeft size={14} /> Ya tengo cuenta - Iniciar Sesión
                            </>
                        ) : (
                            <>
                                No tengo cuenta - Registrarme <UserPlus size={14} />
                            </>
                        )}
                    </button>
                </div>
            </motion.div>

            <Link
                to="/"
                className="fixed bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white font-montserrat text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 transition-colors"
            >
                <ArrowLeft size={12} /> Volver al inicio
            </Link>
        </div>
    );
};

export default Login;
