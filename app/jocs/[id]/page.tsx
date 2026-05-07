"use client"

import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { ArrowLeft, Play, Clock, Users, Star, Trophy, Gamepad2, Maximize2, Check, X, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useTranslation } from "@/lib/accessibility-context"
import { getGameById, games } from "@/lib/games-data"

export default function GameDetailPage() {
  const params = useParams()
  const router = useRouter()
  const t = useTranslation()
  const gameId = params.id as string
  const game = getGameById(gameId)
  const [isPlaying, setIsPlaying] = useState(false)
  const [gameState, setGameState] = useState<"intro" | "playing" | "result">("intro")
  const [score, setScore] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)

  if (!game) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Gamepad2 className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" aria-hidden="true" />
        <h1 className="text-2xl font-bold mb-2">Joc no trobat</h1>
        <p className="text-muted-foreground mb-4">El joc que busques no existeix.</p>
        <Button asChild>
          <Link href="/jocs">Tornar als jocs</Link>
        </Button>
      </div>
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

  const relatedGames = games.filter((g) => g.id !== game.id).slice(0, 3)

  // Simple game simulation based on game type
  const GameContent = () => {
    if (game.id === "password-hero") {
      return <PasswordHeroGame onComplete={(s) => { setScore(s); setGameState("result") }} />
    }
    if (game.id === "phishing-detective") {
      return <PhishingDetectiveGame onComplete={(s) => { setScore(s); setGameState("result") }} />
    }
    // Default game for others
    return <GenericQuizGame game={game} onComplete={(s) => { setScore(s); setGameState("result") }} />
  }

  return (
    <div className="min-h-screen">
      {!isPlaying ? (
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <div className="mb-6">
            <Button asChild variant="ghost" size="sm">
              <Link href="/jocs">
                <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
                Tornar als jocs
              </Link>
            </Button>
          </div>

          {/* Game Header */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="aspect-video bg-gradient-to-br from-game-primary/30 via-game-secondary/20 to-game-accent/30 rounded-xl flex items-center justify-center relative mb-6">
                <Gamepad2 className="h-24 w-24 text-foreground/20" aria-hidden="true" />
                <Button 
                  size="lg" 
                  className="absolute"
                  onClick={() => setIsPlaying(true)}
                >
                  <Play className="h-6 w-6 mr-2" aria-hidden="true" />
                  {t.play}
                </Button>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{game.title}</h1>
              <p className="text-lg text-muted-foreground mb-6">{game.longDescription}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {game.skills.map((skill) => (
                  <Badge key={skill} variant="outline">{skill}</Badge>
                ))}
              </div>
            </div>

            {/* Game Info Card */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Informació del joc</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Tema</span>
                    <Badge variant="secondary">{game.topicName}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Dificultat</span>
                    <Badge className={getDifficultyColor(game.difficulty)}>
                      {game.difficultyName}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Edat recomanada</span>
                    <span className="font-medium">{game.ageRange}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Durada</span>
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="h-4 w-4" aria-hidden="true" />
                      {game.duration}
                    </span>
                  </div>
                  <Button className="w-full mt-4" size="lg" onClick={() => setIsPlaying(true)}>
                    <Play className="h-5 w-5 mr-2" aria-hidden="true" />
                    Comença a jugar
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/jocs">
                      <Maximize2 className="h-4 w-4 mr-2" aria-hidden="true" />
                      Pantalla completa
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Related Games */}
          <section aria-labelledby="related-games">
            <h2 id="related-games" className="text-2xl font-bold mb-6">Altres jocs que t&apos;agradaran</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedGames.map((relatedGame) => (
                <Card key={relatedGame.id} className="group hover:shadow-lg transition-shadow">
                  <Link href={`/jocs/${relatedGame.id}`}>
                    <div className="aspect-video bg-gradient-to-br from-game-primary/20 to-game-secondary/20 flex items-center justify-center">
                      <Gamepad2 className="h-10 w-10 text-foreground/20" aria-hidden="true" />
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getDifficultyColor(relatedGame.difficulty)} variant="secondary">
                          {relatedGame.difficultyName}
                        </Badge>
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {relatedGame.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {relatedGame.description}
                      </CardDescription>
                    </CardHeader>
                  </Link>
                </Card>
              ))}
            </div>
          </section>
        </div>
      ) : (
        /* Game Playing Mode */
        <div className="min-h-screen bg-gradient-to-br from-game-primary/10 via-background to-game-secondary/10 p-4">
          <div className="max-w-4xl mx-auto">
            {/* Game Header */}
            <div className="flex items-center justify-between mb-6">
              <Button variant="ghost" onClick={() => { setIsPlaying(false); setGameState("intro") }}>
                <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
                Sortir
              </Button>
              <h1 className="text-xl font-bold">{game.title}</h1>
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-warning" aria-hidden="true" />
                <span className="font-bold">{score}</span>
              </div>
            </div>

            {/* Game Content */}
            <Card className="min-h-[500px]">
              <CardContent className="p-6">
                {gameState === "intro" && (
                  <div className="text-center py-12">
                    <Gamepad2 className="h-16 w-16 mx-auto text-primary mb-4" aria-hidden="true" />
                    <h2 className="text-2xl font-bold mb-4">{game.title}</h2>
                    <p className="text-muted-foreground mb-8 max-w-md mx-auto">{game.description}</p>
                    <Button size="lg" onClick={() => setGameState("playing")}>
                      <Play className="h-5 w-5 mr-2" aria-hidden="true" />
                      Comença!
                    </Button>
                  </div>
                )}
                {gameState === "playing" && <GameContent />}
                {gameState === "result" && (
                  <div className="text-center py-12">
                    <Trophy className="h-16 w-16 mx-auto text-warning mb-4" aria-hidden="true" />
                    <h2 className="text-2xl font-bold mb-2">Felicitats!</h2>
                    <p className="text-4xl font-bold text-primary mb-4">{score} punts</p>
                    <p className="text-muted-foreground mb-8">Has completat el joc amb èxit!</p>
                    <div className="flex gap-4 justify-center">
                      <Button onClick={() => { setScore(0); setGameState("intro") }}>
                        <RefreshCw className="h-4 w-4 mr-2" aria-hidden="true" />
                        Torna a jugar
                      </Button>
                      <Button variant="outline" onClick={() => setIsPlaying(false)}>
                        Tornar
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

// Password Hero Mini Game
function PasswordHeroGame({ onComplete }: { onComplete: (score: number) => void }) {
  const [password, setPassword] = useState("")
  const [strength, setStrength] = useState(0)

  const checkPasswordStrength = (pwd: string) => {
    let score = 0
    if (pwd.length >= 8) score += 20
    if (pwd.length >= 12) score += 10
    if (/[a-z]/.test(pwd)) score += 15
    if (/[A-Z]/.test(pwd)) score += 15
    if (/[0-9]/.test(pwd)) score += 20
    if (/[^a-zA-Z0-9]/.test(pwd)) score += 20
    setStrength(score)
    return score
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value
    setPassword(newPassword)
    checkPasswordStrength(newPassword)
  }

  const requirements = [
    { text: "Mínim 8 caràcters", met: password.length >= 8 },
    { text: "Conté minúscules", met: /[a-z]/.test(password) },
    { text: "Conté majúscules", met: /[A-Z]/.test(password) },
    { text: "Conté números", met: /[0-9]/.test(password) },
    { text: "Conté símbols especials", met: /[^a-zA-Z0-9]/.test(password) },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold mb-2">Crea una contrasenya segura!</h3>
        <p className="text-muted-foreground">Escriu una contrasenya que compleixi tots els requisits.</p>
      </div>

      <div className="max-w-md mx-auto space-y-4">
        <input
          type="text"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Escriu la teva contrasenya..."
          className="w-full px-4 py-3 text-lg border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          aria-label="Contrasenya"
        />

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Força de la contrasenya</span>
            <span className="font-medium">{strength}%</span>
          </div>
          <Progress value={strength} className="h-3" />
        </div>

        <div className="space-y-2">
          {requirements.map((req, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              {req.met ? (
                <Check className="h-4 w-4 text-success" aria-hidden="true" />
              ) : (
                <X className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              )}
              <span className={req.met ? "text-success" : "text-muted-foreground"}>
                {req.text}
              </span>
            </div>
          ))}
        </div>

        <Button 
          className="w-full" 
          size="lg"
          disabled={strength < 80}
          onClick={() => onComplete(strength)}
        >
          Valida la contrasenya
        </Button>
      </div>
    </div>
  )
}

// Phishing Detective Mini Game
function PhishingDetectiveGame({ onComplete }: { onComplete: (score: number) => void }) {
  const [currentEmail, setCurrentEmail] = useState(0)
  const [score, setScore] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [lastAnswer, setLastAnswer] = useState<boolean | null>(null)

  const emails = [
    {
      from: "support@amaz0n-security.com",
      subject: "Urgent: El teu compte serà suspès!",
      content: "Estimat client, hem detectat activitat sospitosa. Fes clic aquí per verificar el teu compte immediatament o serà suspès en 24 hores.",
      isPhishing: true,
      reason: "L'adreça de correu utilitza un zero en lloc d'una 'o' (amaz0n). Les empreses legítimes no demanen accions urgents.",
    },
    {
      from: "info@bancsabadell.com",
      subject: "Rebut de la teva transferència",
      content: "Hola, t'enviem el rebut de la transferència que has realitzat avui. Pots consultar els detalls al teu espai client.",
      isPhishing: false,
      reason: "El correu és informatiu, no demana accions ni dades personals, i el domini és legítim.",
    },
    {
      from: "premis-loteria@gmail.com",
      subject: "Has guanyat 1.000.000€!",
      content: "Felicitats! Has estat seleccionat com a guanyador. Envia les teves dades bancàries per rebre el premi.",
      isPhishing: true,
      reason: "Els premis legítims no arriben per correu, mai demanen dades bancàries, i el remitent és un Gmail genèric.",
    },
  ]

  const handleAnswer = (answer: boolean) => {
    const correct = answer === emails[currentEmail].isPhishing
    setLastAnswer(correct)
    if (correct) {
      setScore(score + 30)
    }
    setShowFeedback(true)
  }

  const nextEmail = () => {
    setShowFeedback(false)
    if (currentEmail < emails.length - 1) {
      setCurrentEmail(currentEmail + 1)
    } else {
      onComplete(score)
    }
  }

  const email = emails[currentEmail]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted-foreground">
          Correu {currentEmail + 1} de {emails.length}
        </span>
        <Badge variant="secondary">
          <Trophy className="h-3 w-3 mr-1" aria-hidden="true" />
          {score} punts
        </Badge>
      </div>

      <Card className="border-2">
        <CardHeader className="border-b">
          <div className="text-sm text-muted-foreground">De: <span className="font-mono">{email.from}</span></div>
          <CardTitle className="text-lg">{email.subject}</CardTitle>
        </CardHeader>
        <CardContent className="py-6">
          <p>{email.content}</p>
        </CardContent>
      </Card>

      {!showFeedback ? (
        <div className="flex gap-4 justify-center">
          <Button 
            variant="destructive" 
            size="lg"
            onClick={() => handleAnswer(true)}
          >
            Phishing!
          </Button>
          <Button 
            variant="default" 
            size="lg"
            onClick={() => handleAnswer(false)}
          >
            Legítim
          </Button>
        </div>
      ) : (
        <Card className={lastAnswer ? "border-success bg-success/10" : "border-destructive bg-destructive/10"}>
          <CardContent className="py-4">
            <div className="flex items-center gap-2 mb-2">
              {lastAnswer ? (
                <Check className="h-5 w-5 text-success" aria-hidden="true" />
              ) : (
                <X className="h-5 w-5 text-destructive" aria-hidden="true" />
              )}
              <span className="font-bold">
                {lastAnswer ? "Correcte!" : "Incorrecte"}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{email.reason}</p>
            <Button className="mt-4" onClick={nextEmail}>
              {currentEmail < emails.length - 1 ? "Següent correu" : "Veure resultats"}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// Generic Quiz Game
function GenericQuizGame({ game, onComplete }: { game: { title: string, topicName: string }, onComplete: (score: number) => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)

  const questions = [
    {
      question: "Què és el primer que hauries de fer si reps un correu sospitós?",
      options: [
        "Fer clic en l'enllaç per verificar",
        "Verificar l'adreça del remitent",
        "Reenviar-lo als amics",
        "Ignorar-lo completament",
      ],
      correct: 1,
    },
    {
      question: "Quina d'aquestes NO és una bona pràctica de seguretat?",
      options: [
        "Utilitzar autenticació de dos factors",
        "Utilitzar la mateixa contrasenya per tot",
        "Actualitzar el programari regularment",
        "Fer còpies de seguretat",
      ],
      correct: 1,
    },
    {
      question: "Com pots saber si una web és segura?",
      options: [
        "Té molts colors",
        "Comença per https:// i té un cadenat",
        "Té moltes imatges",
        "És ràpida",
      ],
      correct: 1,
    },
  ]

  const handleAnswer = (answerIndex: number) => {
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 30)
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      onComplete(score + (answerIndex === questions[currentQuestion].correct ? 30 : 0))
    }
  }

  const q = questions[currentQuestion]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted-foreground">
          Pregunta {currentQuestion + 1} de {questions.length}
        </span>
        <Badge variant="secondary">
          <Trophy className="h-3 w-3 mr-1" aria-hidden="true" />
          {score} punts
        </Badge>
      </div>

      <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-2" />

      <div className="py-6">
        <h3 className="text-xl font-bold mb-6">{q.question}</h3>
        <div className="space-y-3">
          {q.options.map((option, i) => (
            <Button
              key={i}
              variant="outline"
              className="w-full justify-start text-left h-auto py-4 px-4"
              onClick={() => handleAnswer(i)}
            >
              <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-3 shrink-0">
                {String.fromCharCode(65 + i)}
              </span>
              {option}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
