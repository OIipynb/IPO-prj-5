"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Search, Newspaper, ChevronDown, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTranslation } from "@/lib/accessibility-context"

const topics = [
  { id: "phishing", name: "Phishing", nameEs: "Phishing", nameEn: "Phishing" },
  { id: "contrasenyes", name: "Contrasenyes", nameEs: "Contraseñas", nameEn: "Passwords" },
  { id: "privacitat", name: "Privacitat", nameEs: "Privacidad", nameEn: "Privacy" },
  { id: "malware", name: "Malware", nameEs: "Malware", nameEn: "Malware" },
  { id: "xarxes-socials", name: "Xarxes Socials", nameEs: "Redes Sociales", nameEn: "Social Media" },
  { id: "seguretat-movil", name: "Seguretat Mòbil", nameEs: "Seguridad Móvil", nameEn: "Mobile Security" },
]

const allNews = [
  {
    id: "1",
    title: "Com protegir-te del phishing el 2026",
    description: "Descobreix les noves tècniques dels ciberdelinqüents i com evitar caure en trampes. Els atacs de phishing han evolucionat i ara utilitzen intel·ligència artificial per crear missatges més convincents.",
    topic: "phishing",
    date: "2026-05-05",
    readTime: "5 min",
    image: "/news/phishing.jpg",
  },
  {
    id: "2",
    title: "Contrasenyes segures: la guia definitiva",
    description: "Tot el que necessites saber per crear contrasenyes que ningú pugui endevinar. Aprèn a utilitzar gestors de contrasenyes i l'autenticació de dos factors.",
    topic: "contrasenyes",
    date: "2026-05-04",
    readTime: "8 min",
    image: "/news/passwords.jpg",
  },
  {
    id: "3",
    title: "Privacitat a les xarxes socials",
    description: "Configura correctament la teva privacitat a Instagram, TikTok i altres xarxes. Una guia pas a pas per protegir la teva informació personal.",
    topic: "privacitat",
    date: "2026-05-03",
    readTime: "6 min",
    image: "/news/privacy.jpg",
  },
  {
    id: "4",
    title: "Què és el ransomware i com protegir-te",
    description: "El ransomware és un dels atacs més perillosos. Aprèn com funciona i què pots fer per evitar-lo i protegir els teus fitxers.",
    topic: "malware",
    date: "2026-05-02",
    readTime: "7 min",
    image: "/news/ransomware.jpg",
  },
  {
    id: "5",
    title: "Seguretat al mòbil: apps perilloses",
    description: "No totes les apps són segures. Descobreix com identificar apps malicioses i protegir el teu smartphone d'amenaces.",
    topic: "seguretat-movil",
    date: "2026-05-01",
    readTime: "5 min",
    image: "/news/mobile-security.jpg",
  },
  {
    id: "6",
    title: "Enginyeria social: l'art de l'engany",
    description: "Els hackers no sempre utilitzen tecnologia. Aprèn sobre les tècniques d'enginyeria social i com no caure en els seus paranys.",
    topic: "phishing",
    date: "2026-04-30",
    readTime: "6 min",
    image: "/news/social-engineering.jpg",
  },
  {
    id: "7",
    title: "Protegeix la teva identitat digital",
    description: "La teva identitat digital és tan important com la física. Descobreix com protegir-la i què fer si la comprometen.",
    topic: "privacitat",
    date: "2026-04-29",
    readTime: "7 min",
    image: "/news/digital-identity.jpg",
  },
  {
    id: "8",
    title: "Xarxes WiFi públiques: perills ocults",
    description: "Connectar-te a WiFi públiques pot ser perillós. Aprèn els riscos i com navegar de forma segura fora de casa.",
    topic: "privacitat",
    date: "2026-04-28",
    readTime: "4 min",
    image: "/news/wifi-security.jpg",
  },
]

export default function NewsListPage() {
  const t = useTranslation()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])

  const filteredNews = allNews.filter((news) => {
    const matchesSearch =
      news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTopic = selectedTopics.length === 0 || selectedTopics.includes(news.topic)
    return matchesSearch && matchesTopic
  })

  const groupedNews = filteredNews.reduce((acc, news) => {
    const topicData = topics.find((t) => t.id === news.topic)
    const topicName = topicData?.name || news.topic
    if (!acc[topicName]) {
      acc[topicName] = []
    }
    acc[topicName].push(news)
    return acc
  }, {} as Record<string, typeof allNews>)

  const toggleTopic = (topicId: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topicId) ? prev.filter((t) => t !== topicId) : [...prev, topicId]
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Newspaper className="h-8 w-8 text-primary" aria-hidden="true" />
          <h1 className="text-3xl md:text-4xl font-bold">{t.news}</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Mantén-te informat sobre les últimes amenaces i consells de ciberseguretat.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <Input
            type="search"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            aria-label={t.search}
          />
        </div>
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
      </div>

      {/* Selected Topics Pills */}
      {selectedTopics.length > 0 && (
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
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedTopics([])}
            className="h-6 px-2 text-xs"
          >
            Esborra tots
          </Button>
        </div>
      )}

      {/* News by Topic */}
      {Object.entries(groupedNews).map(([topicName, newsItems]) => (
        <section key={topicName} className="mb-12" aria-labelledby={`topic-${topicName}`}>
          <h2 id={`topic-${topicName}`} className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-primary rounded-full" aria-hidden="true" />
            {topicName}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {newsItems.map((news) => (
              <Card key={news.id} className="group hover:shadow-lg transition-shadow">
                <Link href={`/noticies/${news.id}`} className="flex flex-col sm:flex-row">
                  <div className="sm:w-48 aspect-video sm:aspect-square shrink-0 rounded-t-lg sm:rounded-l-lg sm:rounded-t-none overflow-hidden relative">
                    <Image
                      src={news.image}
                      alt={news.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <CardHeader>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <time dateTime={news.date}>
                          {new Date(news.date).toLocaleDateString("ca-ES", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </time>
                        <span aria-hidden="true">•</span>
                        <span>{news.readTime}</span>
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
                        {news.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {news.description}
                      </CardDescription>
                    </CardHeader>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </section>
      ))}

      {/* Empty State */}
      {Object.keys(groupedNews).length === 0 && (
        <div className="text-center py-16">
          <Newspaper className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" aria-hidden="true" />
          <h2 className="text-xl font-semibold mb-2">No s&apos;han trobat notícies</h2>
          <p className="text-muted-foreground mb-4">
            Prova amb altres termes de cerca o elimina els filtres.
          </p>
          <Button variant="outline" onClick={() => { setSearchQuery(""); setSelectedTopics([]) }}>
            Esborra filtres
          </Button>
        </div>
      )}

      {/* Load More */}
      {Object.keys(groupedNews).length > 0 && (
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            {t.showMore}
            <ChevronDown className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      )}
    </div>
  )
}
