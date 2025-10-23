"use client"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useAuth } from "./hooks/useAuth"
import { useState, useEffect } from "react"
import Login from "./pages/Login"
import Products from "./pages/Products"
import Home from "./pages/Dashboard"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import Account from "./pages/Account"
import { Toaster } from "sonner"
import Layout from "./components/layout/appCuontuner"
import CategoriesOverview from "./components/App-components/categorys/Categoryscard"
import CategoryProducts from "./components/App-components/categorys/CategoryPrudect"
import FavoritesPage from "./pages/fevPage"
import ProductById from "./pages/productById"
import SearchPage from "./pages/search"
import OrderSuccess from "./pages/OrderSuccess"
import Orders from "./pages/Orders"
import LoadingScreen from "./components/LoadingScreen"

function App() {
  const { isAuthenticated, loading } = useAuth()
  const [appLoading, setAppLoading] = useState(true)

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Wait for auth to finish loading
        if (!loading) {
          // Add a minimum loading time for smooth UX
          await new Promise((resolve) => setTimeout(resolve, 1500))
          setAppLoading(false)
        }
      } catch (error) {
        console.error("[v0] Error initializing app:", error)
        setAppLoading(false)
      }
    }

    initializeApp()
  }, [loading])

  if (loading || appLoading) {
    return <LoadingScreen />
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-black flex flex-col">
        <Layout>
          <main className="flex-1 pb-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductById />} />
              <Route path="/categories" element={<CategoriesOverview />} />
              <Route path="/products/categories/:categoryId" element={<CategoryProducts />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/order-success/:orderId" element={<OrderSuccess />} />
              <Route path="/account" element={<Account />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
        </Layout>

        <Toaster position="top-center" richColors expand={false} duration={3000} closeButton />
      </div>
    </Router>
  )
}

export default App
