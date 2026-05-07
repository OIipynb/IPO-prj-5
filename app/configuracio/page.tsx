"use client"

import { useState } from "react"
import { 
  User, Lock, Globe, Bell, Contrast, Type, 
  Sun, Moon, Monitor, Shield, Save, Eye, EyeOff
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useTranslation, useAccessibility } from "@/lib/accessibility-context"

export default function SettingsPage() {
  const t = useTranslation()
  const {
    fontSize,
    setFontSize,
    highContrast,
    setHighContrast,
    theme,
    setTheme,
    language,
    setLanguage,
  } = useAccessibility()

  const [showPassword, setShowPassword] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    browser: false,
    newArticles: true,
    classUpdates: true,
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t.settings}</h1>
          <p className="text-muted-foreground">
            Personalitza la teva experiència a CyberEdu-K
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">{t.profile}</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="gap-2">
              <Lock className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">{t.privacy}</span>
            </TabsTrigger>
            <TabsTrigger value="accessibility" className="gap-2">
              <Contrast className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">{t.accessibility}</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Notificacions</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" aria-hidden="true" />
                  {t.profile}
                </CardTitle>
                <CardDescription>
                  Gestiona la informació del teu perfil
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                    JG
                  </div>
                  <div>
                    <Button variant="outline" size="sm">
                      Canvia la foto
                    </Button>
                    <p className="text-sm text-muted-foreground mt-1">
                      JPG, PNG o GIF. Màxim 2MB.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t.name}</Label>
                    <Input id="name" defaultValue="Joan" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="surname">{t.surname}</Label>
                    <Input id="surname" defaultValue="García" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t.email}</Label>
                  <Input id="email" type="email" defaultValue="joan@exemple.com" />
                </div>

                <Button>
                  <Save className="h-4 w-4 mr-2" aria-hidden="true" />
                  Desa els canvis
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" aria-hidden="true" />
                  {t.privacy}
                </CardTitle>
                <CardDescription>
                  Controla la seguretat del teu compte
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Canvia la contrasenya</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Contrasenya actual</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                          aria-label={showPassword ? "Amaga" : "Mostra"}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Nova contrasenya</Label>
                      <Input id="newPassword" type="password" placeholder="••••••••" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmNewPassword">Confirma la nova contrasenya</Label>
                      <Input id="confirmNewPassword" type="password" placeholder="••••••••" />
                    </div>
                  </div>
                  <Button>Canvia la contrasenya</Button>
                </div>

                <div className="border-t border-border pt-6 space-y-4">
                  <h3 className="font-medium">Dades de sessió</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Desa el temps de resposta</p>
                      <p className="text-sm text-muted-foreground">
                        Guarda estadístiques de les teves sessions de joc
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Historial de jocs</p>
                      <p className="text-sm text-muted-foreground">
                        Permet veure el teu historial de jocs completats
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Accessibility Tab */}
          <TabsContent value="accessibility">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Contrast className="h-5 w-5" aria-hidden="true" />
                  {t.accessibility}
                </CardTitle>
                <CardDescription>
                  Personalitza la visualització i accessibilitat
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Language */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                    <Label className="text-base font-medium">{t.language}</Label>
                  </div>
                  <RadioGroup
                    value={language}
                    onValueChange={(v) => setLanguage(v as "ca" | "es" | "en")}
                    className="grid grid-cols-3 gap-4"
                  >
                    <Label
                      htmlFor="lang-ca"
                      className={`flex items-center justify-center p-4 border rounded-lg cursor-pointer ${
                        language === "ca" ? "border-primary bg-primary/5" : "border-border"
                      }`}
                    >
                      <RadioGroupItem value="ca" id="lang-ca" className="sr-only" />
                      Català
                    </Label>
                    <Label
                      htmlFor="lang-es"
                      className={`flex items-center justify-center p-4 border rounded-lg cursor-pointer ${
                        language === "es" ? "border-primary bg-primary/5" : "border-border"
                      }`}
                    >
                      <RadioGroupItem value="es" id="lang-es" className="sr-only" />
                      Español
                    </Label>
                    <Label
                      htmlFor="lang-en"
                      className={`flex items-center justify-center p-4 border rounded-lg cursor-pointer ${
                        language === "en" ? "border-primary bg-primary/5" : "border-border"
                      }`}
                    >
                      <RadioGroupItem value="en" id="lang-en" className="sr-only" />
                      English
                    </Label>
                  </RadioGroup>
                </div>

                {/* Theme */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Sun className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                    <Label className="text-base font-medium">{t.theme}</Label>
                  </div>
                  <RadioGroup
                    value={theme}
                    onValueChange={(v) => setTheme(v as "light" | "dark" | "system")}
                    className="grid grid-cols-3 gap-4"
                  >
                    <Label
                      htmlFor="theme-light"
                      className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer ${
                        theme === "light" ? "border-primary bg-primary/5" : "border-border"
                      }`}
                    >
                      <RadioGroupItem value="light" id="theme-light" className="sr-only" />
                      <Sun className="h-6 w-6 mb-2" aria-hidden="true" />
                      {t.light}
                    </Label>
                    <Label
                      htmlFor="theme-dark"
                      className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer ${
                        theme === "dark" ? "border-primary bg-primary/5" : "border-border"
                      }`}
                    >
                      <RadioGroupItem value="dark" id="theme-dark" className="sr-only" />
                      <Moon className="h-6 w-6 mb-2" aria-hidden="true" />
                      {t.dark}
                    </Label>
                    <Label
                      htmlFor="theme-system"
                      className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer ${
                        theme === "system" ? "border-primary bg-primary/5" : "border-border"
                      }`}
                    >
                      <RadioGroupItem value="system" id="theme-system" className="sr-only" />
                      <Monitor className="h-6 w-6 mb-2" aria-hidden="true" />
                      {t.system}
                    </Label>
                  </RadioGroup>
                </div>

                {/* Font Size */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Type className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                    <Label className="text-base font-medium">{t.fontSize}</Label>
                  </div>
                  <RadioGroup
                    value={fontSize}
                    onValueChange={(v) => setFontSize(v as "normal" | "large" | "xl")}
                    className="grid grid-cols-3 gap-4"
                  >
                    <Label
                      htmlFor="font-normal"
                      className={`flex items-center justify-center p-4 border rounded-lg cursor-pointer ${
                        fontSize === "normal" ? "border-primary bg-primary/5" : "border-border"
                      }`}
                    >
                      <RadioGroupItem value="normal" id="font-normal" className="sr-only" />
                      <span className="text-sm">{t.normal}</span>
                    </Label>
                    <Label
                      htmlFor="font-large"
                      className={`flex items-center justify-center p-4 border rounded-lg cursor-pointer ${
                        fontSize === "large" ? "border-primary bg-primary/5" : "border-border"
                      }`}
                    >
                      <RadioGroupItem value="large" id="font-large" className="sr-only" />
                      <span className="text-base">{t.large}</span>
                    </Label>
                    <Label
                      htmlFor="font-xl"
                      className={`flex items-center justify-center p-4 border rounded-lg cursor-pointer ${
                        fontSize === "xl" ? "border-primary bg-primary/5" : "border-border"
                      }`}
                    >
                      <RadioGroupItem value="xl" id="font-xl" className="sr-only" />
                      <span className="text-lg">{t.extraLarge}</span>
                    </Label>
                  </RadioGroup>
                </div>

                {/* High Contrast */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Contrast className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                    <div>
                      <p className="font-medium">{t.highContrast}</p>
                      <p className="text-sm text-muted-foreground">
                        Augmenta el contrast dels colors per a una millor visibilitat
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={highContrast}
                    onCheckedChange={setHighContrast}
                    aria-label={t.highContrast}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" aria-hidden="true" />
                  Notificacions
                </CardTitle>
                <CardDescription>
                  Tria quines notificacions vols rebre
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Notificacions per correu</p>
                    <p className="text-sm text-muted-foreground">
                      Rep actualitzacions importants per email
                    </p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, email: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Notificacions del navegador</p>
                    <p className="text-sm text-muted-foreground">
                      Mostra notificacions emergents
                    </p>
                  </div>
                  <Switch
                    checked={notifications.browser}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, browser: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Nous articles</p>
                    <p className="text-sm text-muted-foreground">
                      Avisa&apos;m quan hi hagi noves notícies
                    </p>
                  </div>
                  <Switch
                    checked={notifications.newArticles}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, newArticles: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Actualitzacions de classe</p>
                    <p className="text-sm text-muted-foreground">
                      Notifica&apos;m sobre activitats a les meves classes
                    </p>
                  </div>
                  <Switch
                    checked={notifications.classUpdates}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, classUpdates: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
