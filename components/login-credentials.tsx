"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function LoginCredentials() {
  const { toast } = useToast()

  const credentials = [
    {
      role: "Super Admin",
      email: "admin@ilearnova.com",
      password: "password",
      description: "Full platform management access",
      color: "destructive" as const,
    },
    {
      role: "Institute Admin",
      email: "principal@ilearnova.edu",
      password: "password",
      description: "Institute management and oversight",
      color: "default" as const,
    },
    {
      role: "Teacher",
      email: "teacher@ilearnova.edu",
      password: "password",
      description: "Course and student management",
      color: "secondary" as const,
    },
    {
      role: "Student",
      email: "student@ilearnova.edu",
      password: "password",
      description: "Learning and course access",
      color: "outline" as const,
    },
    {
      role: "Parent",
      email: "parent@ilearnova.com",
      password: "password",
      description: "Child progress monitoring",
      color: "outline" as const,
    },
  ]

  const copyCredentials = (email: string, password: string) => {
    navigator.clipboard.writeText(`Email: ${email}\nPassword: ${password}`)
    toast({
      title: "Credentials copied",
      description: "Login credentials copied to clipboard",
    })
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Demo Login Credentials</CardTitle>
        <CardDescription>Use these credentials to test different user roles in the LMS system</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {credentials.map((cred) => (
            <div key={cred.role} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{cred.role}</h4>
                  <Badge variant={cred.color}>{cred.role}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{cred.description}</p>
                <div className="text-xs font-mono">
                  <div>Email: {cred.email}</div>
                  <div>Password: {cred.password}</div>
                </div>
              </div>
              <Button size="sm" variant="outline" onClick={() => copyCredentials(cred.email, cred.password)}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h4 className="font-medium mb-2">How to Test:</h4>
          <ol className="text-sm text-muted-foreground space-y-1">
            <li>1. Go to the login page</li>
            <li>2. Select the user type from the dropdown</li>
            <li>3. Enter the corresponding email and password</li>
            <li>4. Click "Sign in" to access the role-specific dashboard</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  )
}
