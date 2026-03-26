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

                    {/* Desktop/Mobile Right Actions */}
                    <div className="flex items-center gap-4">
                        {/* Desktop Links (Hidden on small mobile) */}
                        <div className="hidden lg:flex items-center space-x-8 mr-6">
                            <a href="/#historia" className="nav-link-mystic text-[10px] tracking-[0.25em] uppercase font-bold text-white/90">Historia</a>
                            <a href="/#productos" className="nav-link-mystic text-[10px] tracking-[0.25em] uppercase font-bold text-white/90">Colección</a>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={onOpenCart}
                            className="relative p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all border border-white/20"
                        >
                            <ShoppingCart size={20} />
                            {itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-desert-accent text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                                    {itemCount}
                                </span>
                            )}
                        </motion.button>
                        
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)} 
                            className="p-2.5 bg-desert-accent text-desert-primary rounded-full hover:bg-white transition-colors shadow-lg"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Side Sidebar (Drawer) - Full Height */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md"
                        />

                        {/* Drawer Content */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 z-[70] w-80 sm:w-96 bg-[#0c0908] border-l border-desert-accent/30 flex flex-col shadow-[0_0_100px_rgba(0,0,0,0.9)]"
                        >
                            <div className="p-8 flex justify-between items-center border-b border-white/5">
                                <h2 className="font-cinzel text-xl text-gradient-mystic tracking-widest uppercase font-bold">Menú Sagrado</h2>
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="p-2 text-desert-accent hover:text-white"
                                >
                                    <X size={28} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto px-10 py-12 space-y-10">
                                <a href="#historia" onClick={() => setIsMenuOpen(false)} className="block text-2xl font-cinzel text-white hover:text-desert-accent transition-all tracking-[0.2em] uppercase border-b border-white/2">Historia</a>
                                <a href="#ingredientes" onClick={() => setIsMenuOpen(false)} className="block text-2xl font-cinzel text-white hover:text-desert-accent transition-all tracking-[0.2em] uppercase border-b border-white/2">Esencias</a>
                                <a href="#productos" onClick={() => setIsMenuOpen(false)} className="block text-2xl font-cinzel text-white hover:text-desert-accent transition-all tracking-[0.2em] uppercase border-b border-white/2">Colección</a>
                                
                                <Link to="/factory" onClick={() => setIsMenuOpen(false)} className="block group">
                                    <div className="p-4 bg-desert-accent/5 border border-desert-accent/20 rounded-sm group-hover:bg-desert-accent/10 transition-colors">
                                        <span className="text-xl font-cinzel text-desert-accent uppercase tracking-[0.2em] font-black italic">Alquimia Tech</span>
                                        <p className="text-[10px] text-white/40 mt-1 uppercase tracking-widest font-bold">Transformación Digital</p>
                                    </div>
                                </Link>

                                <a href="#contacto" onClick={() => setIsMenuOpen(false)} className="block text-2xl font-cinzel text-white hover:text-desert-accent transition-all tracking-[0.2em] uppercase border-b border-white/2">Contacto</a>
                            </div>

                            <div className="p-10 border-t border-white/5 bg-black/40 space-y-6">
                                {user ? (
                                    <>
                                        <div className="flex items-center gap-4 p-4 border border-white/5 rounded-sm bg-white/5">
                                            <div className="w-10 h-10 rounded-full bg-desert-accent/20 flex items-center justify-center text-desert-accent font-cinzel font-bold">
                                                {user.email?.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[9px] text-desert-accent uppercase tracking-[0.3em] font-bold">Identidad Mística</span>
                                                <span className="text-white/80 text-xs font-montserrat truncate max-w-[150px]">{user.email}</span>
                                            </div>
                                        </div>
                                        {isAdmin && (
                                            <Link 
                                                to="/admin" 
                                                onClick={() => setIsMenuOpen(false)} 
                                                className="block px-8 py-4 bg-desert-accent text-desert-primary text-center font-cinzel uppercase tracking-[0.2em] text-xs font-black shadow-glow-sm"
                                            >
                                                Panel de Control
                                            </Link>
                                        )}
                                        <button
                                            onClick={handleLogout}
                                            className="w-full py-2 text-[10px] tracking-[0.4em] uppercase font-bold text-red-500/60 hover:text-red-500 transition-colors text-center"
                                        >
                                            Cerrar Círculo
                                        </button>
                                    </>
                                ) : (
                                    <a
                                        href="#contacto"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block px-10 py-5 bg-white text-desert-primary font-cinzel uppercase tracking-[0.3em] text-sm font-black text-center shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                                    >
                                        Iniciar Alquimia
                                    </a>
                                )}
                                <div className="text-[9px] text-white/20 text-center uppercase tracking-[0.5em] pt-4">© 2026 Natural Mystic</div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.nav >
    );
};

export default Navbar;
