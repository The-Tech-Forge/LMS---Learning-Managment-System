import { LoginCredentials } from "@/components/login-credentials"
import { ThemeToggle } from "@/components/theme-toggle"
import { GraduationCap } from "lucide-react"
import Link from "next/link"

export default function LoginHelpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-4xl space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <GraduationCap className="h-8 w-8 text-primary mr-2" />
            <span className="text-2xl font-bold">ILEARNOVA</span>
          </div>
          <h1 className="text-3xl font-bold">Demo Login Credentials</h1>
          <p className="text-muted-foreground mt-2">Test all user roles with these sample credentials</p>
        </div>

        <LoginCredentials />

        <div className="text-center">
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Go to Login Page
          </Link>
        </div>
      </div>
    </div>
  )
}
