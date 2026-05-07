"use client"

import Link from "next/link"
import { useState } from "react"
import { Search, Gamepad2, Users, Clock, Star, Filter, ChevronDown, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { useTranslation } from "@/lib/accessibility-context"
import { games, topics } from "@/lib/games-data"

export default function GamesListPage() {
  const t = useTranslation()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([])
  const [joinRoomCode, setJoinRoomCode] = useState("")

  const difficulties = [
    { id: "easy", name: "Fàcil" },
    { id: "medium", name: "Mitjà" },
    { id: "hard", name: "Difícil" },
  ]

  const filteredGames = games.filter((game) => {
    const matchesSearch =
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTopic = selectedTopics.length === 0 || selectedTopics.includes(game.topic)
    const matchesDifficulty = selectedDifficulties.length === 0 || selectedDifficulties.includes(game.difficulty)
    return matchesSearch && matchesTopic && matchesDifficulty
  })

  const groupedGames = filteredGames.reduce((acc, game) => {
    const topicData = topics.find((t) => t.id === game.topic)
    const topicName = topicData?.name || game.topic
    if (!acc[topicName]) {
      acc[topicName] = []
    }
    acc[topicName].push(game)
    return acc
  }, {} as Record<string, typeof games>)

  const toggleTopic = (topicId: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topicId) ? prev.filter((t) => t !== topicId) : [...prev, topicId]
    )
  }

  const toggleDifficulty = (difficultyId: string) => {
    setSelectedDifficulties((prev) =>
      prev.includes(difficultyId) ? prev.filter((d) => d !== difficultyId) : [...prev, difficultyId]
    )
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-success text-success-foreground"
      case "medium":
        return "bg-warning text-warning-foreground"
      case "hard":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Gamepad2 className="h-8 w-8 text-primary" aria-hidden="true" />
            <h1 className="text-3xl md:text-4xl font-bold">{t.games}</h1>
          </div>
          
          {/* Join Room Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary" size="lg">
                <Users className="h-5 w-5 mr-2" aria-hidden="true" />
                {t.joinRoom}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t.joinRoom}</DialogTitle>
                <DialogDescription>
                  Introdueix el codi que t&apos;ha donat el teu professor per unir-te a una sala.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <Input
                  placeholder={t.roomCode}
                  value={joinRoomCode}
                  onChange={(e) => setJoinRoomCode(e.target.value.toUpperCase())}
                  className="text-center text-2xl tracking-widest font-mono"
                  maxLength={6}
                  aria-label={t.roomCode}
                />
              </div>
              <DialogFooter>
                <Button 
                  className="w-full" 
                  disabled={joinRoomCode.length < 4}
                  asChild
                >
                  <Link href={`/aula/sala/${joinRoomCode}`}>
                    {t.joinRoom}
                  </Link>
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <p className="text-muted-foreground text-lg">
          Aprèn ciberseguretat jugant. Jocs dissenyats per a totes les edats!
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <Input
            type="search"
            placeholder="Cerca un joc..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            aria-label={t.search}
          />
        </div>
        
        {/* Topic Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" aria-hidden="true" />
              {t.topics}
              {selectedTopics.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {selectedTopics.length}
                </Badge>
              )}
              <ChevronDown className="h-4 w-4 ml-2" aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>{t.topics}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {topics.map((topic) => (
              <DropdownMenuCheckboxItem
                key={topic.id}
                checked={selectedTopics.includes(topic.id)}
                onCheckedChange={() => toggleTopic(topic.id)}
              >
                {topic.name}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Difficulty Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Star className="h-4 w-4 mr-2" aria-hidden="true" />
              Dificultat
              {selectedDifficulties.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {selectedDifficulties.length}
                </Badge>
              )}
              <ChevronDown className="h-4 w-4 ml-2" aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Dificultat</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {difficulties.map((diff) => (
              <DropdownMenuCheckboxItem
                key={diff.id}
                checked={selectedDifficulties.includes(diff.id)}
                onCheckedChange={() => toggleDifficulty(diff.id)}
              >
                {diff.name}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Active Filters */}
      {(selectedTopics.length > 0 || selectedDifficulties.length > 0) && (
        <div className="flex flex-wrap gap-2 mb-6">
          {selectedTopics.map((topicId) => {
            const topic = topics.find((t) => t.id === topicId)
            return (
              <Badge
                key={topicId}
                variant="secondary"
                className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                onClick={() => toggleTopic(topicId)}
              >
                {topic?.name}
                <span className="ml-1" aria-label="Eliminar filtre">×</span>
              </Badge>
            )
          })}
          {selectedDifficulties.map((diffId) => {
            const diff = difficulties.find((d) => d.id === diffId)
            return (
              <Badge
                key={diffId}
                variant="outline"
                className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                onClick={() => toggleDifficulty(diffId)}
              >
                {diff?.name}
                <span className="ml-1" aria-label="Eliminar filtre">×</span>
              </Badge>
            )
          })}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => { setSelectedTopics([]); setSelectedDifficulties([]) }}
            className="h-6 px-2 text-xs"
          >
            Esborra tots
          </Button>
        </div>
      )}

      {/* Games by Topic */}
      {Object.entries(groupedGames).map(([topicName, topicGames]) => (
        <section key={topicName} className="mb-12" aria-labelledby={`topic-${topicName}`}>
          <h2 id={`topic-${topicName}`} className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-primary rounded-full" aria-hidden="true" />
            {topicName}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topicGames.map((game) => (
              <Card key={game.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
                <Link href={`/jocs/${game.id}`}>
                  <div className="aspect-video bg-gradient-to-br from-game-primary/30 via-game-secondary/20 to-game-accent/30 flex items-center justify-center relative">
                    <Gamepad2 className="h-16 w-16 text-foreground/20" aria-hidden="true" />
                    <div className="absolute top-3 right-3">
                      <Badge className={getDifficultyColor(game.difficulty)}>
                        {game.difficultyName}
                      </Badge>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                        {game.ageRange}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {game.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {game.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" aria-hidden="true" />
                        {game.duration}
                      </span>
                    </div>
                    <Button className="w-full">
                      <Play className="h-4 w-4 mr-2" aria-hidden="true" />
                      {t.play}
                    </Button>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </section>
      ))}

      {/* Empty State */}
      {Object.keys(groupedGames).length === 0 && (
        <div className="text-center py-16">
          <Gamepad2 className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" aria-hidden="true" />
          <h2 className="text-xl font-semibold mb-2">No s&apos;han trobat jocs</h2>
          <p className="text-muted-foreground mb-4">
            Prova amb altres termes de cerca o elimina els filtres.
          </p>
          <Button variant="outline" onClick={() => { setSearchQuery(""); setSelectedTopics([]); setSelectedDifficulties([]) }}>
            Esborra filtres
          </Button>
        </div>
      )}
    </div>
  )
}
