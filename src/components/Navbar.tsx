import { useState, useEffect, useRef } from 'react';
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
    const lastScrollY = useRef(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const sections = ['historia', 'ingredientes', 'productos', 'testimonios'];
        
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const isMovingDown = currentScrollY > lastScrollY.current;
            
            const isAtSection = sections.some(id => {
                const el = document.getElementById(id);
                if (!el) return false;
                const top = el.offsetTop - 100;
                return currentScrollY >= top && currentScrollY <= top + 200;
            });

            if (currentScrollY < 100 || isAtSection || !isMovingDown || isMenuOpen) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }

            setIsScrolled(currentScrollY > 50);
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMenuOpen]);

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
                            <a href="/#ingredientes" className="nav-link-mystic text-[10px] tracking-[0.25em] uppercase font-bold text-white/90">Esencias</a>
                            <a href="/#productos" className="nav-link-mystic text-[10px] tracking-[0.25em] uppercase font-bold text-white/90">Colección</a>
                            <Link to="/factory" className="nav-link-mystic text-[10px] tracking-[0.25em] uppercase font-bold text-desert-accent italic">Alquimia Tech</Link>
                            <a href="/#testimonios" className="nav-link-mystic text-[10px] tracking-[0.25em] uppercase font-bold text-white/90">Testimonios</a>
                            <a href="/#contacto" className="nav-link-mystic text-[10px] tracking-[0.25em] uppercase font-bold text-white/90">Contacto</a>
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
                            className="lg:hidden p-2.5 bg-desert-accent text-desert-primary rounded-full hover:bg-white transition-colors shadow-lg"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown Menu (Full Screen Centered) */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: '100vh' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl md:hidden overflow-hidden"
                    >
                        {/* Mystic Background Elements */}
                        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                            <div className="absolute top-[20%] left-[10%] w-64 h-64 bg-desert-accent rounded-full blur-[100px] animate-pulse" />
                            <div className="absolute bottom-[20%] right-[10%] w-64 h-64 bg-desert-primary rounded-full blur-[100px] animate-pulse delay-700" />
                        </div>

                        <div className="relative z-10 h-full flex flex-col pt-24 px-8">
                            {/* Close Button Inside Menu */}
                            <div className="absolute top-6 right-8">
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all border border-white/10"
                                >
                                    <X size={28} />
                                </button>
                            </div>

                            {/* Staggered Navigation Links */}
                            <div className="flex-1 flex flex-col justify-center items-center gap-10">
                                {[
                                    { name: 'Historia', href: '#historia' },
                                    { name: 'Esencias', href: '#ingredientes' },
                                    { name: 'Colección', href: '#productos' },
                                    { name: 'Alquimia Tech', href: '/factory', special: true },
                                    { name: 'Contacto', href: '#contacto' }
                                ].map((link, index) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                                    >
                                        {link.href.startsWith('/') ? (
                                            <Link
                                                to={link.href}
                                                onClick={() => setIsMenuOpen(false)}
                                                className={`text-2xl font-cinzel tracking-[0.4em] uppercase text-center transition-all ${link.special ? 'text-desert-accent font-bold italic' : 'text-white/80 hover:text-white'}`}
                                            >
                                                {link.name}
                                            </Link>
                                        ) : (
                                            <a
                                                href={link.href}
                                                onClick={() => setIsMenuOpen(false)}
                                                className="text-2xl font-cinzel tracking-[0.4em] uppercase text-white/80 hover:text-white transition-all text-center block"
                                            >
                                                {link.name}
                                            </a>
                                        )}
                                    </motion.div>
                                ))}
                            </div>

                            {/* Auth Actions Bottom */}
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="pb-20 border-t border-white/10 pt-10"
                            >
                                {user ? (
                                    <div className="flex flex-col items-center gap-6">
                                        <div className="text-center">
                                            <p className="text-[10px] text-white/30 uppercase tracking-[0.5em] mb-2 italic">Tribu Natural Mystic</p>
                                            <p className="text-white/60 text-xs font-montserrat">{user.email}</p>
                                        </div>
                                        <div className="flex gap-4 w-full justify-center">
                                            {isAdmin && (
                                                <Link
                                                    to="/admin"
                                                    onClick={() => setIsMenuOpen(false)}
                                                    className="px-8 py-3 bg-white text-black font-cinzel uppercase tracking-[0.2em] text-[10px] font-black rounded-sm shadow-xl"
                                                >
                                                    Admin
                                                </Link>
                                            )}
                                            <button
                                                onClick={handleLogout}
                                                className="px-8 py-3 bg-red-900/30 text-red-500 font-cinzel uppercase tracking-[0.2em] text-[10px] font-bold rounded-sm border border-red-500/20"
                                            >
                                                Cerrar
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex justify-center">
                                        <a
                                            href="#contacto"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="px-16 py-5 bg-desert-accent text-desert-primary font-cinzel uppercase tracking-[0.4em] text-xs font-black text-center rounded-sm shadow-[0_0_30px_rgba(212,140,157,0.3)] transition-transform hover:scale-105"
                                        >
                                            Acceder
                                        </a>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav >
    );
};

export default Navbar;
