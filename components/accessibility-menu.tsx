"use client"

import { Settings, Sun, Moon, Monitor, Type, Contrast, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTranslation, useAccessibility } from "@/lib/accessibility-context"

export function AccessibilityMenu() {
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={t.accessibility}>
          <Settings className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {/* Language */}
        <DropdownMenuLabel className="flex items-center gap-2">
          <Globe className="h-4 w-4" aria-hidden="true" />
          {t.language}
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup value={language} onValueChange={(v) => setLanguage(v as "ca" | "es" | "en")}>
          <DropdownMenuRadioItem value="ca">Català</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="es">Español</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator />

        {/* Theme */}
        <DropdownMenuLabel className="flex items-center gap-2">
          <Sun className="h-4 w-4" aria-hidden="true" />
          {t.theme}
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup value={theme} onValueChange={(v) => setTheme(v as "light" | "dark" | "system")}>
          <DropdownMenuRadioItem value="light">
            <Sun className="h-4 w-4 mr-2" aria-hidden="true" />
            {t.light}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">
            <Moon className="h-4 w-4 mr-2" aria-hidden="true" />
            {t.dark}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">
            <Monitor className="h-4 w-4 mr-2" aria-hidden="true" />
            {t.system}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator />

        {/* Font Size */}
        <DropdownMenuLabel className="flex items-center gap-2">
          <Type className="h-4 w-4" aria-hidden="true" />
          {t.fontSize}
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup value={fontSize} onValueChange={(v) => setFontSize(v as "normal" | "large" | "xl")}>
          <DropdownMenuRadioItem value="normal">{t.normal}</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="large">{t.large}</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="xl">{t.extraLarge}</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator />

        {/* High Contrast */}
        <DropdownMenuCheckboxItem
          checked={highContrast}
          onCheckedChange={setHighContrast}
        >
          <Contrast className="h-4 w-4 mr-2" aria-hidden="true" />
          {t.highContrast}
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
