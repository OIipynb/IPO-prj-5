"use client"

import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { ArrowLeft, Clock, Calendar, Share2, Bookmark, Newspaper } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/lib/accessibility-context"

const newsData: Record<string, {
  id: string
  title: string
  description: string
  content: string[]
  topic: string
  topicName: string
  date: string
  readTime: string
  author: string
  image: string
}> = {
  "1": {
    id: "1",
    title: "Com protegir-te del phishing el 2026",
    description: "Descobreix les noves tècniques dels ciberdelinqüents i com evitar caure en trampes.",
    image: "/news/phishing.jpg",
    content: [
      "El phishing continua sent una de les amenaces més comunes a Internet. El 2026, els ciberdelinqüents han perfeccionat les seves tècniques utilitzant intel·ligència artificial per crear missatges cada vegada més convincents.",
      "Els correus electrònics fraudulents ara poden imitar perfectament l'estil d'escriptura de persones que coneixes, gràcies a l'anàlisi de xarxes socials i altres fonts públiques d'informació.",
      "Per protegir-te, és essencial verificar sempre l'adreça de correu del remitent, no fer clic en enllaços sospitosos i activar l'autenticació de dos factors en tots els teus comptes.",
      "Si reps un correu demanant-te informació personal o financera, contacta directament amb l'empresa o persona a través dels seus canals oficials, mai a través dels enllaços del correu.",
      "Recorda: les empreses legítimes mai et demanaran la teva contrasenya o dades bancàries per correu electrònic.",
    ],
    topic: "phishing",
    topicName: "Phishing",
    date: "2026-05-05",
    readTime: "5 min",
    author: "Maria García",
  },
  "2": {
    id: "2",
    title: "Contrasenyes segures: la guia definitiva",
    description: "Tot el que necessites saber per crear contrasenyes que ningú pugui endevinar.",
    image: "/news/passwords.jpg",
    content: [
      "Una contrasenya segura és la primera línia de defensa contra els ciberatacs. Però, què fa que una contrasenya sigui realment segura?",
      "La longitud és clau: una contrasenya de 16 caràcters és exponencialment més difícil de trencar que una de 8. Intenta utilitzar frases llargues que puguis recordar fàcilment.",
      "Evita informació personal com dates de naixement, noms de mascotes o adreces. Els hackers poden trobar aquesta informació a les xarxes socials.",
      "Utilitza un gestor de contrasenyes per generar i emmagatzemar contrasenyes úniques per a cada compte. D'aquesta manera, si un compte es veu compromès, els altres romanen segurs.",
      "Activa sempre l'autenticació de dos factors (2FA) quan estigui disponible. Això afegeix una capa extra de seguretat que fa molt més difícil que algú accedeixi al teu compte.",
    ],
    topic: "contrasenyes",
    topicName: "Contrasenyes",
    date: "2026-05-04",
    readTime: "8 min",
    author: "Joan Martí",
  },
  "3": {
    id: "3",
    title: "Privacitat a les xarxes socials",
    description: "Configura correctament la teva privacitat a Instagram, TikTok i altres xarxes.",
    image: "/news/privacy.jpg",
    content: [
      "Les xarxes socials són una part important de la nostra vida digital, però compartir massa informació pot posar en risc la nostra privacitat i seguretat.",
      "Revisa regularment la configuració de privacitat dels teus comptes. Les plataformes actualitzen sovint les seves polítiques i opcions, i els valors per defecte no sempre són els més privats.",
      "Pensa abans de publicar: la informació que comparteixes pot revelar molt sobre tu, incloent la teva ubicació, rutines diàries i cercle social.",
      "Limita qui pot veure les teves publicacions i informació personal. Considera fer el teu compte privat i accepta només sol·licituds de persones que coneixes realment.",
      "Tingues cura amb les aplicacions de tercers que connectes a les teves xarxes socials. Poden tenir accés a molta més informació del que penses.",
    ],
    topic: "privacitat",
    topicName: "Privacitat",
    date: "2026-05-03",
    readTime: "6 min",
    author: "Laia Puig",
  },
}

const relatedNews = [
  { id: "6", title: "Enginyeria social: l'art de l'engany", topic: "Phishing", image: "/news/social-engineering.jpg" },
  { id: "4", title: "Què és el ransomware i com protegir-te", topic: "Malware", image: "/news/ransomware.jpg" },
  { id: "7", title: "Protegeix la teva identitat digital", topic: "Privacitat", image: "/news/digital-identity.jpg" },
  { id: "8", title: "Xarxes WiFi públiques: perills ocults", topic: "Privacitat", image: "/news/wifi-security.jpg" },
]

export default function NewsDetailPage() {
  const params = useParams()
  const t = useTranslation()
  const newsId = params.id as string
  const news = newsData[newsId] || newsData["1"]

  return (
    <article className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Button asChild variant="ghost" size="sm">
          <Link href="/noticies">
            <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
            Tornar a notícies
          </Link>
        </Button>
      </div>

      {/* Article Header */}
      <header className="max-w-3xl mx-auto mb-8">
        <Badge variant="secondary" className="mb-4">
          {news.topicName}
        </Badge>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
          {news.title}
        </h1>
        <p className="text-xl text-muted-foreground mb-6 text-pretty">
          {news.description}
        </p>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{news.author}</span>
          <span aria-hidden="true">•</span>
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" aria-hidden="true" />
            <time dateTime={news.date}>
              {new Date(news.date).toLocaleDateString("ca-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </span>
          <span aria-hidden="true">•</span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" aria-hidden="true" />
            {news.readTime}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-6">
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" aria-hidden="true" />
            Compartir
          </Button>
          <Button variant="outline" size="sm">
            <Bookmark className="h-4 w-4 mr-2" aria-hidden="true" />
            Desar
          </Button>
        </div>
      </header>

      {/* Featured Image */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="aspect-video bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20 rounded-xl flex items-center justify-center">
          <Newspaper className="h-24 w-24 text-muted-foreground/30" aria-hidden="true" />
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-3xl mx-auto">
        <div className="prose prose-lg max-w-none">
          {news.content.map((paragraph, index) => (
            <p key={index} className="text-foreground leading-relaxed mb-6">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-border">
          <span className="text-sm font-medium text-muted-foreground mr-2">Etiquetes:</span>
          <Badge variant="outline">Ciberseguretat</Badge>
          <Badge variant="outline">{news.topicName}</Badge>
          <Badge variant="outline">Educació</Badge>
        </div>
      </div>

      {/* Related News */}
      <section className="max-w-4xl mx-auto mt-16" aria-labelledby="related-news">
        <h2 id="related-news" className="text-2xl font-bold mb-6">
          {t.similarNews}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {relatedNews.map((item) => (
            <Card key={item.id} className="group hover:shadow-md transition-shadow">
              <Link href={`/noticies/${item.id}`} className="flex items-center gap-4 p-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center shrink-0">
                  <Newspaper className="h-6 w-6 text-muted-foreground/50" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <Badge variant="secondary" className="mb-1 text-xs">
                    {item.topic}
                  </Badge>
                  <h3 className="font-medium group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </section>
    </article>
  )
}
