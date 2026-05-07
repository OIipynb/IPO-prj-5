"use client"

import Link from "next/link"
import Image from "next/image"
import { Shield, Newspaper, Gamepad2, Users, ArrowRight, Star, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslation } from "@/lib/accessibility-context"

const featuredNews = [
  {
    id: 1,
    title: "Com protegir-te del phishing el 2026",
    description: "Descobreix les noves tècniques dels ciberdelinqüents i com evitar caure en trampes.",
    topic: "Phishing",
    image: "/news/phishing.jpg",
  },
  {
    id: 2,
    title: "Contrasenyes segures: la guia definitiva",
    description: "Tot el que necessites saber per crear contrasenyes que ningú pugui endevinar.",
    topic: "Contrasenyes",
    image: "/news/passwords.jpg",
  },
  {
    id: 3,
    title: "Privacitat a les xarxes socials",
    description: "Configura correctament la teva privacitat a Instagram, TikTok i altres xarxes.",
    topic: "Privacitat",
    image: "/news/privacy.jpg",
  },
]

const featuredGames = [
  {
    id: "password-hero",
    title: "Password Hero",
    description: "Crea la contrasenya més segura i derrota els hackers!",
    difficulty: "Fàcil",
    image: "/games/password-hero.jpg",
  },
  {
    id: "phishing-detective",
    title: "Phishing Detective",
    description: "Detecta els correus falsos abans que sigui massa tard.",
    difficulty: "Mitjà",
    image: "/games/phishing-detective.jpg",
  },
  {
    id: "cyber-shield",
    title: "CyberShield Quest",
    description: "Protegeix el teu ordinador de virus i malware en aquest joc d'aventures.",
    difficulty: "Fàcil",
    image: "/games/cyber-shield.jpg",
  },
]

export default function HomePage() {
  const t = useTranslation()

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Shield className="h-16 w-16 text-primary" aria-hidden="true" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              Aprèn ciberseguretat de manera divertida
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty">
              Notícies per a adults, jocs per als més joves. Tothom pot aprendre a protegir-se en línia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg">
                <Link href="/noticies">
                  <Newspaper className="mr-2 h-5 w-5" aria-hidden="true" />
                  {t.news}
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="text-lg">
                <Link href="/jocs">
                  <Gamepad2 className="mr-2 h-5 w-5" aria-hidden="true" />
                  {t.play}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-16 bg-card" aria-labelledby="news-heading">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Newspaper className="h-8 w-8 text-primary" aria-hidden="true" />
              <h2 id="news-heading" className="text-2xl md:text-3xl font-bold">
                {t.news}
              </h2>
            </div>
            <Button asChild variant="ghost">
              <Link href="/noticies">
                {t.showMore}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredNews.map((news) => (
              <Card key={news.id} className="group hover:shadow-lg transition-shadow">
                <Link href={`/noticies/${news.id}`}>
                  <div className="aspect-video bg-muted rounded-t-lg overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
                    <div className="absolute bottom-3 left-3 z-20">
                      <span className="text-xs font-medium bg-primary text-primary-foreground px-2 py-1 rounded">
                        {news.topic}
                      </span>
                    </div>
                    <Image
                      src={news.image}
                      alt={news.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
                      {news.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {news.description}
                    </CardDescription>
                  </CardHeader>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section className="py-16 bg-gradient-to-br from-game-primary/5 via-background to-game-secondary/5" aria-labelledby="games-heading">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Gamepad2 className="h-8 w-8 text-primary" aria-hidden="true" />
              <h2 id="games-heading" className="text-2xl md:text-3xl font-bold">
                {t.games}
              </h2>
            </div>
            <Button asChild variant="ghost">
              <Link href="/jocs">
                {t.showMore}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredGames.map((game) => (
              <Card key={game.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
                <Link href={`/jocs/${game.id}`}>
                  <div className="aspect-video bg-gradient-to-br from-game-primary/20 to-game-secondary/20 relative overflow-hidden">
                    <Image
                      src={game.image}
                      alt={game.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        game.difficulty === "Fàcil" 
                          ? "bg-success text-success-foreground" 
                          : "bg-warning text-warning-foreground"
                      }`}>
                        {game.difficulty}
                      </span>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {game.title}
                    </CardTitle>
                    <CardDescription>
                      {game.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">
                      {t.play}
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Button>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Classroom CTA */}
      <section className="py-16 bg-sidebar text-sidebar-foreground" aria-labelledby="classroom-heading">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Users className="h-12 w-12 mx-auto mb-6 text-sidebar-primary" aria-hidden="true" />
            <h2 id="classroom-heading" className="text-2xl md:text-3xl font-bold mb-4">
              Per a professors i educadors
            </h2>
            <p className="text-sidebar-foreground/80 mb-8 text-lg">
              Crea aules virtuals, assigna jocs als teus alumnes i fes seguiment del seu progrés en ciberseguretat.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/aula">
                  <Users className="mr-2 h-5 w-5" aria-hidden="true" />
                  {t.classroom}
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent">
                <Link href="/registre">
                  {t.register}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card" aria-label="Estadístiques">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="flex justify-center mb-2">
                <Users className="h-8 w-8 text-primary" aria-hidden="true" />
              </div>
              <p className="text-3xl md:text-4xl font-bold text-foreground">5.000+</p>
              <p className="text-muted-foreground">Usuaris actius</p>
            </div>
            <div>
              <div className="flex justify-center mb-2">
                <Gamepad2 className="h-8 w-8 text-primary" aria-hidden="true" />
              </div>
              <p className="text-3xl md:text-4xl font-bold text-foreground">6</p>
              <p className="text-muted-foreground">Jocs educatius</p>
            </div>
            <div>
              <div className="flex justify-center mb-2">
                <Newspaper className="h-8 w-8 text-primary" aria-hidden="true" />
              </div>
              <p className="text-3xl md:text-4xl font-bold text-foreground">100+</p>
              <p className="text-muted-foreground">Articles publicats</p>
            </div>
            <div>
              <div className="flex justify-center mb-2">
                <Star className="h-8 w-8 text-primary" aria-hidden="true" />
              </div>
              <p className="text-3xl md:text-4xl font-bold text-foreground">4.8</p>
              <p className="text-muted-foreground">Valoració mitjana</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
