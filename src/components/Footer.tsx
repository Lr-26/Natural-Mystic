import { Sparkles, Instagram, Twitter, Facebook, Mail, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer id="contacto" className="bg-desert-primary text-white py-12 md:py-20 border-t border-desert-accent/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-3 mb-6">
                            <img
                                src="https://scontent.cdninstagram.com/v/t51.2885-19/377993713_674497404589115_9065751379864944276_n.jpg?stp=dst-jpg_s100x100_tt6&_nc_cat=101&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy43MzQuQzMifQ%3D%3D&_nc_ohc=y6EG9ZrFHwIQ7kNvwGo5GcF&_nc_oc=AdkcNR33-cY1d4zieC_quO8EAZny77mG1eCqLWDfiJAoeXeJOx-CA4KGkAhWPirXBtc&_nc_zt=24&_nc_ht=scontent.cdninstagram.com&oh=00_AfrOf8M8a19U9UDX6F_5Am9Sj5yWp2QbLubAN3ArhdISHw&oe=69800415"
                                alt="Natural Mystic Logo"
                                className="w-12 h-12 rounded-full border border-desert-accent/50"
                            />
                            <span className="font-cinzel text-lg font-bold tracking-widest uppercase text-white flex items-center gap-2">
                                Natural Mystic <Sparkles className="text-white" size={16} />
                            </span>
                        </div>
                        <p className="text-white/80 font-montserrat text-sm leading-relaxed font-normal">
                            Conectando la naturaleza con tu bienestar espiritual a través de creaciones artesanales hechas con alma y conciencia.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-cinzel text-white mb-6 uppercase tracking-widest text-sm font-bold">Explorar</h4>
                        <ul className="space-y-4 font-montserrat text-sm text-white/80 font-medium">
                            <li><a href="#" className="hover:text-desert-accent transition-colors">Colección Luna</a></li>
                            <li><a href="#" className="hover:text-desert-accent transition-colors">Jabones Orgánicos</a></li>
                            <li><a href="#" className="hover:text-desert-accent transition-colors">Inciensos Sagrados</a></li>
                            <li><a href="#" className="hover:text-desert-accent transition-colors">Sets de Regalo</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-cinzel text-white mb-6 uppercase tracking-widest text-sm font-bold">Atención</h4>
                        <ul className="space-y-4 font-montserrat text-sm text-white/80 font-medium">
                            <li><a href="#" className="hover:text-desert-accent transition-colors">Envíos y Entregas</a></li>
                            <li><a href="#" className="hover:text-desert-accent transition-colors">Políticas Místicas</a></li>
                            <li><a href="#" className="hover:text-desert-accent transition-colors">FAQ</a></li>
                            <li><a href="#" className="hover:text-desert-accent transition-colors">Mayoristas</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-cinzel text-white mb-6 uppercase tracking-widest text-sm font-bold">Unirse al Círculo</h4>
                        <div className="flex gap-4 mb-8">
                            <a href="#" className="p-2 border border-desert-accent/20 hover:border-white transition-colors rounded-full bg-white/10 hover:bg-white/20">
                                <Instagram size={18} className="text-white" />
                            </a>
                            <a href="#" className="p-2 border border-desert-accent/20 hover:border-white transition-colors rounded-full bg-white/10 hover:bg-white/20">
                                <Phone size={18} className="text-white" />
                            </a>
                            <a href="#" className="p-2 border border-desert-accent/20 hover:border-white transition-colors rounded-full bg-white/10 hover:bg-white/20">
                                <Facebook size={18} className="text-white" />
                            </a>
                            <a href="#" className="p-2 border border-desert-accent/20 hover:border-white transition-colors rounded-full bg-white/10 hover:bg-white/20">
                                <Twitter size={18} className="text-white" />
                            </a>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail size={18} className="text-white" />
                            <span className="text-sm text-white/80 font-medium">hola@naturalmystic.com</span>
                        </div>
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t border-desert-accent/10 text-center">
                    <p className="text-[10px] text-parchment/40 uppercase tracking-[0.4em] font-montserrat font-bold">
                        © 2026 Natural Mystic • Hecho con Magia & Conciencia
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
