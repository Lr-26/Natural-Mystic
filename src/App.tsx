import { useState, type ReactNode } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner';
import { CartProvider } from './context/CartContext'
import { AdminProvider, useAdmin } from './context/AdminContext'
import Navbar from './components/Navbar'
import CartDrawer from './components/CartDrawer'
import Footer from './components/Footer'
import AdminDashboard from './components/AdminDashboard'
import Checkout from './components/Checkout'
import Home from './pages/Home'
import SaaSFactoryPage from './pages/SaaSFactoryPage'

// Protected Route Component
const ProtectedAdminRoute = ({ children }: { children: ReactNode }) => {
  const { isAdmin } = useAdmin();
  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Protected Checkout Route
const ProtectedCheckoutRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAdmin();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Login Route - redirects to home if accessed directly
const LoginRoute = () => {
  return <Navigate to="/" replace />;
};

function AppContent() {
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <Navbar onOpenCart={() => setIsCartOpen(true)} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/factory" element={<SaaSFactoryPage />} />
        <Route
          path="/checkout"
          element={
            <ProtectedCheckoutRoute>
              <Checkout />
            </ProtectedCheckoutRoute>
          }
        />
        <Route path="/login" element={<LoginRoute />} />
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Toaster position="top-center" richColors />
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
