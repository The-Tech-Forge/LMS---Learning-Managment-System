"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

export type UserRole = "admin" | "institute" | "teacher" | "student" | "parent"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  instituteId?: string
  phone?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role: UserRole) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// Mock users data
const mockUsers: User[] = [
  {
    id: "1",
    name: "Super Admin",
    email: "admin@ilearnova.com",
    role: "admin",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "John Principal",
    email: "principal@ilearnova.edu",
    role: "institute",
    instituteId: "inst-1",
    phone: "+1234567890",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Sarah Teacher",
    email: "teacher@ilearnova.edu",
    role: "teacher",
    instituteId: "inst-1",
    phone: "+1234567891",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Mike Student",
    email: "student@ilearnova.edu",
    role: "student",
    instituteId: "inst-1",
    phone: "+1234567892",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "Lisa Parent",
    email: "parent@ilearnova.com",
    role: "parent",
    instituteId: "inst-1",
    phone: "+1234567893",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("lms-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    // Redirect logic based on authentication state
    if (!isLoading) {
      const isAuthPage =
        pathname === "/" || pathname === "/login" || pathname === "/register" || pathname === "/forgot-password"

      if (!user && !isAuthPage) {
        router.push("/login")
      } else if (user && isAuthPage) {
        router.push(`/${user.role}`)
      }
    }
  }, [user, isLoading, pathname, router])

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    // Mock authentication
    const foundUser = mockUsers.find((u) => u.email === email && u.role === role)

    if (foundUser && password === "password") {
      setUser(foundUser)
      localStorage.setItem("lms-user", JSON.stringify(foundUser))
      return true
    }

    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("lms-user")
    router.push("/login")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}
