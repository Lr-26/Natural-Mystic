

import { Droplets, Flower, Sparkles, Leaf, Heart, Moon, Quote, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import ProductGrid from '../components/ProductGrid'
import SaaSFactoryCTA from '../components/SaaSFactoryCTA'

const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

import { useState } from 'react';
import TestimonialModal from '../components/TestimonialModal';

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [testimonials, setTestimonials] = useState([
        { name: "Valentina S.", text: "La energía de estos jabones es real. No es solo lavarse, es limpiarse el aura. El de lavanda cambió mis noches.", product: "Jabón de Lavanda" },
        { name: "Camila R.", text: "Nunca había sentido mi piel tan nutrida. Se nota el amor y la alquimia en cada detalle del empaque.", product: "Kit Alquimia" },
        { name: "Sofía M.", text: "El aroma es transportador. Me siento en medio del desierto florecido cada vez que lo uso. Magia pura.", product: "Esencia del Bosque" }
    ]);

    const handleAddTestimonial = (newTestimonial: any) => {
        setTestimonials([newTestimonial, ...testimonials]);
    };

    return (
        <main className="bg-desert-bg overflow-hidden">
            <Hero />

            {/* HISTORIA - Background: Mystic Smoke/Incense */}
            <motion.div
                id="historia"
                className="relative py-16 md:py-32 border-y border-desert-accent/20"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
            >
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1519638399535-1b036603ac77?q=80&w=1920&auto=format&fit=crop"
                        alt="Altar Místico con Sahumo"
                        className="w-full h-full object-cover opacity-70"
                    />
                    <div className="absolute inset-0 bg-black/60" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-4 text-center">
                    <h2 className="text-desert-accent font-montserrat tracking-[0.2em] uppercase text-[10px] md:text-xs mb-3 italic font-bold">Tradición & Alma</h2>
                    <h3 className="text-2xl md:text-5xl font-cinzel text-white mb-6 md:mb-8 tracking-widest uppercase font-bold drop-shadow-lg leading-tight">Nuestra Historia</h3>
                    <p className="font-montserrat text-lg md:text-xl text-parchment/90 leading-relaxed font-normal">
                        "En Natural Mystic, creemos que el cuidado personal es un ritual sagrado. Cada jabón es vertido a mano durante las fases lunares óptimas, utilizando botánicos recolectados de forma sostenible y aceites esenciales puros."
                    </p>
                </div>
            </motion.div>

            {/* ICONS - Overlay on dark texture */}
            <motion.div
                className="py-12 md:py-16 bg-gradient-to-r from-desert-primary via-black to-desert-primary border-b border-desert-accent/10 relative"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
            >
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}></div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {[
                        { icon: <Leaf size={24} />, title: "100% Vegano", desc: "Sin ingredientes animales." },
                        { icon: <Heart size={24} />, title: "Cruelty Free", desc: "Respeto total por la vida." },
                        { icon: <Moon size={24} />, title: "Hecho a Mano", desc: "Ritualizado bajo la luna." }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            className="flex items-center gap-4 bg-white/5 backdrop-blur-sm p-6 rounded-sm border border-desert-accent/20 hover:bg-white/10 transition-colors duration-300"
                        >
                            <div className="p-3 bg-desert-accent/20 rounded-full text-desert-accent">
                                {item.icon}
                            </div>
                            <div>
                                <h4 className="font-cinzel font-bold text-parchment">{item.title}</h4>
                                <p className="font-montserrat text-xs text-white/60">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* INGREDIENTES - Background: Foggy Forest/Nature */}
            <motion.div
                id="ingredientes"
                className="relative py-20 md:py-28 border-b border-desert-accent/10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
            >
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1920&auto=format&fit=crop"
                        alt="Bosque Místico y Niebla"
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-black/70" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <motion.div variants={fadeInUp} className="text-center mb-12 md:mb-16">
                        <span className="text-desert-accent font-montserrat tracking-[0.3em] uppercase text-[10px] md:text-xs font-bold">Puro & Potente</span>
                        <h2 className="text-2xl md:text-5xl font-cinzel text-white mt-2 mb-4 font-bold drop-shadow-md">Ingredientes Maestros</h2>
                        <div className="w-16 md:w-24 h-0.5 bg-desert-accent/50 mx-auto"></div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
                        <motion.div variants={fadeInUp} className="flex flex-col items-center group">
                            <div className="w-20 h-20 rounded-full bg-desert-accent/10 flex items-center justify-center mb-6 border border-desert-accent/30 group-hover:bg-desert-accent/20 transition-all duration-500">
                                <Droplets className="text-desert-accent transform group-hover:scale-110 transition-transform duration-500" size={36} />
                            </div>
                            <h3 className="font-cinzel text-xl text-parchment mb-3 font-bold">Aceites Esenciales</h3>
                            <p className="font-montserrat text-white/70 leading-relaxed">Extractos puros prensados en frío que conservan toda la vitalidad de la planta.</p>
                        </motion.div>
                        <motion.div variants={fadeInUp} className="flex flex-col items-center group">
                            <div className="w-20 h-20 rounded-full bg-desert-accent/10 flex items-center justify-center mb-6 border border-desert-accent/30 group-hover:bg-desert-accent/20 transition-all duration-500">
                                <Flower className="text-desert-accent transform group-hover:rotate-12 transition-transform duration-500" size={36} />
                            </div>
                            <h3 className="font-cinzel text-xl text-parchment mb-3 font-bold">Botánicos Silvestres</h3>
                            <p className="font-montserrat text-white/70 leading-relaxed">Hierbas y flores recolectadas de forma ética en los valles sagrados.</p>
                        </motion.div>
                        <motion.div variants={fadeInUp} className="flex flex-col items-center group">
                            <div className="w-20 h-20 rounded-full bg-desert-accent/10 flex items-center justify-center mb-6 border border-desert-accent/30 group-hover:bg-desert-accent/20 transition-all duration-500">
                                <Sparkles className="text-desert-accent transform group-hover:scale-110 transition-transform duration-500" size={36} />
                            </div>
                            <h3 className="font-cinzel text-xl text-parchment mb-3 font-bold">Minerales de Tierra</h3>
                            <p className="font-montserrat text-white/70 leading-relaxed">Arcillas y sales ricas en nutrientes para purificar y remineralizar tu piel.</p>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            <div id="productos" className="bg-desert-text/5 overflow-hidden">
                <ProductGrid />
            </div>

            <SaaSFactoryCTA />


            {/* TESTIMONIOS - Background: Starry Night */}
            <motion.div
                id="testimonios"
                className="relative py-20 md:py-32 bg-black"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
            >
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1920&auto=format&fit=crop"
                        alt="Cielo Estrellado"
                        className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <motion.div variants={fadeInUp} className="text-center mb-12 md:mb-16">
                        <Sparkles className="text-desert-accent mx-auto mb-4" size={24} />
                        <h2 className="text-2xl md:text-5xl font-cinzel text-white mb-4 font-bold drop-shadow-lg">Voces de la Tribu</h2>
                        <p className="font-montserrat text-parchment/60 italic tracking-widest uppercase text-[10px]">Lo que dicen nuestras almas afines</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {testimonials.map((testimonial, idx) => (
                            <motion.div
                                key={idx}
                                variants={fadeInUp}
                                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                                className="bg-white/5 backdrop-blur-md p-8 rounded-sm shadow-xl relative group border border-desert-accent/10 hover:bg-white/10 transition-all duration-300"
                            >
                                <Quote className="absolute top-6 left-6 text-desert-accent/20" size={40} />
                                <div className="flex gap-1 mb-4 justify-center text-desert-accent">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                                </div>
                                <p className="font-montserrat text-white/90 text-center mb-6 relative z-10 italic leading-relaxed text-sm">"{testimonial.text}"</p>
                                <div className="text-center">
                                    <h4 className="font-cinzel font-bold text-parchment tracking-wider">{testimonial.name}</h4>
                                    <span className="text-[10px] font-montserrat text-desert-accent uppercase tracking-widest">{testimonial.product || "Cliente Místico"}</span>
                                </div>
                            </motion.div>
                        ))
                        }
                    </div>

                    <motion.div variants={fadeInUp} className="text-center">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="inline-flex items-center gap-2 px-8 py-3 border border-desert-accent/30 rounded-sm text-parchment font-cinzel hover:bg-desert-accent/10 hover:border-desert-accent transition-all duration-300 uppercase tracking-widest text-sm"
                        >
                            <Sparkles size={16} /> Compartir mi Experiencia
                        </button>
                    </motion.div>
                </div>
            </motion.div>

            <TestimonialModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAddTestimonial} />
        </main>
    )
}

export default Home
