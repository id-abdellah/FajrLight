export type Moshaf = {
    id: number
    name: string
    server: string
    surah_total: number
    moshaf_type: number
    surah_list: string
}

export type Reciter = {
    id: number
    name: string
    letter: string
    date: string,
    moshaf: Moshaf[]
}

export type RecitersReponse = {reciters: Reciter[]}

export type RecitersGroupedByLetters = Record<string, Reciter[]>