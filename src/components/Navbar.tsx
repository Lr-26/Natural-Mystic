import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAdmin } from '../context/AdminContext';

const Navbar = ({ onOpenCart }: { onOpenCart: () => void }) => {
    const { itemCount } = useCart();
    const { user, isAdmin, logout } = useAdmin();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
    };

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${!isScrolled ? 'bg-desert-primary/95 backdrop-blur-md border-b border-desert-accent/20 shadow-lg' : 'bg-white/95 backdrop-blur-md border-b border-desert-primary/10 shadow-md'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 group">
                        <div className="relative transform transition-transform group-hover:scale-105">
                            <img
                                src="/images/logo.png"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.nextElementSibling?.classList.remove('hidden'); // Show icon fallback if image fails
                                }}
                                alt="Natural Mystic Logo"
                                className="w-12 h-12 object-contain"
                            />
                            {/* Fallback Icon (Hidden by default, shown on error) */}
                            <div className="hidden absolute inset-0 flex items-center justify-center bg-desert-primary/10 rounded-full">
                                <Sparkles className="text-desert-accent" size={18} />
                            </div>

                            <div className="absolute -top-1 -right-1 bg-desert-accent rounded-full p-0.5 shadow-lg">
                                <Sparkles className="text-desert-primary" size={10} />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className={`font-cinzel text-lg font-bold tracking-widest uppercase transition-colors leading-none ${isScrolled ? 'text-black' : 'text-parchment group-hover:text-white'}`}>
                                Natural
                            </span>
                            <span className={`font-montserrat text-[10px] tracking-[0.4em] uppercase transition-colors ${isScrolled ? 'text-black' : 'text-desert-accent group-hover:text-white'}`}>
                                Mystic
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">

                        <a href="/#historia" className={`transition-colors font-montserrat text-sm tracking-widest uppercase font-medium ${isScrolled ? 'text-black hover:text-desert-primary' : 'text-parchment hover:text-white'}`}>Historia</a>
                        <a href="/#ingredientes" className={`transition-colors font-montserrat text-sm tracking-widest uppercase font-medium ${isScrolled ? 'text-black hover:text-desert-primary' : 'text-parchment hover:text-white'}`}>Ingredientes</a>
                        <a href="/#productos" className={`transition-colors font-montserrat text-sm tracking-widest uppercase font-medium ${isScrolled ? 'text-black hover:text-desert-primary' : 'text-parchment hover:text-white'}`}>Colección</a>
                        <a href="/#contacto" className={`transition-colors font-montserrat text-sm tracking-widest uppercase font-medium ${isScrolled ? 'text-black hover:text-desert-primary' : 'text-parchment hover:text-white'}`}>Contacto</a>

                        {user ? (
                            <div className="flex items-center gap-6">
                                {isAdmin ? (
                                    <>
                                        <Link to="/admin" className="px-4 py-2 bg-desert-accent text-white font-cinzel text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-desert-primary transition-all">Panel</Link>
                                        <div className="flex flex-col items-end">
                                            <span className={`text-[10px] uppercase tracking-widest font-bold ${isScrolled ? 'text-black' : 'text-desert-accent'}`}>Hola,</span>
                                            <span className={`text-xs font-montserrat truncate max-w-[120px] ${isScrolled ? 'text-black' : 'text-white'}`}>{user.email}</span>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className={`transition-colors font-montserrat text-[10px] tracking-[0.2em] uppercase font-extrabold ${isScrolled ? 'text-red-600' : 'text-desert-accent hover:text-white'}`}
                                        >
                                            Salir
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={handleLogout}
                                        className={`transition-colors font-montserrat text-sm tracking-widest uppercase font-medium ${isScrolled ? 'text-black hover:text-red-600' : 'text-parchment hover:text-desert-accent'}`}
                                    >
                                        Salir
                                    </button>
                                )}
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className={`transition-colors font-montserrat text-sm tracking-widest uppercase font-bold border-b-2 border-desert-accent/50 pb-1 ${isScrolled ? 'text-black hover:text-desert-primary' : 'text-parchment hover:text-white'}`}
                            >
                                Entrar
                            </Link>
                        )}

                        <button
                            onClick={onOpenCart}
                            className={`relative p-2 transition-colors ${isScrolled ? 'text-black hover:text-desert-primary' : 'text-parchment hover:text-white'}`}
                        >
                            <ShoppingCart size={24} />
                            {itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-insta-pink text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
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
                                <span className="absolute -top-1 -right-1 bg-insta-pink text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
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
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-50 bg-desert-bg/95 backdrop-blur-xl md:hidden flex flex-col justify-center"
                    >
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="absolute top-6 right-6 p-2 text-desert-accent hover:text-white transition-colors"
                        >
                            <X size={32} />
                        </button>

                        <div className="px-8 py-8 space-y-6 text-center">
                            <a href="#historia" onClick={() => setIsMenuOpen(false)} className="block text-2xl font-cinzel text-parchment hover:text-desert-accent transition-colors">Historia</a>
                            <a href="#ingredientes" onClick={() => setIsMenuOpen(false)} className="block text-2xl font-cinzel text-parchment hover:text-desert-accent transition-colors">Ingredientes</a>
                            <a href="#productos" onClick={() => setIsMenuOpen(false)} className="block text-2xl font-cinzel text-parchment hover:text-desert-accent transition-colors">Colección</a>
                            <a href="#contacto" onClick={() => setIsMenuOpen(false)} className="block text-2xl font-cinzel text-parchment hover:text-desert-accent transition-colors">Contacto</a>

                            <div className="pt-8 mt-8 border-t border-desert-accent/20 flex flex-col items-center gap-4">
                                {user ? (
                                    <>
                                        <div className="mb-2">
                                            <p className="text-[10px] text-desert-accent uppercase tracking-widest font-bold">Sesión activa:</p>
                                            <p className="text-white text-sm font-montserrat truncate">{user.email}</p>
                                        </div>
                                        {isAdmin && (
                                            <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="px-8 py-3 bg-desert-accent text-white font-cinzel uppercase tracking-widest text-sm font-bold w-full max-w-xs">
                                                Admin Panel
                                            </Link>
                                        )}
                                        <button
                                            onClick={handleLogout}
                                            className="px-8 py-3 border border-red-500/50 text-red-400 font-montserrat uppercase tracking-widest text-xs font-bold w-full max-w-xs hover:bg-red-500/10 transition-colors"
                                        >
                                            Cerrar Sesión
                                        </button>
                                    </>
                                ) : (
                                    <Link
                                        to="/login"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="px-8 py-4 bg-desert-primary text-white font-cinzel uppercase tracking-widest text-lg font-bold shadow-lg w-full max-w-xs hover:bg-desert-accent transition-colors"
                                    >
                                        Iniciar Sesión
                                    </Link>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav >
    );
};

export default Navbar;
