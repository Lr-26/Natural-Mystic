import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { 
    Layout, 
    Database, 
    Shield, 
    BarChart, 
    Layers, 
    Zap, 
    ArrowRight, 
    Cpu,
    Globe,
    Lock
} from 'lucide-react';

const SaaSFactoryPage = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    const solutions = [
        {
            icon: <Layout className="text-white" />,
            title: "Storefronts Alquímicos",
            desc: "Diseño premium, minimalista y responsivo diseñado específicamente para la cosmética artesanal."
        },
        {
            icon: <Database className="text-white" />,
            title: "Gestión de Elixires",
            desc: "Control total de inventario, lotes y proveedores en una interfaz fluida e intuitiva."
        },
        {
            icon: <BarChart className="text-white" />,
            title: "Visiones del Mercado",
            desc: "Analítica en tiempo real para entender el comportamiento de tus almas afines (clientes)."
        },
        {
            icon: <Shield className="text-white" />,
            title: "Alquimia Segura",
            desc: "Infraestructura robusta con seguridad de grado bancario para transacciones de paz mental."
        }
    ];

    const steps = [
        { num: "01", title: "Ritual de Registro", desc: "Configura tu cuenta y define la esencia de tu marca." },
        { num: "02", title: "Carga tus Fórmulas", desc: "Sube tus productos con sus propiedades y beneficios únicos." },
        { num: "03", title: "Manifestación Digital", desc: "Lanza tu tienda al mundo con un solo clic mágico." }
    ];

    return (
        <div ref={containerRef} className="bg-desert-bg text-white min-h-screen pt-20 overflow-hidden">
            {/* HERO SECTION */}
            <section className="relative h-screen flex flex-col items-center justify-center text-center p-4">
                <motion.div style={{ y: y1, opacity }} className="relative z-10 max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-desert-accent/20 mb-8 animate-bounce">
                        <Cpu size={14} className="text-desert-accent" />
                        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-parchment">Natural Mystic Solutions</span>
                    </div>
                    
                    <h1 className="text-5xl md:text-8xl font-cinzel font-bold tracking-widest leading-none mb-8 text-white drop-shadow-2xl">
                        Tech <span className="text-desert-accent">Alchemy</span>
                    </h1>
                    
                    <p className="text-xl md:text-2xl font-montserrat italic text-parchment/60 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Escalamos la mística de tu marca artesanal con tecnología de vanguardia y diseño de lujo.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <button className="px-12 py-5 bg-desert-accent text-desert-primary font-cinzel font-bold uppercase tracking-[0.3em] hover:bg-white hover:border-black transition-all shadow-xl hover:shadow-desert-accent/20">
                            Empezar Ahora
                        </button>
                        <button className="px-12 py-5 border border-desert-accent/30 glass font-cinzel text-parchment font-bold uppercase tracking-[0.3em] hover:bg-desert-accent/10 transition-all">
                            Saber Más
                        </button>
                    </div>
                </motion.div>

                {/* ANIMATED BACKGROUND PARTICLES */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] opacity-20 bg-gradient-to-tr from-desert-primary via-transparent to-desert-accent blur-[150px] animate-spin-slow" />
                </div>
            </section>

            {/* SOLUTIONS GRID */}
            <section className="py-24 bg-white text-desert-bg rounded-t-[50px] md:rounded-t-[100px] relative z-20">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="text-center mb-24">
                        <h2 className="text-desert-secondary font-montserrat tracking-[0.3em] uppercase text-sm mb-4 font-bold">Capacidades del Sistema</h2>
                        <h3 className="text-4xl md:text-6xl font-cinzel text-desert-primary font-bold tracking-widest leading-tight">Expertos en <br /> Alquimia Digital</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {solutions.map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group p-8 rounded-sm bg-desert-bg/5 border border-desert-primary/10 hover:bg-desert-primary/95 transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-desert-primary/30"
                            >
                                <div className="p-4 bg-desert-primary rounded-sm mb-8 w-fit group-hover:bg-desert-accent transition-colors duration-500">
                                    {s.icon}
                                </div>
                                <h4 className="text-2xl font-cinzel font-bold text-desert-primary group-hover:text-white mb-4 tracking-wider">{s.title}</h4>
                                <p className="text-desert-bg/70 group-hover:text-parchment/70 font-montserrat leading-relaxed">{s.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* THE PROCESS */}
            <section className="py-24 bg-desert-primary text-white border-y border-desert-accent/20">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        {steps.map((st, i) => (
                            <div key={i} className="relative text-center">
                                <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-9xl font-cinzel font-bold opacity-10 text-desert-accent pointer-events-none">{st.num}</span>
                                <h5 className="text-2xl font-cinzel tracking-[0.2em] mb-4 font-bold relative z-10">{st.title}</h5>
                                <p className="text-parchment/60 font-montserrat italics font-light leading-relaxed">{st.desc}</p>
                                {i < 2 && (
                                    <div className="hidden md:block absolute top-10 -right-8 text-desert-accent/30">
                                        <ArrowRight size={40} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-32 relative text-center">
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <h2 className="text-4xl md:text-6xl font-cinzel mb-8 tracking-widest leading-tight font-bold">¿Listo para escalar <br /> tu <span className="text-desert-accent">Magia?</span></h2>
                    <p className="text-parchment/60 mb-12 italic tracking-widest text-lg font-montserrat">Únete a la nueva era del e-commerce artesanal.</p>
                    <button className="px-16 py-6 bg-white text-desert-primary font-cinzel font-bold uppercase tracking-[0.4em] hover:bg-desert-accent hover:text-white transition-all shadow-2xl">
                        Iniciar Alquimia
                    </button>
                </div>
            </section>

            {/* MODAL / FOOTER DECORATION */}
            <div className="flex justify-center py-12 border-t border-desert-accent/10">
                <div className="flex gap-8 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
                    <Globe size={32} />
                    <Layers size={32} />
                    <Zap size={32} />
                    <Lock size={32} />
                </div>
            </div>
        </div>
    );
};

export default SaaSFactoryPage;
