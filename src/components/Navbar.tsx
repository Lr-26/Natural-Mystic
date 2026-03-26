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
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const sections = ['historia', 'ingredientes', 'productos', 'testimonios'];
        
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const isMovingDown = currentScrollY > lastScrollY;
            
            // 1. Determine if we are exactly at a section start (+/- 100px)
            const isAtSection = sections.some(id => {
                const el = document.getElementById(id);
                if (!el) return false;
                const top = el.offsetTop - 100;
                return currentScrollY >= top && currentScrollY <= top + 200;
            });

            // 2. Core Visibility Logic:
            // - Show at top (Hero)
            // - Show if we are exactly at a section start
            // - Show if scrolling UP
            // - Hide if scrolling DOWN and not at a section
            if (currentScrollY < 100 || isAtSection || !isMovingDown || isMenuOpen) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }

            setIsScrolled(currentScrollY > 50);
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY, isMenuOpen]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
    };

    return (
        <motion.nav 
            initial={{ y: 0, x: 0 }}
            animate={{ 
                y: isVisible ? 0 : -110,
            }}
            transition={{ 
                type: 'spring', 
                damping: 20, 
                stiffness: 150,
                mass: 0.8
            }}
            className={`fixed top-0 z-50 nav-pill ${isScrolled ? 'nav-pill-scrolled' : 'left-0 right-0 w-full bg-desert-bg/80 backdrop-blur-md border-b border-desert-accent/10 h-20 shadow-xl'}`}
        >
            {/* Spotlight Glow Effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-full opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(212, 140, 157, 0.15), transparent 40%)`,
                }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                <div className="flex justify-between items-center w-full">
                    <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 group">
                        <motion.div 
                            whileHover={{ rotate: 15, scale: 1.1 }}
                            className="relative"
                        >
                            <img
                                src="/images/logo.png"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                }}
                                alt="Natural Mystic Logo"
                                className="w-10 h-10 object-contain drop-shadow-[0_0_10px_rgba(212,140,157,0.5)]"
                            />
                            <div className="hidden absolute inset-0 flex items-center justify-center bg-desert-primary/10 rounded-full">
                                <Sparkles className="text-desert-accent" size={18} />
                            </div>

                            <div className="absolute -top-1 -right-1 bg-desert-accent rounded-full p-0.5 shadow-lg">
                                <Sparkles className="text-desert-primary" size={8} />
                            </div>
                        </motion.div>
                        <div className="flex flex-col">
                            <span className="font-cinzel text-lg font-bold tracking-[0.2em] uppercase leading-none text-white text-gradient-mystic">
                                Natural
                            </span>
                            <span className="font-montserrat text-[9px] tracking-[0.5em] uppercase text-desert-accent">
                                Mystic
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-10">
                        <a href="/#historia" className="hover-underline-animation text-xs tracking-[0.2em] uppercase font-bold text-parchment/80 hover:text-white transition-colors">Historia</a>
                        <a href="/#ingredientes" className="hover-underline-animation text-xs tracking-[0.2em] uppercase font-bold text-parchment/80 hover:text-white transition-colors">Ingredientes</a>
                        <a href="/#productos" className="hover-underline-animation text-xs tracking-[0.2em] uppercase font-bold text-parchment/80 hover:text-white transition-colors">Colección</a>
                        <Link to="/factory" className="text-xs tracking-[0.2em] uppercase font-black text-desert-accent hover:text-white transition-all transform hover:scale-110">Alquimia</Link>
                        <a href="/#contacto" className="hover-underline-animation text-xs tracking-[0.2em] uppercase font-bold text-parchment/80 hover:text-white transition-colors">Contacto</a>

                        <div className="h-6 w-[1px] bg-desert-accent/20 mx-4"></div>

                        {user ? (
                            <div className="flex items-center gap-6">
                                {isAdmin ? (
                                    <>
                                        <Link to="/admin" className="px-5 py-2 glass text-white font-cinzel text-[10px] tracking-widest uppercase hover:bg-desert-accent hover:text-white transition-all rounded-full border-desert-accent/40 shadow-glow">Panel</Link>
                                        <div className="flex flex-col items-end opacity-80">
                                            <span className="text-[9px] uppercase tracking-widest font-bold text-desert-accent">Goddess</span>
                                            <span className="text-[10px] font-montserrat truncate max-w-[100px] text-white/70">{user.email?.split('@')[0]}</span>
                                        </div>
                                    </>
                                ) : (
                                    <button
                                        onClick={handleLogout}
                                        className="text-[10px] tracking-widest uppercase font-bold text-parchment hover:text-desert-accent transition-colors"
                                    >
                                        Salir
                                    </button>
                                )}
                            </div>
                        ) : (
                            <a
                                href="#contacto"
                                className="px-6 py-2 glass text-white font-montserrat text-[10px] tracking-widest uppercase font-bold hover:bg-desert-accent/20 transition-all rounded-full border-desert-accent/30"
                            >
                                Entrar
                            </a>
                        )}

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={onOpenCart}
                            className="relative p-2 text-desert-accent hover:text-white transition-colors"
                        >
                            <ShoppingCart size={20} />
                            {itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-white text-desert-primary text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-lg">
                                    {itemCount}
                                </span>
                            )}
                        </motion.button>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="md:hidden flex items-center gap-4">
                        <button onClick={onOpenCart} className="relative p-2 text-parchment">
                            <ShoppingCart size={24} />
                            {itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-desert-accent text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                    {itemCount}
                                </span>
                            )}
                        </button>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-parchment">
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-50 bg-desert-bg/98 backdrop-blur-2xl md:hidden flex flex-col items-center justify-center"
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
                            <Link to="/factory" onClick={() => setIsMenuOpen(false)} className="block text-2xl font-cinzel text-desert-accent hover:text-white transition-colors uppercase tracking-widest font-bold">Tech Alchemy</Link>
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
                                    <a
                                        href="#contacto"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="px-8 py-4 bg-desert-primary text-white font-cinzel uppercase tracking-widest text-lg font-bold shadow-lg w-full max-w-xs hover:bg-desert-accent transition-colors block text-center"
                                    >
                                        Entrar
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav >
    );
};

export default Navbar;
