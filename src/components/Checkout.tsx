import React, { useState } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { CreditCard, Building2, Banknote, ShoppingBag, ArrowLeft, CheckCircle, Loader, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAdmin } from '../context/AdminContext';
import { createOrder, type CreateOrderData } from '../services/order.service';
import { createMPPreference, createPolarCheckout } from '../services/payment.service';

const Checkout = () => {
    const { cart: items, totalPrice: total, clearCart, removeFromCart } = useCart();
    const { user } = useAdmin();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        fullName: '',
        email: user?.email || '',
        phone: '',
        address: '',
        city: '',
        province: '',
        postalCode: '',
        paymentMethod: 'card' as 'card' | 'transfer' | 'cash' | 'mercadopago' | 'polar',
        notes: '',
        cardNumber: '',
        cardName: '',
        cardExpiry: '',
        cardCvc: ''
    });

    const [shippingCost, setShippingCost] = useState(0);

    // Calculate shipping cost when province changes or cart total changes
    React.useEffect(() => {
        if (total >= 50000) {
            setShippingCost(0);
        } else if (formData.province.toLowerCase().includes('capital') || formData.province.toLowerCase().includes('caba')) {
            setShippingCost(3500);
        } else if (formData.province.length > 2) {
            setShippingCost(6500);
        } else {
            setShippingCost(0); // Default/Initial state
        }
    }, [formData.province, total]);

    const finalTotal = total + shippingCost;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (step === 1) {
            setStep(2);
        } else {
            setLoading(true);
            try {
                // 1. Create the order first (to have an orderId)
                const orderData: CreateOrderData = {
                    items: items.map(item => ({
                        productId: item._id || item.id || '',
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        image: item.image
                    })),
                    total: finalTotal,
                    shippingAddress: {
                        fullName: formData.fullName,
                        phone: formData.phone,
                        address: formData.address,
                        city: formData.city,
                        province: formData.province,
                        postalCode: formData.postalCode
                    },
                    email: formData.email,
                    paymentMethod: formData.paymentMethod,
                    userId: user?._id,
                    notes: formData.notes
                };

                const order = await createOrder(orderData);
                setOrderId(order._id);

                if (formData.paymentMethod === 'mercadopago') {
                    const preference = await createMPPreference({
                        items: orderData.items as any,
                        orderId: order._id
                    });
                    
                    if (preference.init_point) {
                        window.location.href = preference.init_point;
                        return;
                    }
                }

                // 2b. If Polar, create checkout and REDIRECT
                if (formData.paymentMethod === 'polar') {
                    const checkout = await createPolarCheckout({
                        total: finalTotal,
                        orderId: order._id
                    });
                    
                    if (checkout.url) {
                        window.location.href = checkout.url;
                        return;
                    }
                }

                // 3. For other methods, just show success step
                clearCart();
                setStep(3);
            } catch (error) {
                console.error('Error processing order:', error);
                toast.error('Hubo un error al procesar tu pedido. Por favor intenta nuevamente.');
            } finally {
                setLoading(false);
            }
        }
    };

    if (items.length === 0 && step !== 3) {
        return (
            <div className="min-h-screen bg-desert-bg flex items-center justify-center p-4">
                <div className="text-center">
                    <ShoppingBag className="mx-auto text-desert-accent mb-4" size={64} />
                    <h2 className="font-cinzel text-2xl text-desert-primary mb-4">Tu carrito está vacío</h2>
                    <a href="/#productos" className="inline-block px-6 py-3 bg-desert-primary text-white font-cinzel uppercase tracking-widest hover:bg-desert-accent transition-all">
                        Ver Productos
                    </a>
                </div>
            </div>
        );
    }

    if (step === 3 && orderId) {
        return (
            <div className="min-h-screen bg-desert-bg flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-8 rounded-sm shadow-2xl max-w-2xl w-full border border-desert-accent/20"
                >
                    <div className="text-center mb-8">
                        <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
                        <h2 className="font-cinzel text-3xl text-desert-primary mb-2">¡Pedido Confirmado!</h2>
                        <p className="text-desert-text">Gracias por tu compra en Natural Mystic</p>
                    </div>

                    <div className="bg-desert-bg/20 p-6 rounded-sm mb-6">
                        <h3 className="font-cinzel text-lg text-desert-primary mb-4">Detalles del Pedido</h3>
                        <div className="space-y-2 text-sm">
                            <p><span className="font-bold">Total:</span> ${finalTotal.toFixed(2)}</p>
                            <p><span className="font-bold">Método de Pago:</span> {
                                formData.paymentMethod === 'card' ? 'Tarjeta' :
                                    formData.paymentMethod === 'mercadopago' ? 'Mercado Pago' :
                                        formData.paymentMethod === 'polar' ? 'Polar' :
                                            formData.paymentMethod === 'transfer' ? 'Transferencia' : 'Efectivo'
                            }</p>
                        </div>
                    </div>

                    {formData.paymentMethod === 'transfer' && (
                        <div className="bg-blue-50 border border-blue-200 p-6 rounded-sm mb-6">
                            <h3 className="font-cinzel text-lg text-blue-900 mb-4">Datos para Transferencia</h3>
                            <div className="space-y-2 text-sm text-blue-800">
                                <p><span className="font-bold">Banco:</span> Banco Ejemplo</p>
                                <p><span className="font-bold">Titular:</span> Natural Mystic</p>
                                <p><span className="font-bold">CBU:</span> 0000003100010000000001</p>
                                <p><span className="font-bold">Alias:</span> natural.mystic</p>
                                <p><span className="font-bold">Monto:</span> ${finalTotal.toFixed(2)}</p>
                                <p className="mt-4 text-xs">Por favor envía el comprobante a: pagos@naturalmystic.com</p>
                            </div>
                        </div>
                    )}

                    {formData.paymentMethod === 'cash' && (
                        <div className="bg-green-50 border border-green-200 p-6 rounded-sm mb-6">
                            <h3 className="font-cinzel text-lg text-green-900 mb-2">Pago Contra Entrega</h3>
                            <p className="text-sm text-green-800">Pagarás ${finalTotal.toFixed(2)} al recibir tu pedido.</p>
                        </div>
                    )}

                    {formData.paymentMethod === 'mercadopago' && (
                        <div className="bg-blue-50 border border-blue-200 p-6 rounded-sm mb-6">
                            <h3 className="font-cinzel text-lg text-blue-900 mb-2">Pago con Mercado Pago</h3>
                            <p className="text-sm text-blue-800">Tu pago ha sido procesado exitosamente.</p>
                        </div>
                    )}

                    {formData.paymentMethod === 'polar' && (
                        <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-sm mb-6">
                            <h3 className="font-cinzel text-lg text-indigo-900 mb-2">Pago con Polar</h3>
                            <p className="text-sm text-indigo-800">Tu pago ha sido procesado exitosamente mediante Polar.</p>
                        </div>
                    )}

                    <div className="flex gap-4">
                        <a href="/" className="flex-1 py-3 bg-desert-primary text-white text-center font-cinzel uppercase tracking-widest hover:bg-desert-accent transition-all">
                            Volver al Inicio
                        </a>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-desert-bg py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <button
                    onClick={() => step === 1 ? window.history.back() : setStep(1)}
                    className="flex items-center gap-2 text-desert-primary hover:text-desert-accent mb-8 font-montserrat uppercase text-sm tracking-widest"
                >
                    <ArrowLeft size={20} /> {step === 1 ? 'Volver' : 'Atrás'}
                </button>

                <div className="flex flex-col-reverse lg:grid lg:grid-cols-3 gap-8">
                    {/* Form Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-white p-6 md:p-8 rounded-sm shadow-lg border border-desert-accent/10">
                            <h2 className="font-cinzel text-xl md:text-2xl text-desert-primary mb-6">
                                {step === 1 ? 'Información de Envío' : 'Método de Pago'}
                            </h2>

                            <form onSubmit={handleSubmit}>
                                {step === 1 ? (
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-montserrat font-bold text-desert-primary uppercase tracking-widest mb-2">Nombre Completo *</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.fullName}
                                                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                                    className="w-full p-3 border border-desert-accent/20 focus:outline-none focus:border-desert-primary text-gray-900 bg-white rounded-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-montserrat font-bold text-desert-primary uppercase tracking-widest mb-2">Email *</label>
                                                <input
                                                    type="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full p-3 border border-desert-accent/20 focus:outline-none focus:border-desert-primary text-gray-900 bg-white rounded-sm"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-montserrat font-bold text-desert-primary uppercase tracking-widest mb-2">Teléfono *</label>
                                            <input
                                                type="tel"
                                                required
                                                value={formData.phone}
                                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full p-3 border border-desert-accent/20 focus:outline-none focus:border-desert-primary text-gray-900 bg-white rounded-sm"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-montserrat font-bold text-desert-primary uppercase tracking-widest mb-2">Dirección *</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.address}
                                                onChange={e => setFormData({ ...formData, address: e.target.value })}
                                                className="w-full p-3 border border-desert-accent/20 focus:outline-none focus:border-desert-primary text-gray-900 bg-white rounded-sm"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-xs font-montserrat font-bold text-desert-primary uppercase tracking-widest mb-2">Ciudad *</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.city}
                                                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                                                    className="w-full p-3 border border-desert-accent/20 focus:outline-none focus:border-desert-primary text-gray-900 bg-white rounded-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-montserrat font-bold text-desert-primary uppercase tracking-widest mb-2">Provincia *</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.province}
                                                    onChange={e => setFormData({ ...formData, province: e.target.value })}
                                                    className="w-full p-3 border border-desert-accent/20 focus:outline-none focus:border-desert-primary text-gray-900 bg-white rounded-sm"
                                                    placeholder="Ej: Buenos Aires"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-montserrat font-bold text-desert-primary uppercase tracking-widest mb-2">Código Postal *</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.postalCode}
                                                    onChange={e => setFormData({ ...formData, postalCode: e.target.value })}
                                                    className="w-full p-3 border border-desert-accent/20 focus:outline-none focus:border-desert-primary text-gray-900 bg-white rounded-sm"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-montserrat font-bold text-desert-primary uppercase tracking-widest mb-2">Notas (Opcional)</label>
                                            <textarea
                                                rows={3}
                                                value={formData.notes}
                                                onChange={e => setFormData({ ...formData, notes: e.target.value })}
                                                className="w-full p-3 border border-desert-accent/20 focus:outline-none focus:border-desert-primary text-gray-900 bg-white rounded-sm"
                                                placeholder="Instrucciones especiales de entrega..."
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {[
                                            { id: 'card', icon: CreditCard, title: 'Tarjeta de Crédito/Débito', desc: 'Pago seguro con MercadoPago' },
                                            { id: 'mercadopago', icon: CreditCard, title: 'Mercado Pago', desc: 'Te redirigiremos a Mercado Pago' },
                                            { id: 'polar', icon: ShoppingBag, title: 'Polar.sh', desc: 'Paga con Polar (Suscripciones y Productos)' },
                                            { id: 'transfer', icon: Building2, title: 'Transferencia Bancaria', desc: 'Te enviaremos los datos bancarios' },
                                            { id: 'cash', icon: Banknote, title: 'Efectivo Contra Entrega', desc: 'Paga al recibir tu pedido' }
                                        ].map(method => (
                                            <div key={method.id} className={`border-2 rounded-sm transition-all ${formData.paymentMethod === method.id
                                                ? 'border-desert-accent bg-desert-accent/5'
                                                : 'border-desert-accent/20 hover:border-desert-accent/50'
                                                }`}>
                                                <label className="flex items-center gap-4 p-4 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="paymentMethod"
                                                        value={method.id}
                                                        checked={formData.paymentMethod === method.id}
                                                        onChange={e => setFormData({ ...formData, paymentMethod: e.target.value as any })}
                                                        className="w-5 h-5 accent-desert-primary"
                                                    />
                                                    <method.icon className="text-desert-primary shrink-0" size={32} />
                                                    <div className="flex-1">
                                                        <h3 className="font-cinzel font-bold text-desert-primary text-sm md:text-base">{method.title}</h3>
                                                        <p className="text-xs text-desert-text">{method.desc}</p>
                                                    </div>
                                                </label>

                                                {method.id === 'card' && formData.paymentMethod === 'card' && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        className="px-4 pb-4 overflow-hidden"
                                                    >
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-desert-accent/10">
                                                            <div className="md:col-span-2">
                                                                <label className="block text-xs font-montserrat font-bold text-desert-primary uppercase tracking-widest mb-2">Número de Tarjeta</label>
                                                                <input
                                                                    type="text"
                                                                    placeholder="0000 0000 0000 0000"
                                                                    maxLength={19}
                                                                    value={formData.cardNumber}
                                                                    onChange={e => setFormData({ ...formData, cardNumber: e.target.value })}
                                                                    className="w-full p-3 bg-white border border-desert-accent/20 focus:outline-none focus:border-desert-primary text-gray-900 rounded-sm"
                                                                    required={formData.paymentMethod === 'card'}
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-xs font-montserrat font-bold text-desert-primary uppercase tracking-widest mb-2">Nombre en la Tarjeta</label>
                                                                <input
                                                                    type="text"
                                                                    placeholder="COMO APARECE EN LA TARJETA"
                                                                    value={formData.cardName}
                                                                    onChange={e => setFormData({ ...formData, cardName: e.target.value })}
                                                                    className="w-full p-3 bg-white border border-desert-accent/20 focus:outline-none focus:border-desert-primary text-gray-900 rounded-sm"
                                                                    required={formData.paymentMethod === 'card'}
                                                                />
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div>
                                                                    <label className="block text-xs font-montserrat font-bold text-desert-primary uppercase tracking-widest mb-2">Vencimiento</label>
                                                                    <input
                                                                        type="text"
                                                                        placeholder="MM/YY"
                                                                        maxLength={5}
                                                                        value={formData.cardExpiry}
                                                                        onChange={e => setFormData({ ...formData, cardExpiry: e.target.value })}
                                                                        className="w-full p-3 bg-white border border-desert-accent/20 focus:outline-none focus:border-desert-primary text-gray-900 rounded-sm"
                                                                        required={formData.paymentMethod === 'card'}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="block text-xs font-montserrat font-bold text-desert-primary uppercase tracking-widest mb-2">CVC</label>
                                                                    <input
                                                                        type="text"
                                                                        placeholder="123"
                                                                        maxLength={4}
                                                                        value={formData.cardCvc}
                                                                        onChange={e => setFormData({ ...formData, cardCvc: e.target.value })}
                                                                        className="w-full p-3 bg-white border border-desert-accent/20 focus:outline-none focus:border-desert-primary text-gray-900 rounded-sm"
                                                                        required={formData.paymentMethod === 'card'}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full mt-8 py-4 bg-desert-primary text-white font-cinzel font-bold tracking-widest uppercase hover:bg-desert-accent transition-all flex items-center justify-center gap-2 disabled:opacity-50 rounded-sm shadow-md"
                                >
                                    {loading ? (
                                        <><Loader className="animate-spin" size={20} /> {formData.paymentMethod === 'mercadopago' ? 'Redirigiendo a MP...' : 'Procesando...'}</>
                                    ) : step === 1 ? (
                                        'Continuar al Pago'
                                    ) : (
                                        formData.paymentMethod === 'mercadopago' ? 'Pagar con Mercado Pago' : 'Confirmar Pedido'
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-sm shadow-lg border border-desert-accent/10 lg:sticky lg:top-24">
                            <h3 className="font-cinzel text-xl text-desert-primary mb-4">Resumen del Pedido</h3>
                            <div className="space-y-4 mb-6">
                                {items.map(item => {
                                    const categoryImages: Record<string, string> = {
                                        'Velas': '/images/cat-candles.jpg',
                                        'Sahumerios': '/images/cat-incense.jpg',
                                        'Jabones': '/images/cat-soaps.jpg',
                                        'Cremas': '/images/cat-creams.jpg'
                                    };
                                    const imageSrc = (item as any).category ? (categoryImages[(item as any).category] || item.image) : item.image;

                                    return (
                                        <div key={item._id || item.id} className="flex gap-3 group relative">
                                            <img src={imageSrc} alt={item.name} className="w-16 h-16 object-cover rounded-sm" />
                                            <div className="flex-1">
                                                <h4 className="font-cinzel text-sm text-desert-primary pr-6">{item.name}</h4>
                                                <p className="text-xs text-desert-text">Cantidad: {item.quantity}</p>
                                                <p className="text-sm font-bold text-desert-accent">${(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id || item._id || '')}
                                                className="absolute top-0 right-0 text-desert-text/50 hover:text-red-500 transition-colors p-1"
                                                title="Eliminar producto"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    );
                                })}</div>
                            <div className="border-t border-desert-accent/20 pt-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-montserrat text-sm text-desert-text">Subtotal</span>
                                    <span className="font-bold">${total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center mb-4">
                                    <span className="font-montserrat text-sm text-desert-text">Envío</span>
                                    <span className={`font-bold ${shippingCost === 0 ? 'text-green-600' : ''}`}>
                                        {shippingCost === 0 ? 'GRATIS' : `$${shippingCost.toFixed(2)}`}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-lg">
                                    <span className="font-cinzel font-bold text-desert-primary">Total</span>
                                    <span className="font-cinzel font-bold text-desert-accent">${finalTotal.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
