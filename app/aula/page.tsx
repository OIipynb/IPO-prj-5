"use client"

import Link from "next/link"
import { useState } from "react"
import { 
  Users, Trophy, BarChart3, Plus, Copy, Check, Gamepad2, 
  TrendingUp, Clock, Star, ChevronRight, Settings
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTranslation } from "@/lib/accessibility-context"
import { games } from "@/lib/games-data"

const mockStudents = [
  { id: 1, name: "Anna García", score: 450, gamesPlayed: 12, correctAnswers: 85, avatar: "AG" },
  { id: 2, name: "Marc Puig", score: 380, gamesPlayed: 10, correctAnswers: 72, avatar: "MP" },
  { id: 3, name: "Laura Martí", score: 520, gamesPlayed: 15, correctAnswers: 91, avatar: "LM" },
  { id: 4, name: "Pol Ferrer", score: 290, gamesPlayed: 8, correctAnswers: 65, avatar: "PF" },
  { id: 5, name: "Marta Soler", score: 410, gamesPlayed: 11, correctAnswers: 78, avatar: "MS" },
]

const mockSessions = [
  { id: "ABC123", name: "Classe 4t A", students: 25, active: true, createdAt: "2026-05-06" },
  { id: "XYZ789", name: "Classe 4t B", students: 22, active: false, createdAt: "2026-05-05" },
]

export default function ClassroomPage() {
  const t = useTranslation()
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [newSessionName, setNewSessionName] = useState("")

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const totalStudents = mockSessions.reduce((acc, s) => acc + s.students, 0)
  const avgScore = Math.round(mockStudents.reduce((acc, s) => acc + s.score, 0) / mockStudents.length)
  const avgCorrect = Math.round(mockStudents.reduce((acc, s) => acc + s.correctAnswers, 0) / mockStudents.length)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Users className="h-8 w-8 text-primary" aria-hidden="true" />
            <h1 className="text-3xl md:text-4xl font-bold">{t.classroom}</h1>
          </div>
          <p className="text-muted-foreground">
            Gestiona les teves classes i fes seguiment del progrés dels alumnes.
          </p>
        </div>
        
        {/* Create Session Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg">
              <Plus className="h-5 w-5 mr-2" aria-hidden="true" />
              Crea una sessió
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crea una nova sessió</DialogTitle>
              <DialogDescription>
                Crea una sessió per a la teva classe. Els alumnes podran unir-se amb el codi generat.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sessionName">Nom de la sessió</Label>
                <Input
                  id="sessionName"
                  placeholder="Ex: Classe 4t A - Phishing"
                  value={newSessionName}
                  onChange={(e) => setNewSessionName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Jocs recomanats (opcional)</Label>
                <div className="grid grid-cols-2 gap-2">
                  {games.slice(0, 4).map((game) => (
                    <label
                      key={game.id}
                      className="flex items-center gap-2 p-2 border border-border rounded-lg cursor-pointer hover:bg-muted"
                    >
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">{game.title}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button className="w-full">
                Crear sessió
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalStudents}</p>
                <p className="text-sm text-muted-foreground">Alumnes totals</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center">
                <Trophy className="h-6 w-6 text-warning" aria-hidden="true" />
              </div>
              <div>
                <p className="text-2xl font-bold">{avgScore}</p>
                <p className="text-sm text-muted-foreground">Puntuació mitjana</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-success" aria-hidden="true" />
              </div>
              <div>
                <p className="text-2xl font-bold">{avgCorrect}%</p>
                <p className="text-sm text-muted-foreground">Respostes correctes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Gamepad2 className="h-6 w-6 text-accent" aria-hidden="true" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockSessions.length}</p>
                <p className="text-sm text-muted-foreground">Sessions actives</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sessions List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" aria-hidden="true" />
                Sessions
              </CardTitle>
              <CardDescription>Les teves sessions de classe</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{session.name}</span>
                      {session.active && (
                        <Badge variant="default" className="bg-success text-success-foreground text-xs">
                          Activa
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>{session.students} alumnes</span>
                      <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded">
                        {session.id}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyCode(session.id)}
                    aria-label="Copiar codi"
                  >
                    {copiedCode === session.id ? (
                      <Check className="h-4 w-4 text-success" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Students Leaderboard */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-warning" aria-hidden="true" />
                    {t.leaderboard}
                  </CardTitle>
                  <CardDescription>{t.yourStudents}</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/aula/alumnes">
                    Veure tots
                    <ChevronRight className="h-4 w-4 ml-1" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockStudents
                  .sort((a, b) => b.score - a.score)
                  .map((student, index) => (
                    <div
                      key={student.id}
                      className="flex items-center gap-4 p-3 border border-border rounded-lg"
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        index === 0 ? "bg-warning text-warning-foreground" :
                        index === 1 ? "bg-muted-foreground/30 text-foreground" :
                        index === 2 ? "bg-accent text-accent-foreground" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {index + 1}
                      </div>
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-medium text-primary">
                        {student.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{student.name}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{student.gamesPlayed} jocs</span>
                          <span>{student.correctAnswers}% encerts</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{student.score}</p>
                        <p className="text-xs text-muted-foreground">punts</p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Progress Chart */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" aria-hidden="true" />
                {t.correctAnswers}
              </CardTitle>
              <CardDescription>Progrés dels alumnes per tema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { topic: "Contrasenyes", progress: 78 },
                  { topic: "Phishing", progress: 65 },
                  { topic: "Privacitat", progress: 82 },
                  { topic: "Malware", progress: 54 },
                ].map((item) => (
                  <div key={item.topic} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>{item.topic}</span>
                      <span className="font-medium">{item.progress}%</span>
                    </div>
                    <Progress value={item.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
