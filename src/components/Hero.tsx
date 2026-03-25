import { motion, useScroll, useTransform, useMotionValue, useSpring, MotionValue } from 'framer-motion';
import { useRef, useState, useEffect, memo } from 'react';

// Specialized Particle Component for High Performance
const Particle = memo(({ p, springX, springY }: { p: any, springX: MotionValue<number>, springY: MotionValue<number> }) => {
    // We calculate the individual offset using influence
    const x = useTransform(springX, (val) => val * p.influence);
    const y = useTransform(springY, (val) => val * p.influence);

    return (
        <motion.div
            className="particle"
            style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                x,
                y
            }}
            animate={{
                y: [0, -1200],
                opacity: [0, 1, 1, 0],
            }}
            transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: -p.delay,
                ease: "linear",
            }}
        />
    );
});

const Hero = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    // Performance-optimized Mouse Tracking (Single source of truth)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { damping: 50, stiffness: 100 });
    const springY = useSpring(mouseY, { damping: 50, stiffness: 100 });

    const handleMouseMove = (event: React.MouseEvent) => {
        const { clientX, clientY } = event;
        const moveX = (clientX - window.innerWidth / 2) / 12;
        const moveY = (clientY - window.innerHeight / 2) / 12;
        mouseX.set(moveX);
        mouseY.set(moveY);
    };

    const [particles, setParticles] = useState<any[]>([]);
    
    useEffect(() => {
        const p = Array.from({ length: 350 }, (_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            duration: 15 + Math.random() * 25,
            delay: Math.random() * 20,
            size: 0.5 + Math.random() * 3,
            influence: 0.3 + Math.random() * 1.7
        }));
        setParticles(p);
    }, []);

    return (
        <section 
            ref={ref} 
            onMouseMove={handleMouseMove}
            className="relative h-screen flex flex-col justify-center items-center overflow-hidden bg-desert-bg"
        >
            {/* Background Image with Parallax */}
            <motion.div 
                style={{ y: backgroundY }}
                className="absolute inset-0 z-0 scale-110"
            >
                <img
                    src="https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&q=80&w=2500"
                    alt="Mystical Desert Sunset"
                    className="w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-desert-bg" />
            </motion.div>

            {/* Optimized Magnetic Particles System */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden h-full w-full">
                {particles.map((p) => (
                    <Particle key={p.id} p={p} springX={springX} springY={springY} />
                ))}
            </div>

            {/* Content */}
            <motion.div 
                style={{ y: textY }}
                className="relative z-10 text-center px-6 max-w-5xl mx-auto"
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                >
                    <div className="w-20 h-[2px] bg-desert-accent mx-auto mb-8 bg-gradient-to-r from-transparent via-desert-accent to-transparent" />
                    
                    <h2 className="text-desert-accent font-montserrat tracking-[0.5em] uppercase text-xs mb-6 font-bold opacity-80">
                        Alquimia & Esencia Sagrada
                    </h2>
                    
                    <h1 className="text-6xl tablet:text-7xl laptop:text-9xl font-cinzel text-white mb-8 tracking-[0.05em] font-bold leading-none text-gradient-mystic drop-shadow-2xl">
                        Natural <br/>Mystic
                    </h1>
                    
                    <p className="font-montserrat text-sm tablet:text-base text-parchment/60 mb-12 max-w-2xl mx-auto leading-relaxed tracking-wider italic">
                        "Rituales sagrados fusionados con la magia del desierto y botánicos puros para elevar tu espíritu."
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-12 py-4 bg-desert-accent text-white font-cinzel tracking-[0.2em] font-bold hover:bg-white hover:text-desert-primary transition-all uppercase rounded-sm shadow-glow-accent"
                            href="#productos"
                        >
                            Ver Colección
                        </motion.a>
                    </div>
                </motion.div>
            </motion.div>

            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.8)] z-[5]" />
        </section>
    );
};

export default Hero;
