import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Calendar, User, MessageSquare, RefreshCw } from 'lucide-react';
import { getMessages, type ContactMessage } from '../services/contact.service';
import { toast } from 'sonner';

const MessagePanel = () => {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchMessages = async () => {
        setLoading(true);
        try {
            const data = await getMessages();
            setMessages(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
            toast.error('Error al cargar visiones.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4 opacity-50">
                <RefreshCw className="animate-spin text-desert-accent" size={40} />
                <p className="font-cinzel text-desert-primary tracking-widest uppercase text-sm">Escuchando el cosmos...</p>
            </div>
        );
    }

    if (messages.length === 0) {
        return (
            <div className="text-center py-20 bg-white rounded-2xl border border-desert-accent/10 shadow-sm">
                <MessageSquare className="mx-auto text-desert-accent/20 mb-4" size={48} />
                <h3 className="font-cinzel text-desert-primary text-xl">Silencio Astral</h3>
                <p className="text-desert-text font-montserrat text-sm mt-2 font-bold uppercase tracking-widest">No hay mensajes por el momento.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-desert-accent/5">
                <div>
                    <h3 className="text-desert-primary font-cinzel font-bold text-lg">Corrientes del Destino</h3>
                    <p className="text-xs text-desert-text font-montserrat">{messages.length} visiones recibidas</p>
                </div>
                <button onClick={fetchMessages} className="p-3 bg-desert-bg rounded-lg hover:bg-desert-accent/10 transition-colors text-desert-primary">
                    <RefreshCw size={18} />
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {messages.map((msg, idx) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        key={msg.id || idx}
                        className="bg-white rounded-2xl shadow-sm border border-desert-accent/10 p-6 hover:border-desert-accent/30 transition-all group"
                    >
                        <div className="flex flex-col md:flex-row justify-between gap-6">
                            <div className="flex-1 space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-desert-accent/10 flex items-center justify-center text-desert-accent">
                                        <User size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-cinzel font-bold text-desert-primary leading-none">{msg.name}</h4>
                                        <p className="text-[10px] text-desert-accent font-bold uppercase tracking-widest mt-1">{msg.subject}</p>
                                    </div>
                                </div>

                                <div className="bg-desert-bg/30 p-4 rounded-xl border border-desert-accent/5 italic text-desert-text font-montserrat text-sm relative">
                                    <span className="text-4xl text-desert-accent/10 absolute -top-2 -left-1 font-serif">"</span>
                                    {msg.message}
                                    <span className="text-4xl text-desert-accent/10 absolute -bottom-6 -right-1 font-serif">"</span>
                                </div>
                            </div>

                            <div className="md:w-64 space-y-3 border-l border-desert-accent/10 md:pl-6">
                                <div className="flex items-center gap-2 text-desert-text hover:text-desert-accent transition-colors cursor-pointer">
                                    <Mail size={14} className="text-desert-accent" />
                                    <span className="text-xs font-montserrat font-bold overflow-hidden text-ellipsis">{msg.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-desert-text">
                                    <Phone size={14} className="text-desert-accent" />
                                    <span className="text-xs font-montserrat font-bold">{msg.phone}</span>
                                </div>
                                <div className="flex items-center gap-2 text-desert-text/60">
                                    <Calendar size={14} />
                                    <span className="text-[10px] font-montserrat font-bold uppercase tracking-tighter">
                                        {new Date(msg.created_at).toLocaleString('es-AR')}
                                    </span>
                                </div>
                                
                                <div className="pt-4">
                                    <a 
                                        href={`mailto:${msg.email}?subject=Re: ${msg.subject} - Natural Mystic&body=Hola ${msg.name},`}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-desert-primary text-white font-cinzel text-[10px] rounded-lg hover:bg-desert-accent transition-all uppercase tracking-widest font-bold w-full justify-center"
                                    >
                                        Responder <Mail size={12} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default MessagePanel;
