import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Plus, Trash2, LogOut, Package, RefreshCw, Edit2, ExternalLink, Users } from 'lucide-react';
import { getProducts, createProduct, updateProduct, deleteProduct, type Product } from '../services/product.service';
import { useAdmin } from '../context/AdminContext';
import UserManagement from './UserManagement';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState<'products' | 'users'>('products');
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const { logout, user } = useAdmin();

    // Estado para nuevo producto
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: 0,
        category: 'Jabones',
        image: '/images/product-placeholder.jpg',
        stock: 10
    });

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error al cargar productos. Verifica la conexión.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const loadingToast = toast.loading(editingId ? 'Actualizando alquimia...' : 'Creando nueva magia...');

        try {
            if (editingId) {
                await updateProduct(editingId, newProduct);
                toast.success('Producto actualizado correctamente ✨');
                setEditingId(null);
            } else {
                await createProduct(newProduct);
                toast.success('Nuevo producto añadido al catálogo 🌿');
            }
            setIsAdding(false);
            setNewProduct({ name: '', description: '', price: 0, category: 'Jabones', image: '/images/product-placeholder.jpg', stock: 10 });
            fetchProducts();
        } catch (error: any) {
            const message = error.response?.data?.message || 'Error al procesar producto. Verifica tu sesión.';
            toast.error(message);
        } finally {
            toast.dismiss(loadingToast);
        }
    };

    const startEdit = (product: Product) => {
        setNewProduct({
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            image: product.image,
            stock: product.stock
        });
        setEditingId(product._id || product.id || null);
        setIsAdding(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelEdit = () => {
        setIsAdding(false);
        setEditingId(null);
        setNewProduct({ name: '', description: '', price: 0, category: 'Jabones', image: '/images/product-placeholder.jpg', stock: 10 });
    };

    const handleDelete = (id: string) => {
        toast('¿Eliminar este tesoro alquímico?', {
            action: {
                label: 'Eliminar',
                onClick: async () => {
                    try {
                        await deleteProduct(id);
                        toast.success('Producto eliminado 🗑️');
                        fetchProducts();
                    } catch (error: any) {
                        const message = error.response?.data?.message || 'No se pudo eliminar.';
                        toast.error(message);
                    }
                }
            },
            cancel: {
                label: 'Cancelar',
                onClick: () => console.log('Cancelado'),
            },
            duration: 5000,
        });
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header del CMS */}
            <div className="bg-desert-primary text-white p-6 shadow-lg flex justify-between items-center sticky top-0 z-40">
                <div className="flex items-center gap-4">
                    <div className="bg-white/10 p-2 rounded-full">
                        <Package size={24} className="text-desert-accent" />
                    </div>
                    <div>
                        <h1 className="font-cinzel text-xl font-bold tracking-widest uppercase">CMS Natural Mystic</h1>
                        <p className="text-[10px] uppercase tracking-tighter opacity-70">Admin: {user?.email}</p>
                    </div>
                </div>
                <div className="flex gap-4 items-center">
                    <Link to="/" className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold hover:text-desert-accent transition-colors">
                        <ExternalLink size={14} /> <span className="hidden md:inline">Ver Sitio</span>
                    </Link>
                    <button onClick={fetchProducts} className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Actualizar lista">
                        <RefreshCw size={20} />
                    </button>
                    <button onClick={logout} className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-red-500/20 rounded-sm transition-all text-xs font-bold font-montserrat uppercase border border-white/20">
                        <LogOut size={16} /> <span className="hidden md:inline">Salir</span>
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white border-b border-desert-accent/10">
                <div className="max-w-7xl mx-auto px-4 md:px-12">
                    <div className="flex gap-1 overflow-x-auto">
                        <button
                            onClick={() => setActiveTab('products')}
                            className={`flex items-center gap-2 px-6 py-4 font-cinzel font-bold tracking-widest uppercase transition-all relative whitespace-nowrap ${activeTab === 'products'
                                ? 'text-desert-accent border-b-2 border-desert-accent'
                                : 'text-desert-text hover:text-desert-primary'
                                }`}
                        >
                            <Package size={18} />
                            <span>Productos</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('users')}
                            className={`flex items-center gap-2 px-6 py-4 font-cinzel font-bold tracking-widest uppercase transition-all relative whitespace-nowrap ${activeTab === 'users'
                                ? 'text-desert-accent border-b-2 border-desert-accent'
                                : 'text-desert-text hover:text-desert-primary'
                                }`}
                        >
                            <Users size={18} />
                            <span>Usuarios</span>
                        </button>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto p-4 md:p-12">
                {activeTab === 'products' ? (
                    <>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                            <h2 className="font-cinzel text-2xl md:text-3xl font-bold text-desert-primary">Gestión de Catálogo</h2>
                            <button
                                onClick={() => editingId ? cancelEdit() : setIsAdding(!isAdding)}
                                className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-desert-accent text-white font-cinzel font-bold tracking-widest uppercase hover:bg-desert-primary transition-all shadow-md"
                            >
                                <Plus size={20} /> {isAdding ? 'Cancelar' : 'Nuevo Producto'}
                            </button>
                        </div>

                        {/* Formulario de creación */}
                        <AnimatePresence>
                            {isAdding && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="bg-desert-bg/5 p-4 md:p-8 rounded-sm mb-12 border border-desert-accent/10 overflow-hidden"
                                >
                                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-widest text-desert-primary mb-2">Nombre</label>
                                                <input required type="text" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} className="w-full p-3 border border-desert-accent/20 focus:outline-none focus:border-desert-primary" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-widest text-desert-primary mb-2">Precio ($)</label>
                                                <input required type="number" step="0.01" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: Number(e.target.value) })} className="w-full p-3 border border-desert-accent/20 focus:outline-none focus:border-desert-primary" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-widest text-desert-primary mb-2">Categoría</label>
                                                <select value={newProduct.category} onChange={e => setNewProduct({ ...newProduct, category: e.target.value })} className="w-full p-3 border border-desert-accent/20 focus:outline-none focus:border-desert-primary">
                                                    <option>Jabones</option>
                                                    <option>Inciensos</option>
                                                    <option>Kits</option>
                                                    <option>Aceites</option>
                                                    <option>Velas</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-widest text-desert-primary mb-2">Descripción</label>
                                                <textarea rows={4} value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} className="w-full p-3 border border-desert-accent/20 focus:outline-none focus:border-desert-primary" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-bold uppercase tracking-widest text-desert-primary mb-2">Stock</label>
                                                    <input required type="number" value={newProduct.stock} onChange={e => setNewProduct({ ...newProduct, stock: Number(e.target.value) })} className="w-full p-3 border border-desert-accent/20 focus:outline-none focus:border-desert-primary" />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold uppercase tracking-widest text-desert-primary mb-2">URL Imagen</label>
                                                    <input required type="text" value={newProduct.image} onChange={e => setNewProduct({ ...newProduct, image: e.target.value })} className="w-full p-3 border border-desert-accent/20 focus:outline-none focus:border-desert-primary" placeholder="/images/..." />
                                                </div>
                                            </div>
                                            <div className="flex gap-4 items-end pt-2">
                                                <button type="submit" className="flex-1 py-4 bg-desert-primary text-white font-cinzel font-bold tracking-widest uppercase hover:bg-black transition-colors shadow-xl text-sm">
                                                    {editingId ? 'Actualizar Alquimia' : 'Guardar en Base de Datos'}
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Tabla de Productos */}
                        <div className="bg-white border border-desert-accent/10 shadow-sm overflow-x-auto rounded-sm">
                            <table className="w-full text-left font-montserrat min-w-[600px]">
                                <thead className="bg-desert-secondary/5 border-b border-desert-accent/10">
                                    <tr>
                                        <th className="p-4 text-xs font-bold uppercase tracking-widest text-desert-primary">Imagen</th>
                                        <th className="p-4 text-xs font-bold uppercase tracking-widest text-desert-primary">Producto</th>
                                        <th className="p-4 text-xs font-bold uppercase tracking-widest text-desert-primary">Precio</th>
                                        <th className="p-4 text-xs font-bold uppercase tracking-widest text-desert-primary">Stock</th>
                                        <th className="p-4 text-xs font-bold uppercase tracking-widest text-desert-primary text-right">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <AnimatePresence>
                                        {loading ? (
                                            <tr><td colSpan={5} className="p-12 text-center text-desert-text italic">Sincronizando con MongoDB...</td></tr>
                                        ) : products.length === 0 ? (
                                            <tr><td colSpan={5} className="p-12 text-center text-desert-text italic">No hay productos en el templo. Crea el primero.</td></tr>
                                        ) : products.map((p) => (
                                            <motion.tr
                                                layout
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                key={p._id || p.id}
                                                className="border-b border-desert-accent/5 hover:bg-desert-bg/5 transition-colors group"
                                            >
                                                <td className="p-4">
                                                    <img src={p.image} className="w-12 h-12 object-cover rounded-sm border border-desert-accent/20" alt="" />
                                                </td>
                                                <td className="p-4">
                                                    <div className="font-cinzel font-bold text-sm text-desert-primary">{p.name}</div>
                                                    <div className="text-[10px] text-desert-text uppercase">{p.category}</div>
                                                </td>
                                                <td className="p-4 text-sm font-bold text-desert-accent">${p.price}</td>
                                                <td className="p-4 text-sm text-desert-text">{p.stock}</td>
                                                <td className="p-4 text-right flex justify-end gap-2">
                                                    <button
                                                        onClick={() => startEdit(p)}
                                                        className="p-2 text-desert-accent hover:text-desert-primary hover:bg-desert-bg/10 rounded-full transition-all"
                                                        title="Editar"
                                                    >
                                                        <Edit2 size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete((p._id || p.id)!)}
                                                        className="p-2 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                                                        title="Eliminar"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        </div>
                    </>
                ) : (
                    <UserManagement token={localStorage.getItem('token') || ''} />
                )}
            </main>
        </div >
    );
};

export default AdminDashboard;
