import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';

const CartDrawer = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/75 z-[100]"
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col border-l border-desert-accent/20"
                    >
                        <div className="p-6 bg-desert-primary text-parchment flex justify-between items-center border-b border-desert-accent/10">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="text-desert-accent" />
                                <h2 className="font-cinzel text-2xl tracking-widest font-bold">Tu Kit de Alquimia</h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cart.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-desert-bg space-y-4">
                                    <ShoppingBag size={48} className="text-desert-bg/50" />
                                    <p className="font-montserrat text-desert-primary font-medium italic">
                                        Tu kit de belleza está esperando ser completado...
                                    </p>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        key={item.id}
                                        className="flex gap-4 bg-desert-bg/5 p-4 rounded-sm border border-desert-accent/10"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-20 h-20 object-cover rounded-sm"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-cinzel text-desert-primary font-bold">{item.name}</h3>
                                            <p className="font-montserrat text-desert-accent font-medium">${item.price.toFixed(2)}</p>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center border border-desert-accent/30 rounded-sm">
                                                <button
                                                    onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                                                    className="p-1 hover:text-desert-accent transition-colors"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="w-8 text-center font-montserrat text-sm font-bold text-desert-primary">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-1 hover:text-desert-accent transition-colors"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-400 hover:text-red-600 transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div className="p-6 bg-desert-bg/10 border-t border-desert-accent/20 space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="font-cinzel text-desert-primary uppercase tracking-widest text-sm font-bold">Total Compra</span>
                                    <span className="font-cinzel text-absolute-black text-2xl font-bold">${totalPrice.toFixed(2)}</span>
                                </div>
                                <button className="w-full bg-desert-primary text-parchment py-4 font-cinzel tracking-[0.2em] transform active:scale-[0.98] transition-all hover:bg-desert-primary/90 flex items-center justify-center gap-2 border border-desert-accent/30 shadow-lg uppercase">
                                    <span>Finalizar Pedido</span>
                                    <ArrowRight size={18} className="text-desert-accent" />
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
