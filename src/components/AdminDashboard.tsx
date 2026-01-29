import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, LogOut, Package, ExternalLink, RefreshCw } from 'lucide-react';
import { getProducts, createProduct, deleteProduct, Product } from '../services/product.service';
import { useAdmin } from '../context/AdminContext';

const AdminDashboard = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
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
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createProduct(newProduct);
            setIsAdding(false);
            setNewProduct({ name: '', description: '', price: 0, category: 'Jabones', image: '/images/product-placeholder.jpg', stock: 10 });
            fetchProducts();
        } catch (error) {
            alert('Error al crear producto. ¿Estás seguro de tener el token activo?');
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('¿Eliminar este tesoro alquímico?')) {
            try {
                await deleteProduct(id);
                fetchProducts();
            } catch (error) {
                alert('No se pudo eliminar. Verifica tu sesión.');
            }
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header del CMS */}
            <div className="bg-desert-primary text-white p-6 shadow-lg flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="bg-white/10 p-2 rounded-full">
                        <Package size={24} className="text-desert-accent" />
                    </div>
                    <div>
                        <h1 className="font-cinzel text-xl font-bold tracking-widest uppercase">CMS Natural Mystic</h1>
                        <p className="text-[10px] uppercase tracking-tighter opacity-70">Admin: {user?.email}</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <button onClick={fetchProducts} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <RefreshCw size={20} />
                    </button>
                    <button onClick={logout} className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-red-500/20 rounded-sm transition-all text-xs font-bold font-montserrat uppercase border border-white/20">
                        <LogOut size={16} /> <span>Salir</span>
                    </button>
                </div>
            </div>

            <main className="max-w-7xl mx-auto p-6 md:p-12">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="font-cinzel text-3xl font-bold text-desert-primary">Gestión de Catálogo</h2>
                    <button
                        onClick={() => setIsAdding(!isAdding)}
                        className="flex items-center gap-2 px-6 py-3 bg-desert-accent text-white font-cinzel font-bold tracking-widest uppercase hover:bg-desert-primary transition-all shadow-md"
                    >
                        <Plus size={20} /> {isAdding ? 'Cancelar' : 'Nuevo Producto'}
                    </button>
                </div>

                {/* Formulario de creación */}
                {isAdding && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        className="bg-desert-bg/5 p-8 rounded-sm mb-12 border border-desert-accent/10"
                    >
                        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-desert-primary mb-2">Nombre</label>
                                    <input required type="text" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} className="w-full p-3 border border-desert-accent/20" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-desert-primary mb-2">Precio ($)</label>
                                    <input required type="number" step="0.01" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: Number(e.target.value) })} className="w-full p-3 border border-desert-accent/20" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-desert-primary mb-2">Categoría</label>
                                    <select value={newProduct.category} onChange={e => setNewProduct({ ...newProduct, category: e.target.value })} className="w-full p-3 border border-desert-accent/20">
                                        <option>Jabones</option>
                                        <option>Inciensos</option>
                                        <option>Kits</option>
                                        <option>Aceites</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-desert-primary mb-2">Descripción</label>
                                    <textarea rows={4} value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} className="w-full p-3 border border-desert-accent/20" />
                                </div>
                                <div className="flex gap-4 items-end">
                                    <button type="submit" className="flex-1 py-4 bg-desert-primary text-white font-cinzel font-bold tracking-widest uppercase hover:bg-black transition-colors shadow-xl">Guardar en Base de Datos</button>
                                </div>
                            </div>
                        </form>
                    </motion.div>
                )}

                {/* Tabla de Productos */}
                <div className="bg-white border border-desert-accent/10 shadow-sm overflow-x-auto">
                    <table className="w-full text-left font-montserrat">
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
                            {loading ? (
                                <tr><td colSpan={5} className="p-12 text-center text-desert-text italic">Sincronizando con MongoDB...</td></tr>
                            ) : products.length === 0 ? (
                                <tr><td colSpan={5} className="p-12 text-center text-desert-text italic">No hay productos en el templo. Crea el primero.</td></tr>
                            ) : products.map((p) => (
                                <tr key={p._id} className="border-b border-desert-accent/5 hover:bg-desert-bg/5 transition-colors group">
                                    <td className="p-4">
                                        <img src={p.image} className="w-12 h-12 object-cover rounded-sm border border-desert-accent/20" alt="" />
                                    </td>
                                    <td className="p-4">
                                        <div className="font-cinzel font-bold text-sm text-desert-primary">{p.name}</div>
                                        <div className="text-[10px] text-desert-text uppercase">{p.category}</div>
                                    </td>
                                    <td className="p-4 text-sm font-bold text-desert-accent">${p.price}</td>
                                    <td className="p-4 text-sm text-desert-text">{p.stock}</td>
                                    <td className="p-4 text-right">
                                        <button
                                            onClick={() => handleDelete(p._id!)}
                                            className="p-2 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
