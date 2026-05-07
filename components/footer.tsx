"use client"

import Link from "next/link"
import { Shield } from "lucide-react"
import { useTranslation } from "@/lib/accessibility-context"

export function Footer() {
  const t = useTranslation()

  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold text-primary mb-4">
              <Shield className="h-6 w-6" aria-hidden="true" />
              CyberEdu-K
            </Link>
            <p className="text-sm text-muted-foreground">
              Aprèn ciberseguretat de manera divertida i segura.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-3">{t.home}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/noticies" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t.news}
                </Link>
              </li>
              <li>
                <Link href="/jocs" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t.games}
                </Link>
              </li>
              <li>
                <Link href="/aula" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t.classroom}
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="font-semibold mb-3">{t.profile}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/login" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t.login}
                </Link>
              </li>
              <li>
                <Link href="/registre" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t.register}
                </Link>
              </li>
              <li>
                <Link href="/configuracio" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t.settings}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-3">{t.privacy}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacitat" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t.privacy}
                </Link>
              </li>
              <li>
                <Link href="/accessibilitat" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t.accessibility}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CyberEdu-K. Tots els drets reservats.</p>
        </div>
      </div>
    </footer>
  )
}
