"use client"

import Link from "next/link"
import { 
  User, Trophy, Gamepad2, BarChart3, Settings, 
  Calendar, Star, TrendingUp, Clock
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useTranslation } from "@/lib/accessibility-context"

const userStats = {
  name: "Joan García",
  avatar: "JG",
  email: "joan@exemple.com",
  joinDate: "Gener 2026",
  totalScore: 1250,
  gamesPlayed: 45,
  correctAnswers: 78,
  rank: 12,
  badges: [
    { name: "Principiant", icon: Star, earned: true },
    { name: "Expert en Contrasenyes", icon: Trophy, earned: true },
    { name: "Detector de Phishing", icon: TrendingUp, earned: true },
    { name: "Ninja de Xarxes", icon: Gamepad2, earned: false },
  ],
}

const recentActivity = [
  { game: "Password Hero", score: 95, date: "Avui", topic: "Contrasenyes" },
  { game: "Phishing Detective", score: 80, date: "Ahir", topic: "Phishing" },
  { game: "Privacy Guardian", score: 70, date: "Fa 2 dies", topic: "Privacitat" },
  { game: "CyberShield Quest", score: 85, date: "Fa 3 dies", topic: "Malware" },
]

const topicProgress = [
  { topic: "Contrasenyes", progress: 85, gamesPlayed: 12 },
  { topic: "Phishing", progress: 72, gamesPlayed: 10 },
  { topic: "Privacitat", progress: 68, gamesPlayed: 8 },
  { topic: "Malware", progress: 55, gamesPlayed: 6 },
  { topic: "Xarxes", progress: 40, gamesPlayed: 5 },
  { topic: "Dades Personals", progress: 30, gamesPlayed: 4 },
]

export default function ProfilePage() {
  const t = useTranslation()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-3xl font-bold text-primary">
                {userStats.avatar}
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl font-bold mb-1">{userStats.name}</h1>
                <p className="text-muted-foreground mb-4">{userStats.email}</p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    Membre des de {userStats.joinDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <Trophy className="h-4 w-4 text-warning" aria-hidden="true" />
                    Posició #{userStats.rank}
                  </span>
                </div>
              </div>
              <Button asChild variant="outline">
                <Link href="/configuracio">
                  <Settings className="h-4 w-4 mr-2" aria-hidden="true" />
                  {t.settings}
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <Trophy className="h-8 w-8 mx-auto mb-2 text-warning" aria-hidden="true" />
              <p className="text-2xl font-bold">{userStats.totalScore}</p>
              <p className="text-sm text-muted-foreground">Punts totals</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Gamepad2 className="h-8 w-8 mx-auto mb-2 text-primary" aria-hidden="true" />
              <p className="text-2xl font-bold">{userStats.gamesPlayed}</p>
              <p className="text-sm text-muted-foreground">Jocs jugats</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-success" aria-hidden="true" />
              <p className="text-2xl font-bold">{userStats.correctAnswers}%</p>
              <p className="text-sm text-muted-foreground">Encerts</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Star className="h-8 w-8 mx-auto mb-2 text-accent" aria-hidden="true" />
              <p className="text-2xl font-bold">
                {userStats.badges.filter((b) => b.earned).length}/{userStats.badges.length}
              </p>
              <p className="text-sm text-muted-foreground">Insígnies</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Badges */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-warning" aria-hidden="true" />
                  Insígnies
                </CardTitle>
                <CardDescription>Els teus assoliments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {userStats.badges.map((badge) => {
                  const Icon = badge.icon
                  return (
                    <div
                      key={badge.name}
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        badge.earned
                          ? "bg-primary/5 border-primary/20"
                          : "bg-muted/50 border-border opacity-50"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          badge.earned ? "bg-primary/10" : "bg-muted"
                        }`}
                      >
                        <Icon
                          className={`h-5 w-5 ${
                            badge.earned ? "text-primary" : "text-muted-foreground"
                          }`}
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{badge.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {badge.earned ? "Obtinguda" : "Pendent"}
                        </p>
                      </div>
                      {badge.earned && (
                        <Badge variant="secondary" className="text-xs">
                          Aconseguida
                        </Badge>
                      )}
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {/* Progress by Topic */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" aria-hidden="true" />
                  Progrés per tema
                </CardTitle>
                <CardDescription>El teu nivell en cada àrea de ciberseguretat</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {topicProgress.map((item) => (
                  <div key={item.topic} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{item.topic}</span>
                      <span className="text-muted-foreground">
                        {item.progress}% ({item.gamesPlayed} jocs)
                      </span>
                    </div>
                    <Progress value={item.progress} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" aria-hidden="true" />
                  Activitat recent
                </CardTitle>
                <CardDescription>Els teus últims jocs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border border-border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Gamepad2 className="h-5 w-5 text-primary" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="font-medium">{activity.game}</p>
                          <p className="text-sm text-muted-foreground">
                            {activity.topic} • {activity.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{activity.score}</p>
                        <p className="text-xs text-muted-foreground">punts</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button asChild variant="outline" className="w-full mt-4">
                  <Link href="/jocs">
                    Juga més
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
