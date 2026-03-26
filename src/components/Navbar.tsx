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
                        <a href="/#historia" className="nav-link-mystic text-[10px] tracking-[0.25em] uppercase font-bold text-parchment/70 hover:text-white transition-colors">Historia</a>
                        <a href="/#ingredientes" className="nav-link-mystic text-[10px] tracking-[0.25em] uppercase font-bold text-parchment/70 hover:text-white transition-colors">Esencias</a>
                        <a href="/#productos" className="nav-link-mystic text-[10px] tracking-[0.25em] uppercase font-bold text-parchment/70 hover:text-white transition-colors">Colección</a>
                        
                        <Link to="/factory" className="relative group px-6 py-2 overflow-hidden rounded-full">
                            <div className="absolute inset-0 bg-gradient-to-r from-desert-accent/20 to-desert-primary/20 group-hover:from-desert-accent/40 group-hover:to-desert-primary/40 transition-all duration-500"></div>
                            <span className="relative z-10 text-[10px] tracking-[0.3em] uppercase font-black text-white group-hover:text-white transition-colors">Alquimia</span>
                            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-desert-accent to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                        </Link>

                        <a href="/#contacto" className="nav-link-mystic text-[10px] tracking-[0.25em] uppercase font-bold text-parchment/70 hover:text-white transition-colors">Contacto</a>

                        <div className="h-4 w-[1px] bg-white/10 mx-2"></div>

                        {user ? (
                            <div className="flex items-center gap-6">
                                {isAdmin ? (
                                    <Link to="/admin" className="relative group">
                                        <span className="text-[10px] tracking-[0.2em] font-cinzel text-white uppercase group-hover:text-desert-accent transition-colors">Panel Admin</span>
                                        <div className="absolute -bottom-1 left-0 w-full h-[1px] bg-desert-accent transform scale-x-0 group-hover:scale-x-100 transition-transform"></div>
                                    </Link>
                                ) : (
                                    <button
                                        onClick={handleLogout}
                                        className="text-[10px] tracking-widest uppercase font-bold text-parchment/60 hover:text-white transition-colors"
                                    >
                                        Salir
                                    </button>
                                )}
                            </div>
                        ) : (
                            <a
                                href="#contacto"
                                className="group flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-bold text-white/80 hover:text-white transition-all"
                            >
                                <div className="w-1.5 h-1.5 rounded-full bg-desert-accent animate-pulse"></div>
                                Entrar
                            </a>
                        )}

                        <motion.button
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={onOpenCart}
                            className="relative p-2.5 bg-white/5 hover:bg-white/10 rounded-full text-desert-accent hover:text-white transition-all border border-white/5"
                        >
                            <ShoppingCart size={18} />
                            {itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-desert-accent text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-glow-sm">
                                    {itemCount}
                                </span>
                            )}
                        </motion.button>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="md:hidden flex items-center gap-4">
                        <button 
                            onClick={onOpenCart} 
                            className="relative p-2 text-white/80 hover:text-white"
                        >
                            <ShoppingCart size={22} />
                            {itemCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 bg-desert-accent text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                    {itemCount}
                                </span>
                            )}
                        </button>
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)} 
                            className="p-2 text-white/80 hover:text-white transform active:scale-90 transition-transform"
                        >
                            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar (Drawer) */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden"
                        />

                        {/* Drawer Content */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 z-[70] w-72 xs:w-80 bg-desert-bg/95 backdrop-blur-3xl border-l border-desert-accent/20 md:hidden flex flex-col shadow-2xl"
                        >
                            <div className="p-6 flex justify-between items-center border-b border-white/5">
                                <div className="flex flex-col">
                                    <span className="font-cinzel text-xs font-bold tracking-widest text-white">Natural Mystic</span>
                                </div>
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="p-2 text-desert-accent hover:text-white transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto px-8 py-10 space-y-8">
                                <a href="#historia" onClick={() => setIsMenuOpen(false)} className="block text-xl font-cinzel text-parchment hover:text-desert-accent transition-colors tracking-widest uppercase border-b border-white/5 pb-2">Historia</a>
                                <a href="#ingredientes" onClick={() => setIsMenuOpen(false)} className="block text-xl font-cinzel text-parchment hover:text-desert-accent transition-colors tracking-widest uppercase border-b border-white/5 pb-2">Esencias</a>
                                <a href="#productos" onClick={() => setIsMenuOpen(false)} className="block text-xl font-cinzel text-parchment hover:text-desert-accent transition-colors tracking-widest uppercase border-b border-white/5 pb-2">Colección</a>
                                
                                <Link to="/factory" onClick={() => setIsMenuOpen(false)} className="block">
                                    <span className="text-lg font-cinzel text-desert-accent hover:text-white transition-colors uppercase tracking-[0.2em] font-bold italic">Alquimia Tech</span>
                                </Link>

                                <a href="#contacto" onClick={() => setIsMenuOpen(false)} className="block text-xl font-cinzel text-parchment hover:text-desert-accent transition-colors tracking-widest uppercase border-b border-white/5 pb-2">Contacto</a>
                            </div>

                            <div className="p-8 border-t border-white/5 space-y-4">
                                {user ? (
                                    <>
                                        <div>
                                            <p className="text-[10px] text-desert-accent uppercase tracking-[0.3em] font-bold mb-1">Usuario</p>
                                            <p className="text-white/60 text-[10px] font-montserrat truncate">{user.email}</p>
                                        </div>
                                        {isAdmin && (
                                            <Link 
                                                to="/admin" 
                                                onClick={() => setIsMenuOpen(false)} 
                                                className="block px-6 py-3 bg-desert-accent/20 border border-desert-accent/30 text-white text-center font-cinzel uppercase tracking-[0.2em] text-[10px] font-bold rounded-sm"
                                            >
                                                Panel Admin
                                            </Link>
                                        )}
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-[10px] tracking-[0.3em] uppercase font-bold text-red-400 opacity-60 text-left"
                                        >
                                            Salir
                                        </button>
                                    </>
                                ) : (
                                    <a
                                        href="#contacto"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block px-10 py-4 bg-white text-desert-primary font-cinzel uppercase tracking-[0.3em] text-[10px] font-black text-center rounded-sm"
                                    >
                                        Entrar
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.nav >
    );
};

export default Navbar;
