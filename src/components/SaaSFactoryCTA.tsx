import { motion } from 'framer-motion';
import { Rocket, ShieldCheck, Globe, Zap, Cpu, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const SaaSFactoryCTA = () => {
    const features = [
        {
            icon: <Globe className="text-desert-accent" size={24} />,
            title: "Despliegue Global",
            desc: "Tu tienda lista en minutos, accesible desde cualquier rincón del mundo."
        },
        {
            icon: <ShieldCheck className="text-desert-accent" size={24} />,
            title: "Marca Segura",
            desc: "Protección total para tus fórmulas, clientes y transacciones sagradas."
        },
        {
            icon: <Zap className="text-desert-accent" size={24} />,
            title: "Velocidad Alquímica",
            desc: "Optimizado para una experiencia fluida, tan suave como nuestros óleos."
        }
    ];

    return (
        <section className="relative py-24 bg-desert-bg overflow-hidden border-y border-desert-accent/10">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-desert-accent rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-desert-primary rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Left Content - The Pitch */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-desert-accent/10 border border-desert-accent/20 mb-6 font-montserrat text-[10px] uppercase tracking-[0.3em] font-bold text-desert-accent">
                            <Cpu size={12} />
                            Alquimia Digital
                        </div>
                        <h2 className="text-4xl md:text-6xl font-cinzel text-white mb-6 tracking-widest leading-tight font-bold">
                            Tu Marca bajo nuestra <span className="text-desert-accent">Magia</span>
                        </h2>
                        <p className="text-parchment/70 font-montserrat text-lg mb-10 leading-relaxed max-w-xl italic">
                            ¿Tienes una marca de cosmética natural? Nuestra tecnología transforma tu visión artesanal en un imperio digital escalable. Tecnología de vanguardia ritualizada para el éxito.
                        </p>

                        <div className="space-y-6 mb-10">
                            {features.map((f, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 * i }}
                                    className="flex gap-4 p-4 rounded-sm hover:bg-white/5 transition-colors border border-transparent hover:border-desert-accent/10 group"
                                >
                                    <div className="shrink-0 p-3 bg-white/5 rounded-sm border border-desert-accent/20 group-hover:bg-desert-accent/20 transition-all duration-500">
                                        {f.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-cinzel text-parchment font-bold mb-1 tracking-wider">{f.title}</h4>
                                        <p className="text-white/50 text-xs font-montserrat leading-relaxed">{f.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <Link
                            to="/factory"
                            className="inline-flex items-center gap-3 px-10 py-4 bg-desert-accent text-desert-primary font-cinzel font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-desert-primary transition-all shadow-[0_0_20px_rgba(212,140,157,0.3)] group"
                        >
                            Descubrir Alquimia
                            <Rocket size={18} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Link>
                    </motion.div>

                    {/* Right Content - Visual Mockup */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative z-10 glass p-4 rounded-sm border border-white/10 shadow-2xl skew-x-[-2deg] rotate-[-2deg] hover:rotate-0 hover:skew-x-0 transition-all duration-700 bg-black/40">
                            {/* Fake Dashboard Header */}
                            <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                                <div className="flex gap-2">
                                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                                    <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                                    <div className="w-2 h-2 rounded-full bg-green-500/50" />
                                </div>
                                <div className="text-[10px] text-desert-accent font-cinzel tracking-widest uppercase opacity-70">Mystic Dashboard v2.0</div>
                            </div>
                            
                            {/* Fake Content Layers */}
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="h-32 bg-desert-primary/20 rounded-sm border border-desert-accent/10 flex flex-col items-center justify-center gap-2">
                                        <Sparkles className="text-desert-accent/40" size={24} />
                                        <div className="w-16 h-1 bg-desert-accent/20 rounded-full" />
                                    </div>
                                    <div className="h-32 bg-desert-primary/20 rounded-sm border border-desert-accent/10 p-4">
                                        <div className="w-full h-2 bg-desert-accent/30 rounded-full mb-4" />
                                        <div className="space-y-2">
                                            <div className="w-3/4 h-1 bg-white/10 rounded-full" />
                                            <div className="w-1/2 h-1 bg-white/10 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                                <div className="h-40 bg-gradient-to-br from-desert-primary/30 to-black p-6 rounded-sm border border-desert-accent/20 flex flex-col justify-end">
                                    <div className="flex items-end gap-1 mb-4">
                                        {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ height: 0 }}
                                                whileInView={{ height: `${h}%` }}
                                                viewport={{ once: true }}
                                                className="flex-1 bg-desert-accent/40 rounded-t-sm"
                                            />
                                        ))}
                                    </div>
                                    <div className="text-[10px] text-white/40 font-montserrat uppercase tracking-widest">Analytics de Alquimia</div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Decoration */}
                        <div className="absolute -top-10 -right-10 w-24 h-24 bg-desert-accent/20 rounded-full blur-2xl border border-desert-accent/10 animate-pulse" />
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-desert-primary/20 rounded-full blur-2xl border border-desert-primary/10" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default SaaSFactoryCTA;
