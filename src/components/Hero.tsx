import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-desert-bg">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/50 z-10"></div>
                <img
                    src="/images/hero.jpg"
                    alt="Cosmética Premium Hero"
                    className="w-full h-full object-cover text-white"
                />
            </div>

            <div className="relative z-20 text-center px-4 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <h2 className="!text-white font-montserrat tracking-[0.3em] text-sm uppercase mb-4 italic font-bold text-shadow-sm">
                        Renacimiento • Natural • Ritual
                    </h2>
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-cinzel !text-white mb-6 tracking-widest leading-tight drop-shadow-lg font-bold">
                        Alquimia <br /> <span className="!text-white">Del Desierto</span>
                    </h1>
                    <p className="font-montserrat !text-white text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-medium drop-shadow-md">
                        Descubre el poder de la naturaleza ancestral en cada gota.
                    </p>

                    <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                        <motion.a
                            href="#productos"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-10 py-4 bg-desert-primary text-white font-cinzel tracking-widest border border-desert-accent hover:bg-desert-primary/80 transition-all uppercase shadow-lg hover:shadow-desert-accent/20 cursor-pointer block text-center"
                        >
                            Ver Colección
                        </motion.a>
                        <motion.a
                            href="#historia"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-10 py-4 bg-transparent text-parchment font-cinzel tracking-widest border border-parchment hover:bg-parchment/10 transition-all uppercase shadow-lg cursor-pointer block text-center"
                        >
                            Descubrir Más
                        </motion.a>
                    </div>
                </motion.div>
            </div>

            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-parchment/50"
            >
                <div className="w-[1px] h-20 bg-gradient-to-b from-cosmetic-gold to-transparent"></div>
            </motion.div>
        </section>
    );
};

export default Hero;
