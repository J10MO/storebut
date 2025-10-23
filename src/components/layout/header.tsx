"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "../ui/button"
import { Menu, User, ChevronDown, Moon, Sun, X, ShoppingBag, Phone, LogOut, Search } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { useTheme } from "../../stores/themeStore"
import Aura from "../../assets/Aura.PNG"
const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate("/")
    setIsMobileMenuOpen(false)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav
      className={`bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-md sticky top-0 z-50 border-b border-amber-100 dark:border-gray-700 transition-colors duration-300 ${theme === "dark" ? "dark:bg-gray-800 dark:text-white" : ""}`}
    >
      {/* Main Navbar */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <img src={Aura} alt="Aura Logo" className="w-11 h-11 object-contain" />
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 dark:from-amber-400 dark:to-amber-600 bg-clip-text text-transparent leading-5">
                Aura
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Skincare & Beauty</span>
            </div>
          </Link>

          {/* Spacer */}
          <div className="flex-1"></div>

          {/* Navigation Items */}
          <div className="flex items-center gap-2">
            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow-500 group-hover:rotate-180 transition-transform duration-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700 group-hover:rotate-180 transition-transform duration-500" />
              )}
            </Button>

            {/* Search Button */}
            <Link to="/search">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors group"
              >
                <Search className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              </Button>
            </Link>

            {/* User Account Dropdown */}
            {isAuthenticated ? (
              <div className="relative group hidden sm:block">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 h-10 px-3 hover:bg-amber-50 dark:hover:bg-amber-900/30 transition-colors rounded-full"
                >
                  <User className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    حسابي
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 group-hover:rotate-180 transition-all duration-200" />
                </Button>

                {/* Dropdown Menu */}
                <div className="absolute left-0 mt-2 w-52 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-amber-100 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
                  <div className="py-2">
                    <Link
                      to="/account"
                      className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-amber-900/30 hover:text-amber-600 dark:hover:text-amber-400 transition-colors rounded-lg mx-2 font-medium"
                    >
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>الملف الشخصي</span>
                      </div>
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-amber-900/30 hover:text-amber-600 dark:hover:text-amber-400 transition-colors rounded-lg mx-2 font-medium"
                    >
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4" />
                        <span>طلباتي</span>
                      </div>
                    </Link>
                    <div className="border-t border-amber-100 dark:border-gray-700 mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="block w-full text-right px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors font-medium rounded-lg mx-2"
                      >
                        <div className="flex items-center gap-2">
                          <LogOut className="w-4 h-4" />
                          <span>تسجيل الخروج</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login" className="hidden sm:block">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 h-10 px-4 hover:bg-amber-50 dark:hover:bg-amber-900/30 transition-colors rounded-full"
                >
                  <User className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">تسجيل الدخول</span>
                </Button>
              </Link>
            )}

            {/* Contact Us - Always Visible */}
            <Link to="/contact" className="hidden sm:block">
              <Button
                variant="ghost"
                className="flex items-center gap-2 h-10 px-4 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors rounded-full"
              >
                <Phone className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">اتصل بنا</span>
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-amber-50 dark:hover:bg-amber-900/30 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-amber-100 dark:border-gray-700 shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="space-y-2">
              {/* Search */}
              <Link
                to="/search"
                className="flex items-center gap-3 p-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition-colors"
                onClick={closeMobileMenu}
              >
                <Search className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                <span className="font-medium">البحث</span>
              </Link>

              {/* User Section */}
              {isAuthenticated ? (
                <>
                  <Link
                    to="/account"
                    className="flex items-center gap-3 p-3 text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-amber-900/30 rounded-xl transition-colors"
                    onClick={closeMobileMenu}
                  >
                    <User className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    <span className="font-medium">الملف الشخصي</span>
                  </Link>
                  <Link
                    to="/orders"
                    className="flex items-center gap-3 p-3 text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-amber-900/30 rounded-xl transition-colors"
                    onClick={closeMobileMenu}
                  >
                    <ShoppingBag className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    <span className="font-medium">طلباتي</span>
                  </Link>
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-3 p-3 text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-amber-900/30 rounded-xl transition-colors"
                  onClick={closeMobileMenu}
                >
                  <User className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  <span className="font-medium">تسجيل الدخول</span>
                </Link>
              )}

              {/* Contact Us */}
              <Link
                to="/contact"
                className="flex items-center gap-3 p-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition-colors"
                onClick={closeMobileMenu}
              >
                <Phone className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                <span className="font-medium">اتصل بنا</span>
              </Link>

              {/* Logout for authenticated users */}
              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 p-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-colors w-full text-right"
                >
                  <LogOut className="w-5 h-5 text-red-600 dark:text-red-400" />
                  <span className="font-medium">تسجيل الخروج</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
