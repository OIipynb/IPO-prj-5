"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type FontSize = "normal" | "large" | "xl"
type Theme = "light" | "dark" | "system"
type Language = "ca" | "es" | "en"

interface AccessibilityContextType {
  fontSize: FontSize
  setFontSize: (size: FontSize) => void
  highContrast: boolean
  setHighContrast: (enabled: boolean) => void
  theme: Theme
  setTheme: (theme: Theme) => void
  language: Language
  setLanguage: (lang: Language) => void
  reducedMotion: boolean
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

const translations = {
  ca: {
    home: "Inici",
    news: "Notícies",
    games: "Jocs",
    play: "Juga",
    login: "Accedeix",
    register: "Crea un compte",
    logout: "Tanca sessió",
    profile: "Perfil",
    settings: "Configuració",
    search: "Cerca",
    searchPlaceholder: "Cerca...",
    showMore: "Mostra'n més",
    classroom: "Aula",
    students: "Alumnes",
    leaderboard: "Classificació",
    recommended: "Recomanats",
    topics: "Temes",
    accessibility: "Accessibilitat",
    fontSize: "Mida del text",
    highContrast: "Alt contrast",
    theme: "Tema",
    language: "Idioma",
    skipToContent: "Salta al contingut",
    joinRoom: "Uneix-te a una sala",
    roomCode: "Codi de la sala",
    endSession: "Acaba la sessió",
    createAccount: "Crea el compte",
    email: "Correu electrònic",
    password: "Contrasenya",
    confirmPassword: "Confirma la contrasenya",
    name: "Nom",
    surname: "Cognoms",
    forgotPassword: "T'has oblidat?",
    similarNews: "Notícies similars",
    correctAnswers: "Respostes correctes",
    metrics: "Mètriques",
    yourStudents: "Els teus alumnes",
    privacy: "Privacitat",
    light: "Clar",
    dark: "Fosc",
    system: "Sistema",
    normal: "Normal",
    large: "Gran",
    extraLarge: "Molt gran",
  },
  es: {
    home: "Inicio",
    news: "Noticias",
    games: "Juegos",
    play: "Jugar",
    login: "Acceder",
    register: "Crear cuenta",
    logout: "Cerrar sesión",
    profile: "Perfil",
    settings: "Configuración",
    search: "Buscar",
    searchPlaceholder: "Buscar...",
    showMore: "Mostrar más",
    classroom: "Aula",
    students: "Alumnos",
    leaderboard: "Clasificación",
    recommended: "Recomendados",
    topics: "Temas",
    accessibility: "Accesibilidad",
    fontSize: "Tamaño del texto",
    highContrast: "Alto contraste",
    theme: "Tema",
    language: "Idioma",
    skipToContent: "Saltar al contenido",
    joinRoom: "Unirse a una sala",
    roomCode: "Código de sala",
    endSession: "Terminar sesión",
    createAccount: "Crear cuenta",
    email: "Correo electrónico",
    password: "Contraseña",
    confirmPassword: "Confirmar contraseña",
    name: "Nombre",
    surname: "Apellidos",
    forgotPassword: "¿Olvidaste?",
    similarNews: "Noticias similares",
    correctAnswers: "Respuestas correctas",
    metrics: "Métricas",
    yourStudents: "Tus alumnos",
    privacy: "Privacidad",
    light: "Claro",
    dark: "Oscuro",
    system: "Sistema",
    normal: "Normal",
    large: "Grande",
    extraLarge: "Muy grande",
  },
  en: {
    home: "Home",
    news: "News",
    games: "Games",
    play: "Play",
    login: "Log in",
    register: "Create account",
    logout: "Log out",
    profile: "Profile",
    settings: "Settings",
    search: "Search",
    searchPlaceholder: "Search...",
    showMore: "Show more",
    classroom: "Classroom",
    students: "Students",
    leaderboard: "Leaderboard",
    recommended: "Recommended",
    topics: "Topics",
    accessibility: "Accessibility",
    fontSize: "Font size",
    highContrast: "High contrast",
    theme: "Theme",
    language: "Language",
    skipToContent: "Skip to content",
    joinRoom: "Join a room",
    roomCode: "Room code",
    endSession: "End session",
    createAccount: "Create account",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm password",
    name: "Name",
    surname: "Surname",
    forgotPassword: "Forgot?",
    similarNews: "Similar news",
    correctAnswers: "Correct answers",
    metrics: "Metrics",
    yourStudents: "Your students",
    privacy: "Privacy",
    light: "Light",
    dark: "Dark",
    system: "System",
    normal: "Normal",
    large: "Large",
    extraLarge: "Extra large",
  },
}

export function useTranslation() {
  const context = useContext(AccessibilityContext)
  if (!context) {
    throw new Error("useTranslation must be used within AccessibilityProvider")
  }
  return translations[context.language]
}

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [fontSize, setFontSize] = useState<FontSize>("normal")
  const [highContrast, setHighContrast] = useState(false)
  const [theme, setTheme] = useState<Theme>("system")
  const [language, setLanguage] = useState<Language>("ca")
  const [reducedMotion, setReducedMotion] = useState(false)

  // Load preferences from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("cyberedu-accessibility")
    if (stored) {
      try {
        const prefs = JSON.parse(stored)
        if (prefs.fontSize) setFontSize(prefs.fontSize)
        if (prefs.highContrast !== undefined) setHighContrast(prefs.highContrast)
        if (prefs.theme) setTheme(prefs.theme)
        if (prefs.language) setLanguage(prefs.language)
      } catch {
        // Ignore parse errors
      }
    }

    // Check for reduced motion preference
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(motionQuery.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    motionQuery.addEventListener("change", handler)
    return () => motionQuery.removeEventListener("change", handler)
  }, [])

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem(
      "cyberedu-accessibility",
      JSON.stringify({ fontSize, highContrast, theme, language })
    )
  }, [fontSize, highContrast, theme, language])

  // Apply theme
  useEffect(() => {
    const root = document.documentElement
    root.classList.remove("light", "dark")
    
    if (theme === "system") {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      root.classList.add(systemDark ? "dark" : "light")
    } else {
      root.classList.add(theme)
    }
  }, [theme])

  // Apply high contrast
  useEffect(() => {
    const root = document.documentElement
    if (highContrast) {
      root.classList.add("high-contrast")
    } else {
      root.classList.remove("high-contrast")
    }
  }, [highContrast])

  // Apply font size
  useEffect(() => {
    const root = document.documentElement
    root.classList.remove("font-size-small", "font-size-large", "font-size-xl")
    if (fontSize === "large") {
      root.classList.add("font-size-large")
    } else if (fontSize === "xl") {
      root.classList.add("font-size-xl")
    }
  }, [fontSize])

  // Apply language to html element
  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        setFontSize,
        highContrast,
        setHighContrast,
        theme,
        setTheme,
        language,
        setLanguage,
        reducedMotion,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (!context) {
    throw new Error("useAccessibility must be used within AccessibilityProvider")
  }
  return context
}
