import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';

const Hero = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: any[] = [];
        const particleCount = 800; // Aumentado a 800 para mayor inmersión

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 3 + 1.5, // Más grandes: entre 1.5 y 4.5
                    speed: Math.random() * 0.8 + 0.3, 
                    opacity: Math.random() * 0.4 + 0.2,
                    influence: Math.random() * 15 + 5
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(p => {
                // Movimiento constante hacia arriba
                p.y -= p.speed;
                
                // Pequeño desplazamiento horizontal aleatorio para realismo (efecto ascuas)
                p.x += Math.sin(p.y / 50) * 0.5;

                // Reposicionar cuando salen de la pantalla
                if (p.y < -10) {
                    p.y = canvas.height + 10;
                    p.x = Math.random() * canvas.width;
                }

                ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
                ctx.shadowBlur = 4;
                ctx.shadowColor = "rgba(255, 255, 255, 0.4)";
                ctx.beginPath();
                // Dibujamos sin el offset del mouse para que solo suban
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        draw();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <section 
            ref={sectionRef} 
            className="relative h-screen flex flex-col justify-center items-center overflow-hidden bg-desert-bg"
        >
            {/* Parallax Background */}
            <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0 scale-110">
                <img
                    src="https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&q=80&w=2500"
                    alt="Mystical Desert"
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-desert-bg" />
            </motion.div>

            {/* High-Performance Canvas for Particles */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-[1] pointer-events-none"
            />

            {/* Content Container */}
            <motion.div style={{ y: textY }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                >
                    <div className="w-20 h-[2px] bg-desert-accent mx-auto mb-8 bg-gradient-to-r from-transparent via-desert-accent to-transparent" />
                    
                    <h2 className="text-desert-accent font-montserrat tracking-[0.5em] uppercase text-xs mb-6 font-bold opacity-80">
                        Alquimia & Esencia Sagrada
                    </h2>
                    
                    <h1 className="text-6xl md:text-8xl font-cinzel text-white mb-8 tracking-[0.05em] font-bold leading-tight text-gradient-mystic shadow-2xl">
                        Natural <br/>Mystic
                    </h1>
                    
                    <p className="font-montserrat text-sm md:text-base text-parchment/60 mb-12 max-w-2xl mx-auto italic tracking-wider">
                        "Rituales sagrados fusionados con la magia del desierto."
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <a
                            className="px-12 py-4 bg-desert-accent text-white font-cinzel tracking-[0.2em] font-bold hover:bg-white hover:text-desert-primary transition-all uppercase rounded-sm shadow-glow-accent"
                            href="#productos"
                        >
                            Ver Colección
                        </a>
                    </div>
                </motion.div>
            </motion.div>

            {/* Inset Shadow Overlay for Depth */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.9)] z-[5]" />
        </section>
    );
};

export default Hero;

