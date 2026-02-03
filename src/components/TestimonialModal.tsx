import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Sparkles, Send } from 'lucide-react';

interface TestimonialModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (testimonial: any) => void;
}

const TestimonialModal = ({ isOpen, onClose, onSubmit }: TestimonialModalProps) => {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (rating === 0 || !name.trim() || !message.trim()) {
            setError('Por favor invoca todos los campos y las estrellas místicas para enviar.');
            return;
        }

        setError('');

        // Simulate submission
        setTimeout(() => {
            setSubmitted(true);
            setTimeout(() => {
                onSubmit({
                    name,
                    text: message,
                    product: 'Nueva Experiencia',
                    rating
                });
                onClose();
                setSubmitted(false);
                setRating(0);
                setName('');
                setMessage('');
                setError('');
            }, 3000);
        }, 1000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        {/* Modal Container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-desert-bg relative w-full max-w-lg rounded-sm border border-parchment/20 shadow-2xl overflow-hidden"
                        >
                            {/* Mystic Decorations */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-parchment/50 to-transparent"></div>
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-desert-accent/10 rounded-full blur-3xl"></div>
                            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-desert-primary/20 rounded-full blur-3xl"></div>

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-parchment/60 hover:text-parchment transition-colors"
                            >
                                <X size={24} />
                            </button>

                            {/* Content */}
                            <div className="p-8 md:p-10">
                                {!submitted ? (
                                    <>
                                        <div className="text-center mb-8">
                                            <Sparkles className="w-8 h-8 text-desert-accent mx-auto mb-3" />
                                            <h3 className="font-cinzel text-2xl text-parchment font-bold tracking-wider">Tu Voz en la Tribu</h3>
                                            <p className="font-montserrat text-white/70 text-sm mt-2">Comparte tu experiencia alquímica con nosotros.</p>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            {/* Rating */}
                                            <div className="flex flex-col items-center gap-2">
                                                <label className="font-montserrat text-xs uppercase tracking-widest text-parchment/60">Tu Valoración</label>
                                                <div className="flex gap-2">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <button
                                                            key={star}
                                                            type="button"
                                                            onMouseEnter={() => setHoveredRating(star)}
                                                            onMouseLeave={() => setHoveredRating(0)}
                                                            onClick={() => setRating(star)}
                                                            className="transition-transform hover:scale-110 focus:outline-none"
                                                        >
                                                            <Star
                                                                size={28}
                                                                className={`${star <= (hoveredRating || rating)
                                                                    ? 'fill-desert-accent text-desert-accent'
                                                                    : 'text-parchment/20'
                                                                    } transition-colors duration-200`}
                                                            />
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Name Input */}
                                            <div className="space-y-2">
                                                <label className="font-montserrat text-xs uppercase tracking-widest text-parchment/60 ml-1">Tu Nombre</label>
                                                <input
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className="w-full bg-white border border-desert-primary/20 rounded-sm px-4 py-3 !text-black font-montserrat focus:outline-none focus:border-desert-primary focus:bg-white transition-all placeholder:text-gray-400"
                                                    placeholder="Ej: Ana M."
                                                />
                                            </div>

                                            {/* Message Input */}
                                            <div className="space-y-2">
                                                <label className="font-montserrat text-xs uppercase tracking-widest text-parchment/60 ml-1">Tu Experiencia</label>
                                                <textarea
                                                    value={message}
                                                    onChange={(e) => setMessage(e.target.value)}
                                                    rows={4}
                                                    className="w-full bg-white border border-desert-primary/20 rounded-sm px-4 py-3 !text-black font-montserrat focus:outline-none focus:border-desert-primary focus:bg-white transition-all placeholder:text-gray-400 resize-none"
                                                    placeholder="¿Cómo te sentiste al usar nuestros elixires..."
                                                />
                                            </div>

                                            {/* Error Message */}
                                            {error && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="text-red-400 text-xs font-montserrat text-center"
                                                >
                                                    {error}
                                                </motion.p>
                                            )}

                                            {/* Submit Button */}
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                type="submit"
                                                className="w-full bg-desert-accent text-desert-bg font-cinzel font-bold py-4 rounded-sm hover:bg-white transition-colors flex items-center justify-center gap-2 uppercase tracking-widest"
                                            >
                                                <Send size={18} /> Enviar Relato
                                            </motion.button>
                                        </form>
                                    </>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-10"
                                    >
                                        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Sparkles className="w-10 h-10 text-green-400" />
                                        </div>
                                        <h3 className="font-cinzel text-2xl text-parchment font-bold mb-2">¡Mensaje Recibido!</h3>
                                        <p className="font-montserrat text-white/80">Tu voz ha sido escuchada y se unirá a la tribu pronto.</p>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default TestimonialModal;
