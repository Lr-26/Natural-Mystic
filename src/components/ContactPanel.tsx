import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Star } from 'lucide-react';
import { getContacts, type ContactEntry } from '../services/contact.service';
import { toast } from 'sonner';

const ContactPanel = () => {
    const [contacts, setContacts] = useState<ContactEntry[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchContacts = async () => {
        setLoading(true);
        try {
            const data = await getContacts();
            setContacts(data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
            toast.error('Error al cargar la tribu de contactos.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4 opacity-50">
                <RefreshCw className="animate-spin text-desert-accent" size={40} />
                <p className="font-cinzel text-desert-primary tracking-widest uppercase text-sm">Organizando la tribu...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-2xl shadow-sm border border-desert-accent/5 gap-4">
                <div>
                    <h3 className="text-desert-primary font-cinzel font-bold text-lg">Almas en el Camino</h3>
                    <p className="text-xs text-desert-text font-montserrat">{contacts.length} contactos en tu círculo</p>
                </div>
                <button onClick={fetchContacts} className="w-full md:w-auto p-3 bg-desert-bg rounded-lg hover:bg-desert-accent/10 transition-colors text-desert-primary flex items-center justify-center gap-2">
                    <RefreshCw size={18} /> Actualizar Círculo
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-desert-accent/10 overflow-hidden overflow-x-auto">
                <table className="w-full text-left min-w-[800px]">
                    <thead className="bg-desert-bg/30 border-b border-desert-accent/10">
                        <tr>
                            <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-desert-primary">Identidad</th>
                            <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-desert-primary">Correo Sagrado</th>
                            <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-desert-primary">Frecuencia (Tel)</th>
                            <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-desert-primary">Último Contacto</th>
                            <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-desert-primary text-right">Estatus</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-desert-accent/5">
                        {contacts.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-12 text-center text-desert-text italic">
                                    Aún no hay almas registradas en el círculo de luz.
                                </td>
                            </tr>
                        ) : (
                            contacts.map((contact) => (
                                <motion.tr 
                                    key={contact.email} 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="hover:bg-desert-bg/20 transition-colors group"
                                >
                                    <td className="p-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-desert-accent/20 flex items-center justify-center text-desert-primary font-cinzel font-bold">
                                                {contact.name.charAt(0)}
                                            </div>
                                            <div className="font-cinzel font-bold text-desert-primary">{contact.name}</div>
                                        </div>
                                    </td>
                                    <td className="p-6 font-montserrat text-xs text-desert-text font-bold uppercase tracking-tight">{contact.email}</td>
                                    <td className="p-6 font-montserrat text-xs text-desert-text">{contact.phone}</td>
                                    <td className="p-6 text-[10px] font-montserrat font-bold uppercase tracking-tighter text-desert-accent">
                                        {new Date(contact.last_contact).toLocaleString('es-AR')}
                                    </td>
                                    <td className="p-6 text-right">
                                        <div className="flex justify-end bg-desert-accent/5 p-2 rounded-lg text-desert-accent italic text-[10px] font-bold uppercase tracking-widest">
                                            Interesado <Star size={10} className="ml-1 fill-desert-accent" />
                                        </div>
                                    </td>
                                </motion.tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ContactPanel;
