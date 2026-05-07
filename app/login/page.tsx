"use client"

import Link from "next/link"
import { useState } from "react"
import { Shield, Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslation } from "@/lib/accessibility-context"

export default function LoginPage() {
  const t = useTranslation()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic
    console.log("[v0] Login attempt:", { email })
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="h-8 w-8 text-primary" aria-hidden="true" />
            </div>
          </div>
          <CardTitle className="text-2xl">{t.login}</CardTitle>
          <CardDescription>
            Accedeix al teu compte de CyberEdu-K
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t.email}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <Input
                  id="email"
                  type="email"
                  placeholder="correu@exemple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">{t.password}</Label>
                <Link 
                  href="/recuperar-contrasenya" 
                  className="text-sm text-primary hover:underline"
                >
                  {t.forgotPassword}
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Amagar contrasenya" : "Mostrar contrasenya"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Eye className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg">
              <LogIn className="h-4 w-4 mr-2" aria-hidden="true" />
              {t.login}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">No tens un compte? </span>
            <Link href="/registre" className="text-primary hover:underline font-medium">
              {t.register}
            </Link>
          </div>

          {/* Quick access for classroom */}
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground text-center mb-3">
              Vols unir-te a una sessió de classe?
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link href="/jocs">
                Uneix-te amb un codi
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
