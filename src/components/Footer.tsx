import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Instagram, Twitter, Facebook, Mail, Phone, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { register as apiRegister, login as apiLogin } from '../services/auth.service';
import { useAdmin } from '../context/AdminContext';

const Footer = () => {
    const { login } = useAdmin();
    const [showWelcome, setShowWelcome] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        comment: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (isLogin) {
                // Lógica de Login
                const loginData = await apiLogin(formData.email, formData.password);
                login(loginData.user);
                toast.success('¡Bienvenido de nuevo! ✨');
            } else {
                // Lógica de Registro
                await apiRegister(formData.email, formData.password, {
                    name: `${formData.name} ${formData.lastName}`,
                    phone: formData.phone,
                    professional_comment: formData.comment
                });
                
                const loginData = await apiLogin(formData.email, formData.password);
                login(loginData.user);
                setShowWelcome(true);
            }
            setFormData({ name: '', lastName: '', email: '', phone: '', password: '', comment: '' });
        } catch (error: any) {
            console.error('Error in authentication:', error);
            toast.error('Ocurrió un error sagrado', {
                description: error.response?.data?.message || 'Verifica tus datos e inténtalo de nuevo.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <footer id="contacto" className="bg-desert-primary text-white pt-20 pb-10 border-t border-desert-accent/10">
            {/* MODAL DE BIENVENIDA ALQUÍMICO */}
            <AnimatePresence>
                {showWelcome && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center px-4 backdrop-blur-md bg-[#2C1810]/60"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            className="bg-[#2C1810] border-2 border-desert-accent/40 p-10 md:p-16 rounded-3xl shadow-[0_0_100px_rgba(212,140,157,0.2)] max-w-2xl w-full text-center relative overflow-hidden"
                        >
                            <div className="absolute -top-24 -left-24 w-64 h-64 bg-desert-accent/5 rounded-full blur-3xl animate-pulse" />
                            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-desert-accent/5 rounded-full blur-3xl animate-pulse delay-1000" />
                            
                            <motion.div 
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="mb-8 flex justify-center"
                            >
                                <div className="bg-desert-accent p-4 rounded-full shadow-[0_0_30px_rgba(212,140,157,0.4)]">
                                    <Sparkles size={48} className="text-desert-primary" />
                                </div>
                            </motion.div>

                            <motion.h2 
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="font-cinzel text-3xl md:text-5xl text-white mb-6 tracking-[0.15em] uppercase font-bold"
                            >
                                Bienvenido a <br />
                                <span className="text-desert-accent">Natural Mystic</span>
                            </motion.h2>

                            <motion.p 
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="font-montserrat text-lg text-white/70 leading-relaxed mb-10 max-w-md mx-auto italic"
                            >
                                "Tu esencia ha sido ritualizada. Ahora eres parte de nuestra tribu mística. Prepárate para transformar tu energía."
                            </motion.p>

                            <motion.button
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                onClick={() => setShowWelcome(false)}
                                className="px-12 py-5 bg-desert-accent text-desert-primary font-cinzel font-bold text-sm uppercase tracking-[0.4em] hover:bg-white transition-all duration-500 shadow-[0_0_40px_rgba(212,140,157,0.2)] rounded-sm"
                            >
                                Iniciar el Viaje
                            </motion.button>

                            <div className="mt-8 flex justify-center gap-4 text-white/20">
                                <Sparkles size={12} className="animate-pulse" />
                                <Sparkles size={12} className="animate-pulse delay-700" />
                                <Sparkles size={12} className="animate-pulse delay-500" />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
                    
                    {/* LADO IZQUIERDO: INFORMACIÓN Y LINKS */}
                    <div className="space-y-12">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <img
                                    src="/images/logo.png"
                                    alt="Natural Mystic Logo"
                                    className="w-14 h-14 rounded-full border border-desert-accent/50 object-cover"
                                />
                                <span className="font-cinzel text-xl font-bold tracking-widest uppercase text-white flex items-center gap-2">
                                    Natural Mystic <Sparkles className="text-desert-accent" size={18} />
                                </span>
                            </div>
                            <p className="text-white/70 font-montserrat text-lg leading-relaxed max-w-md italic">
                                "Donde la botánica se encuentra con lo místico. Únete y transforma tu cuidado personal en un ritual sagrado."
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <h4 className="font-cinzel text-desert-accent mb-6 uppercase tracking-widest text-xs font-bold">Explorar</h4>
                                <ul className="space-y-3 font-montserrat text-sm text-white/60">
                                    <li><a href="#" className="hover:text-white transition-colors">Velas de Soja</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Sahumerios Sagrados</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Alquimia Corporal</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Cristales & Piedras</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-cinzel text-desert-accent mb-6 uppercase tracking-widest text-xs font-bold">Conectar</h4>
                                <ul className="space-y-3 font-montserrat text-sm text-white/60">
                                    <li className="flex items-center gap-2 italic text-[10px] tracking-widest"><Mail size={14} /> hola@naturalmystic.com</li>
                                    <li className="flex items-center gap-2 italic text-[10px] tracking-widest"><Phone size={14} /> +54 911 2345 6789</li>
                                </ul>
                                <div className="flex gap-4 mt-6">
                                    <a href="#" className="text-white/40 hover:text-white transition-colors"><Instagram size={20} /></a>
                                    <a href="#" className="text-white/40 hover:text-white transition-colors"><Facebook size={20} /></a>
                                    <a href="#" className="text-white/40 hover:text-white transition-colors"><Twitter size={20} /></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* LADO DERECHO: FORMULARIO REGISTRO PROFESIONAL */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-black/40 border border-desert-accent/10 p-8 md:p-10 rounded-sm relative overflow-hidden group shadow-[0_0_50px_rgba(212,140,157,0.05)]"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-desert-accent/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-desert-accent/10 transition-all duration-700" />
                        
                        <h3 className="font-cinzel text-2xl text-white mb-2 tracking-widest flex items-center gap-3">
                            {isLogin ? 'Iniciar' : 'Unete a la'} <span className="text-desert-accent">{isLogin ? 'Sesión' : 'Tribu'}</span> <Sparkles size={20} className="text-desert-accent/50" />
                        </h3>
                        <p className="text-[10px] text-white/40 font-montserrat uppercase tracking-[0.2em] mb-8 font-bold italic">
                            {isLogin ? 'Accede a tu cuenta profesional' : 'Crea tu cuenta profesional aquí'}
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <AnimatePresence mode="wait">
                                {!isLogin && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="space-y-5 overflow-hidden"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="block text-[10px] uppercase tracking-widest text-desert-accent/70 font-bold px-1">Nombre</label>
                                                <input
                                                    required={!isLogin}
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                    className="w-full bg-black/40 border border-desert-accent/20 py-3 px-4 text-desert-accent text-sm font-montserrat focus:outline-none focus:border-desert-accent/60 transition-all rounded-sm placeholder:text-white/20 dark-input"
                                                    placeholder="Tu nombre..."
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="block text-[10px] uppercase tracking-widest text-desert-accent/70 font-bold px-1">Apellido</label>
                                                <input
                                                    required={!isLogin}
                                                    type="text"
                                                    value={formData.lastName}
                                                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                                                    className="w-full bg-black/40 border border-desert-accent/20 py-3 px-4 text-desert-accent text-sm font-montserrat focus:outline-none focus:border-desert-accent/60 transition-all rounded-sm placeholder:text-white/20 dark-input"
                                                    placeholder="Tu apellido..."
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="space-y-1">
                                <label className="block text-[10px] uppercase tracking-widest text-desert-accent/70 font-bold px-1">Email Sagrado</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-desert-accent/40" size={14} />
                                    <input
                                        required
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        className="w-full bg-black/40 border border-desert-accent/20 py-3 pl-10 pr-4 text-desert-accent text-sm font-montserrat focus:outline-none focus:border-desert-accent/60 transition-all rounded-sm placeholder:text-white/20 dark-input"
                                        placeholder="email@ejemplo.com"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <AnimatePresence mode="wait">
                                    {!isLogin && (
                                        <motion.div
                                            initial={{ opacity: 0, width: 0 }}
                                            animate={{ opacity: 1, width: '100%' }}
                                            exit={{ opacity: 0, width: 0 }}
                                            className="space-y-1 overflow-hidden"
                                        >
                                            <label className="block text-[10px] uppercase tracking-widest text-desert-accent/70 font-bold px-1">Teléfono</label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-desert-accent/40" size={14} />
                                                <input
                                                    required={!isLogin}
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                                    className="w-full bg-black/40 border border-desert-accent/20 py-3 pl-10 pr-4 text-desert-accent text-sm font-montserrat focus:outline-none focus:border-desert-accent/60 transition-all rounded-sm placeholder:text-white/20 dark-input"
                                                    placeholder="+54 9..."
                                                />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                <div className="space-y-1 w-full">
                                    <label className="block text-[10px] uppercase tracking-widest text-desert-accent/70 font-bold px-1">Contraseña</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-desert-accent/40" size={14} />
                                        <input
                                            required
                                            type="password"
                                            value={formData.password}
                                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                                            className="w-full bg-black/40 border border-desert-accent/20 py-3 pl-10 pr-4 text-desert-accent text-sm font-montserrat focus:outline-none focus:border-desert-accent/60 transition-all rounded-sm placeholder:text-white/20 dark-input"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>
                            </div>

                            <AnimatePresence mode="wait">
                                {!isLogin && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="space-y-1 overflow-hidden"
                                    >
                                        <label className="block text-[10px] uppercase tracking-widest text-desert-accent/70 font-bold px-1">Mensaje Profesional (Opcional)</label>
                                        <div className="relative">
                                            <textarea
                                                rows={2}
                                                value={formData.comment}
                                                onChange={(e) => setFormData({...formData, comment: e.target.value})}
                                                className="w-full bg-black/40 border border-desert-accent/20 py-3 px-4 text-desert-accent text-sm font-montserrat focus:outline-none focus:border-desert-accent/60 transition-all resize-none rounded-sm placeholder:text-white/20 dark-input"
                                                placeholder="Cuéntanos tu visión..."
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 mt-2 bg-desert-accent text-desert-primary font-cinzel font-bold uppercase tracking-[0.3em] hover:bg-white transition-all duration-500 disabled:opacity-50 shadow-[0_0_20px_rgba(212,140,157,0.2)]"
                            >
                                {isSubmitting ? 'Procesando...' : (isLogin ? 'Entrar' : 'Crear Cuenta')}
                            </button>

                            <button
                                type="button"
                                onClick={() => setIsLogin(!isLogin)}
                                className="w-full text-center text-[9px] text-white/40 hover:text-white uppercase tracking-widest font-bold transition-all mt-4"
                            >
                                {isLogin ? 'No tengo cuenta - REGISTRARME' : 'Ya tengo cuenta - INICIAR SESIÓN'}
                            </button>
                        </form>
                    </motion.div>
                </div>

                <div className="pt-8 border-t border-desert-accent/10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-montserrat">
                        © 2026 Natural Mystic • Hecho con Alma & Magia
                    </p>
                    <div className="flex gap-8 text-[10px] text-white/40 uppercase tracking-widest font-montserrat">
                        <a href="#" className="hover:text-desert-accent transition-colors">Privacidad</a>
                        <a href="#" className="hover:text-desert-accent transition-colors">Términos</a>
                        <a href="#" className="hover:text-desert-accent transition-colors">Soporte</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
