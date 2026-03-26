import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Mail, Phone, MessageSquare, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import api from '../services/api.config';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        phone: '',
        subject: 'Consulta General',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Enviamos al backend para que lo guarde en Supabase
            await api.post('/contact', formData);
            
            toast.success('¡Mensaje enviado con éxito!', {
                description: 'Nos pondremos en contacto contigo pronto a través de tu energía y correo.',
                style: { background: '#2C1810', color: '#F3E5D8', border: '1px solid #D48C9D' }
            });
            
            setFormData({
                name: '',
                lastName: '',
                email: '',
                phone: '',
                subject: 'Consulta General',
                message: ''
            });
        } catch (error) {
            console.error('Error sending message:', error);
            toast.error('Hubo un problema al enviar el mensaje', {
                description: 'Por favor, inténtalo de nuevo más tarde.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section id="contacto-directo" className="py-24 bg-desert-bg relative overflow-hidden">
            {/* Elements decorativos */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-desert-accent/5 rounded-full blur-[100px] -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-desert-primary/10 rounded-full blur-[100px] -ml-48 -mb-48" />

            <div className="max-w-4xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-desert-secondary font-montserrat tracking-[0.3em] uppercase text-xs mb-3 italic font-bold">
                            Conecta con Nosotros
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-cinzel text-white mb-6 tracking-widest leading-tight">
                            Mensaje de <span className="text-desert-accent">Luz</span>
                        </h3>
                        <p className="text-parchment/60 font-montserrat text-lg max-w-2xl mx-auto italic">
                            Escríbenos para consultas personalizadas, pedidos especiales o simplemente para compartir tu energía alquímica.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="glass p-8 md:p-12 rounded-sm border border-desert-accent/20 shadow-2xl bg-black/40"
                >
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Nombre */}
                            <div className="space-y-2 group">
                                <label className="block text-[10px] uppercase tracking-[0.2em] text-desert-accent font-bold px-1">Nombre</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-desert-accent/40 group-focus-within:text-desert-accent transition-colors" size={18} />
                                    <input
                                        required
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Tu nombre sagrado"
                                        className="w-full bg-white/5 border border-white/10 rounded-sm py-4 pl-12 pr-4 text-white font-montserrat focus:outline-none focus:border-desert-accent/50 focus:bg-white/10 transition-all placeholder:text-white/20"
                                    />
                                </div>
                            </div>

                            {/* Apellido */}
                            <div className="space-y-2 group">
                                <label className="block text-[10px] uppercase tracking-[0.2em] text-desert-accent font-bold px-1">Apellido</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-desert-accent/40 group-focus-within:text-desert-accent transition-colors" size={18} />
                                    <input
                                        required
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder="Tu linaje"
                                        className="w-full bg-white/5 border border-white/10 rounded-sm py-4 pl-12 pr-4 text-white font-montserrat focus:outline-none focus:border-desert-accent/50 focus:bg-white/10 transition-all placeholder:text-white/20"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-2 group">
                                <label className="block text-[10px] uppercase tracking-[0.2em] text-desert-accent font-bold px-1">Correo Electrónico</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-desert-accent/40 group-focus-within:text-desert-accent transition-colors" size={18} />
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="espiritu@cosmos.com"
                                        className="w-full bg-white/5 border border-white/10 rounded-sm py-4 pl-12 pr-4 text-white font-montserrat focus:outline-none focus:border-desert-accent/50 focus:bg-white/10 transition-all placeholder:text-white/20"
                                    />
                                </div>
                            </div>

                            {/* Teléfono */}
                            <div className="space-y-2 group">
                                <label className="block text-[10px] uppercase tracking-[0.2em] text-desert-accent font-bold px-1">Teléfono / WhatsApp</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-desert-accent/40 group-focus-within:text-desert-accent transition-colors" size={18} />
                                    <input
                                        required
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+54 9..."
                                        className="w-full bg-white/5 border border-white/10 rounded-sm py-4 pl-12 pr-4 text-white font-montserrat focus:outline-none focus:border-desert-accent/50 focus:bg-white/10 transition-all placeholder:text-white/20"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Asunto */}
                        <div className="space-y-2 group">
                            <label className="block text-[10px] uppercase tracking-[0.2em] text-desert-accent font-bold px-1">Asunto</label>
                            <select
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-sm py-4 px-4 text-white font-montserrat focus:outline-none focus:border-desert-accent/50 focus:bg-white/10 transition-all"
                            >
                                <option className="bg-desert-primary" value="Consulta General">Consulta General</option>
                                <option className="bg-desert-primary" value="Pedido Especial">Pedido Personalizado</option>
                                <option className="bg-desert-primary" value="Alquimia Digital">Alquimia Digital (SaaS)</option>
                                <option className="bg-desert-primary" value="Ventas Mayoristas">Mayoristas</option>
                            </select>
                        </div>

                        {/* Mensaje */}
                        <div className="space-y-2 group">
                            <label className="block text-[10px] uppercase tracking-[0.2em] text-desert-accent font-bold px-1">Tu Mensaje / Comentario</label>
                            <div className="relative">
                                <MessageSquare className="absolute left-4 top-6 text-desert-accent/40 group-focus-within:text-desert-accent transition-colors" size={18} />
                                <textarea
                                    required
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={5}
                                    placeholder="Comparte tus pensamientos, dudas o visiones con nosotros..."
                                    className="w-full bg-white/5 border border-white/10 rounded-sm py-4 pl-12 pr-4 text-white font-montserrat focus:outline-none focus:border-desert-accent/50 focus:bg-white/10 transition-all placeholder:text-white/20"
                                />
                            </div>
                        </div>

                        {/* Botón enviar */}
                        <div className="pt-4 flex justify-center">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="relative overflow-hidden px-12 py-5 bg-desert-accent text-desert-primary font-cinzel font-bold uppercase tracking-[0.3em] transition-all hover:bg-white group disabled:opacity-50 shadow-[0_0_30px_rgba(212,140,157,0.4)]"
                            >
                                <div className="flex items-center gap-3 relative z-10">
                                    {isSubmitting ? (
                                        <div className="w-5 h-5 border-2 border-desert-primary border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            Enviar Alquimia <Send size={18} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </>
                                    )}
                                </div>
                                <Sparkles className="absolute -top-2 -right-2 text-white/20 group-hover:text-desert-primary/20 transition-colors" size={40} />
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactForm;
