"use client"

import { useState, useEffect } from "react"

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const authStatus = localStorage.getItem("admin-auth")
    setIsAuthenticated(authStatus === "true")
  }, [])

  const login = (name: string, password: string): boolean => {
    const validName = process.env.NEXT_PUBLIC_ADMIN_USERNAME || "admin"
    const validPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123"

    if (name === validName && password === validPassword) {
      localStorage.setItem("admin-auth", "true")
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem("admin-auth")
    setIsAuthenticated(false)
  }

  return { isAuthenticated, login, logout }
}
