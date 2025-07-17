import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRouter from './routers/AppRouter.jsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Slide, ToastContainer } from 'react-toastify'
import AuthContextProvider from './auth/AuthProvider.jsx'
import { CartProvider } from './pages/cartContext.jsx'
import { WishlistProvider } from './pages/wishlistContent.jsx'
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <CartProvider>
        <WishlistProvider>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
        <ToastContainer
          position='top-center'
          autoClose={2000}
          hideProgressBar={false}
          theme='dark'
          transition={Slide} // Bounce, Slide, Zoom, Flip
        />
      </QueryClientProvider>
      </WishlistProvider>
      </CartProvider>
    </AuthContextProvider>
  </StrictMode>,
)