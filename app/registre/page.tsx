"use client"

import Link from "next/link"
import { useState } from "react"
import { Shield, Mail, Lock, Eye, EyeOff, User, Check, X, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useTranslation } from "@/lib/accessibility-context"

export default function RegisterPage() {
  const t = useTranslation()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    isTeacher: false,
    acceptTerms: false,
  })

  const passwordRequirements = [
    { text: "Mínim 8 caràcters", met: formData.password.length >= 8 },
    { text: "Majúscules i minúscules", met: /[a-z]/.test(formData.password) && /[A-Z]/.test(formData.password) },
    { text: "Números o símbols", met: /[0-9]/.test(formData.password) || /[^a-zA-Z0-9]/.test(formData.password) },
  ]

  const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword.length > 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Register attempt:", { ...formData, password: "***" })
  }

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const isFormValid = 
    formData.name.length > 0 &&
    formData.email.length > 0 &&
    passwordRequirements.every(r => r.met) &&
    passwordsMatch &&
    formData.acceptTerms

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="h-8 w-8 text-primary" aria-hidden="true" />
            </div>
          </div>
          <CardTitle className="text-2xl">{t.createAccount}</CardTitle>
          <CardDescription>
            Uneix-te a CyberEdu-K i comença a aprendre ciberseguretat
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Personal Data */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t.name}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Joan"
                    value={formData.name}
                    onChange={(e) => updateFormData("name", e.target.value)}
                    className="pl-10"
                    required
                    autoComplete="given-name"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="surname">{t.surname}</Label>
                <Input
                  id="surname"
                  type="text"
                  placeholder="García"
                  value={formData.surname}
                  onChange={(e) => updateFormData("surname", e.target.value)}
                  autoComplete="family-name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t.email}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <Input
                  id="email"
                  type="email"
                  placeholder="correu@exemple.com"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  className="pl-10"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t.password}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => updateFormData("password", e.target.value)}
                  className="pl-10 pr-10"
                  required
                  autoComplete="new-password"
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
              {/* Password Requirements */}
              <div className="space-y-1 mt-2">
                {passwordRequirements.map((req, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    {req.met ? (
                      <Check className="h-3 w-3 text-success" aria-hidden="true" />
                    ) : (
                      <X className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
                    )}
                    <span className={req.met ? "text-success" : "text-muted-foreground"}>
                      {req.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t.confirmPassword}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                  className="pl-10"
                  required
                  autoComplete="new-password"
                />
                {formData.confirmPassword.length > 0 && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {passwordsMatch ? (
                      <Check className="h-4 w-4 text-success" aria-hidden="true" />
                    ) : (
                      <X className="h-4 w-4 text-destructive" aria-hidden="true" />
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Teacher checkbox */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isTeacher"
                checked={formData.isTeacher}
                onCheckedChange={(checked) => updateFormData("isTeacher", checked as boolean)}
              />
              <Label htmlFor="isTeacher" className="text-sm font-normal cursor-pointer">
                Sóc professor/a o educador/a
              </Label>
            </div>

            {/* Terms checkbox */}
            <div className="flex items-start space-x-2">
              <Checkbox
                id="acceptTerms"
                checked={formData.acceptTerms}
                onCheckedChange={(checked) => updateFormData("acceptTerms", checked as boolean)}
                required
              />
              <Label htmlFor="acceptTerms" className="text-sm font-normal cursor-pointer leading-tight">
                Accepto els{" "}
                <Link href="/termes" className="text-primary hover:underline">
                  termes i condicions
                </Link>{" "}
                i la{" "}
                <Link href="/privacitat" className="text-primary hover:underline">
                  política de privacitat
                </Link>
              </Label>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={!isFormValid}>
              <UserPlus className="h-4 w-4 mr-2" aria-hidden="true" />
              {t.createAccount}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Ja tens un compte? </span>
            <Link href="/login" className="text-primary hover:underline font-medium">
              {t.login}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
