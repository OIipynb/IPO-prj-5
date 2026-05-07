"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { useState } from "react"
import { 
  Trophy, Gamepad2, Star, Clock, ArrowRight, Users, 
  LogOut, ChevronRight, Sparkles
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/lib/accessibility-context"
import { games, topics } from "@/lib/games-data"

const mockLeaderboard = [
  { rank: 1, name: "Laura M.", score: 520, isCurrentUser: false },
  { rank: 2, name: "Anna G.", score: 450, isCurrentUser: false },
  { rank: 3, name: "Tu", score: 410, isCurrentUser: true },
  { rank: 4, name: "Marc P.", score: 380, isCurrentUser: false },
  { rank: 5, name: "Pol F.", score: 290, isCurrentUser: false },
]

const recommendedGames = games.slice(0, 3)

export default function StudentRoomPage() {
  const params = useParams()
  const t = useTranslation()
  const roomCode = params.code as string
  const [sessionActive] = useState(true)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-success text-success-foreground"
      case "medium": return "bg-warning text-warning-foreground"
      case "hard": return "bg-destructive text-destructive-foreground"
      default: return "bg-secondary text-secondary-foreground"
    }
  }

  // Group games by topic
  const gamesByTopic = topics.reduce((acc, topic) => {
    const topicGames = games.filter(g => g.topic === topic.id)
    if (topicGames.length > 0) {
      acc[topic.name] = topicGames
    }
    return acc
  }, {} as Record<string, typeof games>)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Classe 4t A - Ciberseguretat</h1>
              <p className="text-sm text-muted-foreground">
                Codi de sala: <span className="font-mono font-medium">{roomCode}</span>
              </p>
            </div>
          </div>
        </div>
        
        <Button variant="outline" asChild>
          <Link href="/">
            <LogOut className="h-4 w-4 mr-2" aria-hidden="true" />
            {t.endSession}
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar - Leaderboard */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Trophy className="h-5 w-5 text-warning" aria-hidden="true" />
                {t.leaderboard}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {mockLeaderboard.map((player) => (
                <div
                  key={player.rank}
                  className={`flex items-center gap-3 p-2 rounded-lg ${
                    player.isCurrentUser ? "bg-primary/10 border border-primary" : ""
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    player.rank === 1 ? "bg-warning text-warning-foreground" :
                    player.rank === 2 ? "bg-muted-foreground/30 text-foreground" :
                    player.rank === 3 ? "bg-accent text-accent-foreground" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {player.rank}
                  </div>
                  <span className={`flex-1 text-sm ${player.isCurrentUser ? "font-medium" : ""}`}>
                    {player.name}
                  </span>
                  <span className="font-bold text-sm">{player.score}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Content - Games */}
        <div className="lg:col-span-3 space-y-8">
          {/* Recommended Games */}
          <section aria-labelledby="recommended-heading">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-warning" aria-hidden="true" />
              <h2 id="recommended-heading" className="text-xl font-bold">
                {t.recommended}
              </h2>
              <Badge variant="secondary" className="ml-2">+50% punts</Badge>
            </div>
            <p className="text-muted-foreground mb-4">
              Jocs recomanats pel professor - guanya més punts!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {recommendedGames.map((game) => (
                <Card key={game.id} className="group hover:shadow-lg transition-shadow border-2 border-warning/30 bg-warning/5">
                  <Link href={`/jocs/${game.id}`}>
                    <div className="aspect-video bg-gradient-to-br from-warning/20 via-game-primary/10 to-warning/20 flex items-center justify-center relative rounded-t-lg">
                      <Gamepad2 className="h-12 w-12 text-foreground/20" aria-hidden="true" />
                      <div className="absolute top-2 right-2">
                        <Badge className={getDifficultyColor(game.difficulty)}>
                          {game.difficultyName}
                        </Badge>
                      </div>
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-warning text-warning-foreground">
                          <Star className="h-3 w-3 mr-1" aria-hidden="true" />
                          Recomanat
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base group-hover:text-primary transition-colors">
                        {game.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2 text-sm">
                        {game.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button size="sm" className="w-full">
                        {t.play}
                        <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
                      </Button>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </section>

          {/* Games by Topic */}
          {Object.entries(gamesByTopic).map(([topicName, topicGames]) => (
            <section key={topicName} aria-labelledby={`topic-${topicName}`}>
              <h2 id={`topic-${topicName}`} className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-primary rounded-full" aria-hidden="true" />
                {topicName}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {topicGames.map((game) => (
                  <Card key={game.id} className="group hover:shadow-md transition-shadow">
                    <Link href={`/jocs/${game.id}`}>
                      <div className="aspect-video bg-gradient-to-br from-game-primary/20 to-game-secondary/20 flex items-center justify-center relative rounded-t-lg">
                        <Gamepad2 className="h-10 w-10 text-foreground/20" aria-hidden="true" />
                        <div className="absolute top-2 right-2">
                          <Badge className={getDifficultyColor(game.difficulty)} variant="secondary">
                            {game.difficultyName}
                          </Badge>
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base group-hover:text-primary transition-colors">
                          {game.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2 text-sm">
                          {game.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" aria-hidden="true" />
                          {game.duration}
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
