import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { 
    Plus, Trash2, LogOut, Package, RefreshCw, Edit2, 
    ExternalLink, Users, Sparkles, MessageSquare, 
    Menu as MenuIcon, X 
} from 'lucide-react';
import { getProducts, deleteProduct, type Product } from '../services/product.service';
import { useAdmin } from '../context/AdminContext';
import UserManagement from './UserManagement';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState<'products' | 'users' | 'messages'>('products');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const { logout, user } = useAdmin();

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error al cargar productos.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const sidebarItems = [
        { id: 'products', label: 'Catálogo', icon: <Package size={20} /> },
        { id: 'users', label: 'Tribu (Usuarios)', icon: <Users size={20} /> },
        { id: 'messages', label: 'Visiones (Mensajes)', icon: <MessageSquare size={20} /> },
    ];

    const handleDelete = async (id: string | number) => {
        if (!window.confirm('¿Seguro que deseas eliminar este producto?')) return;
        try {
            await deleteProduct(id.toString());
            toast.success('Producto eliminado');
            fetchProducts();
        } catch (error) {
            toast.error('No se pudo eliminar');
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFBF9] flex overflow-hidden">
            {/* SIDEBAR PRO */}
            <motion.aside 
                initial={false}
                animate={{ width: isSidebarOpen ? 280 : 80 }}
                className="bg-desert-primary text-white h-screen flex flex-col transition-all duration-300 relative z-50 shadow-2xl"
            >
                {/* Logo Area */}
                <div className="p-6 flex items-center gap-4 border-b border-white/10 h-24 overflow-hidden">
                    <div className="bg-desert-accent p-2 rounded-lg shrink-0">
                        <Sparkles size={24} className="text-desert-primary" />
                    </div>
                    {isSidebarOpen && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overflow-hidden whitespace-nowrap">
                            <h2 className="font-cinzel font-bold text-lg tracking-widest">MYSTIC</h2>
                            <p className="text-[10px] uppercase opacity-50 tracking-tighter">Panel de Alquimia</p>
                        </motion.div>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2 mt-4">
                    {sidebarItems.map((item) => (
                        <button
                            key={item.id}
                            //@ts-ignore
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all group relative ${
                                activeTab === item.id 
                                    ? 'bg-desert-accent text-desert-primary font-bold shadow-lg' 
                                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                            <span className="shrink-0">{item.icon}</span>
                            {isSidebarOpen && (
                                <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="font-montserrat text-sm tracking-widest uppercase">
                                    {item.label}
                                </motion.span>
                            )}
                            {activeTab === item.id && (
                                <motion.div layoutId="active-pill" className="absolute left-0 w-1 h-8 bg-desert-primary rounded-r-full" />
                            )}
                        </button>
                    ))}
                </nav>

                {/* Footer Sidebar */}
                <div className="p-4 border-t border-white/10 space-y-4">
                    <Link to="/" className="flex items-center gap-4 p-4 text-white/60 hover:text-white transition-colors">
                        <ExternalLink size={20} />
                        {isSidebarOpen && <span className="text-xs uppercase tracking-widest font-bold">Ver Sitio</span>}
                    </Link>
                    <button 
                        onClick={logout}
                        className="w-full flex items-center gap-4 p-4 text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                    >
                        <LogOut size={20} />
                        {isSidebarOpen && <span className="text-xs uppercase tracking-widest font-bold">Cerrar Sesión</span>}
                    </button>
                </div>

                {/* Toggle Button */}
                <button 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="absolute -right-4 top-24 bg-desert-accent text-desert-primary p-1 rounded-full border-4 border-[#FDFBF9] shadow-md hover:scale-110 transition-transform"
                >
                    {isSidebarOpen ? <X size={16} /> : <MenuIcon size={16} />}
                </button>
            </motion.aside>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 h-screen overflow-y-auto relative">
                {/* Header */}
                <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-desert-accent/10 h-24 flex items-center px-8 md:px-12 justify-between">
                    <div>
                        <h1 className="text-desert-primary font-cinzel text-xl md:text-2xl font-bold tracking-widest">
                            {activeTab === 'products' ? 'Gestión de Tesoros' : activeTab === 'users' ? 'Círculo de la Tribu' : 'Mensajes del Cosmos'}
                        </h1>
                        <p className="text-[10px] md:text-xs text-desert-text font-montserrat uppercase tracking-widest">
                            Bienvenido de nuevo, <span className="text-desert-accent font-bold">{user?.email?.split('@')[0]}</span>
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <button onClick={fetchProducts} className="p-2 md:p-3 bg-desert-bg/50 rounded-full hover:bg-desert-accent/10 transition-colors text-desert-primary">
                            <RefreshCw size={18} />
                        </button>
                        <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-desert-primary flex items-center justify-center text-desert-accent font-bold border-2 border-desert-accent/20 text-sm">
                            {user?.email?.charAt(0).toUpperCase()}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-4 md:p-12 max-w-[1400px] mx-auto">
                    {activeTab === 'products' ? (
                        <div className="space-y-8">
                             {/* Acciones de Producto */}
                             <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-2xl shadow-sm border border-desert-accent/5 gap-4">
                                 <div>
                                     <h3 className="text-desert-primary font-cinzel font-bold text-lg">Catálogo Alquímico</h3>
                                     <p className="text-xs text-desert-text font-montserrat">{products.length} productos ritualizados</p>
                                 </div>
                                 <button
                                    onClick={() => setIsAdding(!isAdding)}
                                    className="w-full md:w-auto px-8 py-4 bg-desert-primary text-white font-cinzel font-bold tracking-[0.2em] uppercase rounded-xl hover:bg-desert-accent transition-all shadow-glow flex items-center justify-center gap-2"
                                >
                                    <Plus size={20} /> {isAdding ? 'Cerrar Panel' : 'Añadir Magia'}
                                </button>
                             </div>

                             {loading ? (
                                 <div className="flex flex-col items-center justify-center py-20 gap-4 opacity-50">
                                     <RefreshCw className="animate-spin text-desert-accent" size={40} />
                                     <p className="font-cinzel text-desert-primary tracking-widest uppercase text-sm">Invocando el catálogo...</p>
                                 </div>
                             ) : (
                                 <div className="bg-white rounded-2xl shadow-sm border border-desert-accent/10 overflow-hidden overflow-x-auto">
                                     <table className="w-full text-left min-w-[800px]">
                                         <thead className="bg-desert-bg/30 border-b border-desert-accent/10">
                                             <tr>
                                                 <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-desert-primary">Aura</th>
                                                 <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-desert-primary">Identidad</th>
                                                 <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-desert-primary">Esencia</th>
                                                 <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-desert-primary">Valor</th>
                                                 <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-desert-primary text-right">Acciones</th>
                                             </tr>
                                         </thead>
                                         <tbody className="divide-y divide-desert-accent/5">
                                            <AnimatePresence>
                                                {products.map((p) => (
                                                    <motion.tr 
                                                        key={p._id || p.id} 
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        className="hover:bg-desert-bg/20 transition-colors group"
                                                    >
                                                        <td className="p-6">
                                                            <img src={p.image} className="w-16 h-16 object-cover rounded-xl border border-desert-accent/10 group-hover:scale-105 transition-transform" alt="" />
                                                        </td>
                                                        <td className="p-6">
                                                            <div className="font-cinzel font-bold text-desert-primary">{p.name}</div>
                                                            <div className="text-[10px] text-desert-accent font-bold uppercase tracking-tighter">{p.category}</div>
                                                        </td>
                                                        <td className="p-6 text-xs text-desert-text max-w-xs truncate italic">{p.description}</td>
                                                        <td className="p-6 font-bold text-desert-primary">${p.price}</td>
                                                        <td className="p-6 text-right">
                                                            <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <button className="p-2 text-desert-accent hover:bg-desert-accent/10 rounded-lg transition-all" title="Editar">
                                                                    <Edit2 size={18} />
                                                                </button>
                                                                <button onClick={() => handleDelete(p._id || p.id!)} className="p-2 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Eliminar">
                                                                    <Trash2 size={18} />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </motion.tr>
                                                ))}
                                            </AnimatePresence>
                                         </tbody>
                                     </table>
                                 </div>
                             )}
                        </div>
                    ) : activeTab === 'users' ? (
                        <UserManagement token={localStorage.getItem('access_token') || ''} />
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 opacity-50 gap-4">
                            <MessageSquare size={40} className="text-desert-accent" />
                            <p className="font-cinzel tracking-widest uppercase">Próximamente: Visiones del Cosmos</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
