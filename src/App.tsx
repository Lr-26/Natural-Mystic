import { useState, useEffect } from 'react'
import { CartProvider } from './context/CartContext'
import { AdminProvider, useAdmin } from './context/AdminContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import CartDrawer from './components/CartDrawer'
import Footer from './components/Footer'
import AdminDashboard from './components/AdminDashboard'
import Login from './components/Login'
import { Droplets, Flower, Sparkles, Send, Leaf, Heart, Moon, Quote, Star } from 'lucide-react'

function AppContent() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isAdminMode, setIsAdminMode] = useState(window.location.hash === '#admin')
  const { isAdmin } = useAdmin()

  useEffect(() => {
    const handleHashChange = () => {
      setIsAdminMode(window.location.hash === '#admin')
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  if (isAdminMode) {
    return isAdmin ? <AdminDashboard /> : <Login />
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar onOpenCart={() => setIsCartOpen(true)} />

      <main className="bg-desert-bg">
        <Hero />
        {/* ... Rest of the sections ... */}
        <div id="historia" className="py-16 md:py-24 border-y border-desert-accent/20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-white font-montserrat tracking-[0.2em] uppercase text-xs mb-3 italic font-bold">Tradición & Alma</h2>
            <h3 className="text-3xl md:text-4xl font-cinzel text-white mb-8 tracking-widest uppercase font-bold">Nuestra Historia</h3>
            <p className="font-montserrat text-lg text-white/90 leading-relaxed font-normal">
              "En Natural Mystic, creemos que el cuidado personal es un ritual sagrado. Cada jabón es vertido a mano durante las fases lunares óptimas, utilizando botánicos recolectados de forma sostenible y aceites esenciales puros."
            </p>
          </div>
        </div>

        <div className="py-12 md:py-16 bg-desert-primary/5 border-b border-desert-accent/10">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="flex items-center gap-4 bg-white p-6 rounded-sm shadow-sm border border-desert-accent/10">
              <div className="p-3 bg-desert-bg rounded-full text-white">
                <Leaf size={24} />
              </div>
              <div>
                <h4 className="font-cinzel font-bold text-desert-primary">100% Vegano</h4>
                <p className="font-montserrat text-xs text-desert-text">Sin ingredientes animales.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white p-6 rounded-sm shadow-sm border border-desert-accent/10">
              <div className="p-3 bg-desert-bg rounded-full text-white">
                <Heart size={24} />
              </div>
              <div>
                <h4 className="font-cinzel font-bold text-desert-primary">Cruelty Free</h4>
                <p className="font-montserrat text-xs text-desert-text">Respeto total por la vida.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white p-6 rounded-sm shadow-sm border border-desert-accent/10">
              <div className="p-3 bg-desert-bg rounded-full text-white">
                <Moon size={24} />
              </div>
              <div>
                <h4 className="font-cinzel font-bold text-desert-primary">Hecho a Mano</h4>
                <p className="font-montserrat text-xs text-desert-text">Ritualizado bajo la luna.</p>
              </div>
            </div>
          </div>
        </div>

        <div id="ingredientes" className="py-12 md:py-20 bg-white border-b border-desert-accent/10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-desert-accent font-montserrat tracking-[0.3em] uppercase text-xs font-bold">Puro & Potente</span>
              <h2 className="text-3xl md:text-4xl font-cinzel text-desert-primary mt-2 mb-4 font-bold">Ingredientes Maestros</h2>
              <div className="w-24 h-0.5 bg-desert-accent/30 mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-desert-bg/10 flex items-center justify-center mb-6">
                  <Droplets className="text-desert-primary" size={32} />
                </div>
                <h3 className="font-cinzel text-xl text-desert-primary mb-3 font-bold">Aceites Esenciales</h3>
                <p className="font-montserrat text-desert-text leading-relaxed">Extractos puros prensados en frío que conservan toda la vitalidad de la planta.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-desert-bg/10 flex items-center justify-center mb-6">
                  <Flower className="text-desert-primary" size={32} />
                </div>
                <h3 className="font-cinzel text-xl text-desert-primary mb-3 font-bold">Botánicos Silvestres</h3>
                <p className="font-montserrat text-desert-text leading-relaxed">Hierbas y flores recolectadas de forma ética en los valles sagrados.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-desert-bg/10 flex items-center justify-center mb-6">
                  <Sparkles className="text-desert-primary" size={32} />
                </div>
                <h3 className="font-cinzel text-xl text-desert-primary mb-3 font-bold">Minerales de Tierra</h3>
                <p className="font-montserrat text-desert-text leading-relaxed">Arcillas y sales ricas en nutrientes para purificar y remineralizar tu piel.</p>
              </div>
            </div>
          </div>
        </div>

        <ProductGrid />

        <div id="testimonios" className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <Sparkles className="text-desert-accent mx-auto mb-4" size={20} />
              <h2 className="text-3xl md:text-4xl font-cinzel text-desert-primary mb-4 font-bold">Voces de la Tribu</h2>
              <p className="font-montserrat text-desert-text italic">Lo que dicen nuestras almas afines</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Valentina S.", text: "La energía de estos jabones es real. No es solo lavarse, es limpiarse el aura. El de lavanda cambió mis noches.", product: "Jabón de Lavanda" },
                { name: "Camila R.", text: "Nunca había sentido mi piel tan nutrida. Se nota el amor y la alquimia en cada detalle del empaque.", product: "Kit Alquimia" },
                { name: "Sofía M.", text: "El aroma es transportador. Me siento en medio del desierto florecido cada vez que lo uso. Magia pura.", product: "Esencia del Bosque" }
              ].map((idx) => (
                <div key={idx.name} className="bg-desert-primary p-8 rounded-sm shadow-xl relative group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-desert-accent/20">
                  <Quote className="absolute top-6 left-6 text-white/10" size={40} />
                  <div className="flex gap-1 mb-4 justify-center text-desert-accent">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <p className="font-montserrat text-white/90 text-center mb-6 relative z-10 italic leading-relaxed">"{idx.text}"</p>
                  <div className="text-center">
                    <h4 className="font-cinzel font-bold text-white tracking-wider">{idx.name}</h4>
                    <span className="text-xs font-montserrat text-desert-accent uppercase tracking-widest">{idx.product}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="py-16 md:py-24 bg-desert-primary text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pattern-dots"></div>
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <Sparkles className="text-desert-accent mx-auto mb-6" size={24} />
            <h2 className="text-3xl md:text-5xl font-cinzel mb-6 font-bold">Únete al Ritual</h2>
            <p className="font-montserrat text-lg opacity-90 mb-10 max-w-2xl mx-auto">
              Recibe secretos de alquimia, acceso anticipado a nuevas lunas y rituales exclusivos.
            </p>
            <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-1 px-6 py-4 bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-desert-accent transition-colors font-montserrat"
              />
              <button className="px-8 py-4 bg-desert-accent text-white font-cinzel font-bold tracking-widest uppercase hover:bg-white hover:text-desert-primary transition-all flex items-center justify-center gap-2">
                <span>Suscribirse</span>
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
}

function App() {
  return (
    <AdminProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AdminProvider>
  )
}

export default App
