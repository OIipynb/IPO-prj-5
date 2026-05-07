"use client"

import Link from "next/link"
import { Clock, LogOut, Trophy, Gamepad2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslation } from "@/lib/accessibility-context"

export default function ActiveSessionPage() {
  const t = useTranslation()

  const sessionData = {
    name: "Classe 4t A - Ciberseguretat",
    code: "ABC123",
    startTime: new Date().toLocaleTimeString("ca-ES", { hour: "2-digit", minute: "2-digit" }),
    gamesPlayed: 3,
    totalScore: 180,
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="max-w-lg mx-auto">
        <CardHeader className="text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Gamepad2 className="h-8 w-8 text-primary" aria-hidden="true" />
          </div>
          <CardTitle className="text-2xl">Sessió activa</CardTitle>
          <CardDescription>{sessionData.name}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Session Info */}
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-muted rounded-lg">
              <Clock className="h-5 w-5 mx-auto mb-2 text-muted-foreground" aria-hidden="true" />
              <p className="text-sm text-muted-foreground">Inici</p>
              <p className="font-bold">{sessionData.startTime}</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <Gamepad2 className="h-5 w-5 mx-auto mb-2 text-muted-foreground" aria-hidden="true" />
              <p className="text-sm text-muted-foreground">Jocs jugats</p>
              <p className="font-bold">{sessionData.gamesPlayed}</p>
            </div>
          </div>

          {/* Score */}
          <div className="text-center p-6 bg-primary/10 rounded-lg">
            <Trophy className="h-8 w-8 mx-auto mb-2 text-warning" aria-hidden="true" />
            <p className="text-sm text-muted-foreground mb-1">Puntuació total</p>
            <p className="text-4xl font-bold text-primary">{sessionData.totalScore}</p>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <Button asChild size="lg">
              <Link href={`/aula/sala/${sessionData.code}`}>
                Torna als jocs
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/">
                <LogOut className="h-4 w-4 mr-2" aria-hidden="true" />
                {t.endSession}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
