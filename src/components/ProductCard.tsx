import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Plus, ShoppingBag } from 'lucide-react';

const ProductCard = ({ product }: { product: any }) => {
    const { addToCart } = useCart();

    const categoryImages: Record<string, string> = {
        'Velas': '/images/cat-candles.jpg',
        'Sahumerios': '/images/cat-incense.jpg',
        'Jabones': '/images/cat-soaps.jpg',
        'Cremas': '/images/cat-creams.jpg'
    };

    const imageSrc = categoryImages[product.category] || product.image;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -12 }}
            className="group bg-white cursor-pointer border border-desert-accent/20 p-4 transition-all hover:shadow-2xl hover:border-desert-accent duration-300 rounded-sm relative"
        >
            <div className="relative aspect-square mb-6 overflow-hidden">
                <img
                    src={imageSrc}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                        className="bg-desert-primary text-white p-4 rounded-full shadow-xl hover:bg-desert-accent transition-colors"
                    >
                        <Plus size={24} />
                    </motion.button>
                </div>
                <div className="absolute top-2 left-2 px-3 py-1 bg-desert-primary text-white text-[10px] uppercase tracking-widest font-extrabold shadow-md">
                    {product.category}
                </div>
            </div>

            <div className="text-center">
                <h3 className="text-desert-primary text-lg font-cinzel mb-2 tracking-wide group-hover:text-desert-accent transition-colors font-bold">
                    {product.name}
                </h3>
                <p className="text-desert-text text-sm font-montserrat mb-4 font-normal line-clamp-2 px-2">
                    {product.description}
                </p>
                <div className="flex items-center justify-center gap-3">
                    <span className="text-desert-primary font-cinzel text-xl font-bold">
                        ${typeof product.price === 'number' ? product.price.toFixed(2) : '0.00'}
                    </span>
                    <button
                        onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                        className="md:hidden flex items-center gap-1 text-[10px] text-desert-accent uppercase font-bold tracking-tighter"
                    >
                        <ShoppingBag size={14} /> Añadir
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
