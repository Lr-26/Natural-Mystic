import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1518063319789-7217e6706b04?q=80&w=1920&auto=format&fit=crop"
                    alt="Bosque Místico y Niebla"
                    className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-desert-bg" /> {/* Deep mystic gradient */}
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <h2 className="text-parchment font-montserrat tracking-[0.3em] uppercase text-sm md:text-base mb-4 font-bold">
                        Rituales de Bienestar
                    </h2>
                    <h1 className="text-4xl xs:text-5xl tablet:text-6xl desktop:text-7xl font-cinzel text-white mb-6 tracking-widest font-bold drop-shadow-lg">
                        Natural Mystic
                    </h1>
                    <p className="font-montserrat text-base tablet:text-lg laptop:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Alquimia sagrada para tu piel. Jabones artesanales creados con intención, botánicos puros y la magia del desierto.
                    </p>

                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block px-12 py-4 bg-transparent text-parchment font-cinzel tracking-widest border border-parchment hover:bg-parchment/20 transition-all uppercase shadow-lg cursor-pointer backdrop-blur-sm"
                        href="#productos"
                    >
                        Descubrir Colección
                    </motion.a>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-parchment/70 z-10"
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-[10px] uppercase tracking-widest font-montserrat">Explorar</span>
                    <div className="w-[1px] h-16 bg-gradient-to-b from-parchment to-transparent"></div>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
