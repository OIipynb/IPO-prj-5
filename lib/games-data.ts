export interface Game {
  id: string
  title: string
  description: string
  longDescription: string
  topic: string
  topicName: string
  difficulty: "easy" | "medium" | "hard"
  difficultyName: string
  ageRange: string
  duration: string
  skills: string[]
}

export const topics = [
  { id: "contrasenyes", name: "Contrasenyes", nameEs: "Contraseñas", nameEn: "Passwords" },
  { id: "phishing", name: "Phishing", nameEs: "Phishing", nameEn: "Phishing" },
  { id: "privacitat", name: "Privacitat", nameEs: "Privacidad", nameEn: "Privacy" },
  { id: "malware", name: "Malware", nameEs: "Malware", nameEn: "Malware" },
  { id: "xarxes", name: "Xarxes", nameEs: "Redes", nameEn: "Networks" },
  { id: "dades", name: "Dades Personals", nameEs: "Datos Personales", nameEn: "Personal Data" },
]

export const games: Game[] = [
  {
    id: "password-hero",
    title: "Password Hero",
    description: "Crea la contrasenya més segura i derrota els hackers!",
    longDescription: "En aquest joc emocionant, aprendràs a crear contrasenyes fortes mentre defenses el teu castell digital. Cada nivell presenta un hacker més intel·ligent que intenta endevinar la teva contrasenya. Utilitza majúscules, minúscules, números i símbols per crear defenses inexpugnables. Guanya punts per cada contrasenya segura i desbloqueja nous escuts i poders especials!",
    topic: "contrasenyes",
    topicName: "Contrasenyes",
    difficulty: "easy",
    difficultyName: "Fàcil",
    ageRange: "6-10 anys",
    duration: "5-10 min",
    skills: ["Creació de contrasenyes", "Patrons de seguretat", "Memòria"],
  },
  {
    id: "phishing-detective",
    title: "Phishing Detective",
    description: "Detecta els correus falsos abans que sigui massa tard.",
    longDescription: "Converteix-te en un detectiu digital! Analitza correus electrònics i missatges per identificar intents de phishing. Aprèn a reconèixer senyals d'alarma com adreces sospitoses, errors ortogràfics i sol·licituds urgents. Cada cas resolt et dona punts i desbloqueja noves eines de detectiu. Podràs atrapar tots els estafadors?",
    topic: "phishing",
    topicName: "Phishing",
    difficulty: "medium",
    difficultyName: "Mitjà",
    ageRange: "10-14 anys",
    duration: "10-15 min",
    skills: ["Anàlisi crítica", "Reconeixement de patrons", "Atenció al detall"],
  },
  {
    id: "cyber-shield",
    title: "CyberShield Quest",
    description: "Protegeix el teu ordinador de virus i malware en aquest joc d'aventures.",
    longDescription: "Embarca't en una aventura èpica per protegir el món digital! El teu ordinador és un regne que necessita protecció contra virus, troians i altres amenaces. Construeix firewalls, instal·la antivirus i aprèn sobre les diferents amenaces mentre avances per nivells cada vegada més desafiants. Salva el regne digital!",
    topic: "malware",
    topicName: "Malware",
    difficulty: "easy",
    difficultyName: "Fàcil",
    ageRange: "8-12 anys",
    duration: "15-20 min",
    skills: ["Seguretat bàsica", "Tipus de malware", "Mesures de protecció"],
  },
  {
    id: "privacy-guardian",
    title: "Privacy Guardian",
    description: "Aprèn a protegir la teva informació personal en línia.",
    longDescription: "Ets el guardià de la teva privacitat! En aquest joc de simulació, gestionaràs els perfils de xarxes socials i aprendràs què és segur compartir i què no. Pren decisions sobre configuracions de privacitat, acceptació d'amics i publicació de contingut. Cada decisió té conseqüències - podràs mantenir la teva informació segura?",
    topic: "privacitat",
    topicName: "Privacitat",
    difficulty: "medium",
    difficultyName: "Mitjà",
    ageRange: "10-16 anys",
    duration: "10-15 min",
    skills: ["Gestió de privacitat", "Presa de decisions", "Xarxes socials"],
  },
  {
    id: "network-ninja",
    title: "Network Ninja",
    description: "Domina els secrets de les xarxes segures com un veritable ninja.",
    longDescription: "Entrena't per convertir-te en un ninja de les xarxes! Aprèn sobre WiFi segur, VPN i connexions encriptades mentre superes obstacles digitals. Cada nivell t'ensenyarà una nova habilitat de seguretat de xarxes. Des de detectar xarxes WiFi perilloses fins a configurar connexions segures, aquest joc et convertirà en un expert!",
    topic: "xarxes",
    topicName: "Xarxes",
    difficulty: "hard",
    difficultyName: "Difícil",
    ageRange: "12-16 anys",
    duration: "15-20 min",
    skills: ["Seguretat de xarxes", "WiFi", "Encriptació"],
  },
  {
    id: "data-defender",
    title: "Data Defender",
    description: "Protegeix les dades personals dels usuaris en aquest joc d'estratègia.",
    longDescription: "Les dades personals són un tresor que cal protegir! En aquest joc d'estratègia, aprendràs sobre el valor de les dades personals i com protegir-les. Gestiona una base de dades, implementa mesures de seguretat i respon a intents d'accés no autoritzat. Podràs mantenir totes les dades segures?",
    topic: "dades",
    topicName: "Dades Personals",
    difficulty: "medium",
    difficultyName: "Mitjà",
    ageRange: "10-14 anys",
    duration: "10-15 min",
    skills: ["Protecció de dades", "Estratègia", "RGPD bàsic"],
  },
]

export function getGameById(id: string): Game | undefined {
  return games.find((game) => game.id === id)
}

export function getGamesByTopic(topicId: string): Game[] {
  return games.filter((game) => game.topic === topicId)
}

export function getGamesByDifficulty(difficulty: Game["difficulty"]): Game[] {
  return games.filter((game) => game.difficulty === difficulty)
}
