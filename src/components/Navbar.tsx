import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const Navbar = ({ onOpenCart }: { onOpenCart: () => void }) => {
    const { itemCount } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${!isScrolled ? 'bg-desert-primary/95 backdrop-blur-md border-b border-desert-accent/20 shadow-lg' : 'bg-black/20 backdrop-blur-sm border-b border-white/5'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-3 group">
                        <div className="relative transform transition-transform group-hover:scale-105">
                            <img
                                src="https://scontent.cdninstagram.com/v/t51.2885-19/377993713_674497404589115_9065751379864944276_n.jpg?stp=dst-jpg_s100x100_tt6&_nc_cat=101&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy43MzQuQzMifQ%3D%3D&_nc_ohc=y6EG9ZrFHwIQ7kNvwGo5GcF&_nc_oc=AdkcNR33-cY1d4zieC_quO8EAZny77mG1eCqLWDfiJAoeXeJOx-CA4KGkAhWPirXBtc&_nc_zt=24&_nc_ht=scontent.cdninstagram.com&oh=00_AfrOf8M8a19U9UDX6F_5Am9Sj5yWp2QbLubAN3ArhdISHw&oe=69800415"
                                alt="Natural Mystic Logo"
                                className="w-10 h-10 rounded-full border border-desert-accent/50 object-cover"
                            />
                            <div className="absolute -top-1 -right-1 bg-desert-accent rounded-full p-0.5 shadow-lg">
                                <Sparkles className="text-desert-primary" size={10} />
                            </div>
                        </div>
                        <span className={`font-cinzel text-xl font-bold tracking-widest uppercase hidden sm:block transition-colors ${isScrolled ? 'text-black' : 'text-parchment group-hover:text-white'}`}>
                            Natural Mystic
                        </span>
                    </a>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#historia" className={`transition-colors font-montserrat text-sm tracking-widest uppercase font-medium ${isScrolled ? 'text-black hover:text-desert-primary' : 'text-parchment hover:text-white'}`}>Historia</a>
                        <a href="#ingredientes" className={`transition-colors font-montserrat text-sm tracking-widest uppercase font-medium ${isScrolled ? 'text-black hover:text-desert-primary' : 'text-parchment hover:text-white'}`}>Ingredientes</a>
                        <a href="#productos" className={`transition-colors font-montserrat text-sm tracking-widest uppercase font-medium ${isScrolled ? 'text-black hover:text-desert-primary' : 'text-parchment hover:text-white'}`}>Colección</a>
                        <a href="#testimonios" className={`transition-colors font-montserrat text-sm tracking-widest uppercase font-medium ${isScrolled ? 'text-black hover:text-desert-primary' : 'text-parchment hover:text-white'}`}>Testimonios</a>
                        <a href="#contacto" className={`transition-colors font-montserrat text-sm tracking-widest uppercase font-medium ${isScrolled ? 'text-black hover:text-desert-primary' : 'text-parchment hover:text-white'}`}>Contacto</a>
                        <button
                            onClick={onOpenCart}
                            className={`relative p-2 transition-colors ${isScrolled ? 'text-black hover:text-desert-primary' : 'text-parchment hover:text-white'}`}
                        >
                            <ShoppingCart size={24} />
                            {itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-insta-pink text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                    {itemCount}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="md:hidden flex items-center gap-4">
                        <button onClick={onOpenCart} className={`relative p-2 ${isScrolled ? 'text-black' : 'text-parchment'}`}>
                            <ShoppingCart size={24} />
                            {itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-insta-pink text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                    {itemCount}
                                </span>
                            )}
                        </button>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`transition-colors ${isScrolled ? 'text-black hover:text-desert-primary' : 'text-parchment hover:text-white'}`}>
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-desert-primary border-t border-desert-accent/10"
                    >
                        <div className="px-4 pt-4 pb-8 space-y-4">
                            <a href="#historia" onClick={() => setIsMenuOpen(false)} className="block text-parchment hover:text-white font-montserrat uppercase tracking-widest text-sm py-2">Historia</a>
                            <a href="#ingredientes" onClick={() => setIsMenuOpen(false)} className="block text-parchment hover:text-white font-montserrat uppercase tracking-widest text-sm py-2">Ingredientes</a>
                            <a href="#productos" onClick={() => setIsMenuOpen(false)} className="block text-parchment hover:text-white font-montserrat uppercase tracking-widest text-sm py-2">Colección</a>
                            <a href="#testimonios" onClick={() => setIsMenuOpen(false)} className="block text-parchment hover:text-white font-montserrat uppercase tracking-widest text-sm py-2">Testimonios</a>
                            <a href="#contacto" onClick={() => setIsMenuOpen(false)} className="block text-parchment hover:text-white font-montserrat uppercase tracking-widest text-sm py-2">Contacto</a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
