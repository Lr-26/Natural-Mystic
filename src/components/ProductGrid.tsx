import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { getProducts, Product } from '../services/product.service';

const ProductGrid = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="py-24 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-desert-accent mx-auto"></div>
                <p className="mt-4 font-cinzel text-desert-primary tracking-widest uppercase text-sm">Cargando Colección...</p>
            </div>
        );
    }

    return (
        <section id="productos" className="py-16 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-desert-secondary font-montserrat tracking-[0.2em] uppercase text-xs mb-3 italic font-bold">
                        Arte & Naturaleza
                    </h2>
                    <h3 className="text-3xl md:text-5xl font-cinzel text-desert-primary border-b border-desert-accent inline-block pb-4 tracking-widest font-bold">
                        Colección Exclusiva
                    </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {products.map((product) => (
                        <ProductCard key={product._id || product.id} product={product as any} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductGrid;
