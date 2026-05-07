"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Search, User, Menu, X, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTranslation, useAccessibility } from "@/lib/accessibility-context"
import { AccessibilityMenu } from "@/components/accessibility-menu"

export function Header() {
  const t = useTranslation()
  const { language } = useAccessibility()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + "/")

  const navItems = [
    { href: "/", label: t.home },
    { href: "/noticies", label: t.news },
    { href: "/jocs", label: t.games },
    { href: "/aula", label: t.classroom },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <a href="#main-content" className="skip-link">
        {t.skipToContent}
      </a>
      
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2 text-xl font-bold text-primary"
          aria-label="CyberEdu-K Home"
        >
          <Shield className="h-8 w-8" aria-hidden="true" />
          <span className="hidden sm:inline">CyberEdu-K</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-secondary"
              }`}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative hidden sm:block">
            {searchOpen ? (
              <div className="flex items-center gap-2">
                <Input
                  type="search"
                  placeholder={t.searchPlaceholder}
                  className="w-48 lg:w-64"
                  autoFocus
                  onBlur={() => setSearchOpen(false)}
                  aria-label={t.search}
                />
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(true)}
                aria-label={t.search}
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
          </div>

          {/* Accessibility Menu */}
          <AccessibilityMenu />

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label={t.profile}>
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/login">{t.login}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/registre">{t.register}</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/perfil">{t.profile}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/configuracio">{t.settings}</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-border bg-background p-4" aria-label="Mobile navigation">
          <div className="mb-4">
            <Input
              type="search"
              placeholder={t.searchPlaceholder}
              className="w-full"
              aria-label={t.search}
            />
          </div>
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-secondary"
                }`}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
