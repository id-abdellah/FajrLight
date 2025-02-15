import { useSelector } from "react-redux"
import { RooteState } from "../../../store/store"
import { useQuery } from "@tanstack/react-query"
import { API } from "../../../utils/API"
import Loader from "../../../components/Loader"
import { Ayah, AyahAudio } from "./types"
import ErrorOccured from "../../../components/Error"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClone } from "@fortawesome/free-solid-svg-icons"
import SurahInfo from "./components/SurahInfo"
import Navigation from "./components/Navigation"
import AyahListen from "./components/AyahAudio"


export default function Quran_Browsing() {
    const { browsingQuranPage: brQuran } = useSelector((state: RooteState) => state.settings)

    /* quran */
    const quranSimple = useQuery({
        queryFn: () => API.getQuranPage(brQuran.pageNumber, brQuran.quranType),
        queryKey: ["quranRead", brQuran.pageNumber, brQuran.quranType],
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        gcTime: Infinity,
    })

    /* tafsir */
    const tafsir = useQuery({
        queryFn: () => API.getQuranPage(brQuran.pageNumber, brQuran.tafsir.which),
        queryKey: ["quranTafsir", brQuran.pageNumber, brQuran.tafsir.which],
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        gcTime: Infinity,
        enabled: brQuran.tafsir.enabled
    })

    /* reciter */
    const reciter = useQuery({
        queryFn: () => API.getQuranPage(brQuran.pageNumber, brQuran.reciter.which),
        queryKey: ["quranReciter", brQuran.pageNumber, brQuran.reciter.which],
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        gcTime: Infinity,
        enabled: brQuran.reciter.enabled
    })

    if (quranSimple.isLoading) return <Loader />
    if (quranSimple.isError) return <ErrorOccured />

    const pageAyahs: Ayah[] = quranSimple.data.data.ayahs
    const pageTafsir: Ayah[] = tafsir.isSuccess ? tafsir.data.data.ayahs : undefined
    const pageReciter: AyahAudio[] = reciter.isSuccess ? reciter.data.data.ayahs : undefined


    return (
        <section className="relative p-3 h-full">

            <div className="h-full overflow-auto">
                {
                    pageAyahs.map((ayah, i: number) => {
                        const isBeginning = ayah.numberInSurah == 1
                        const ayahTafsir = pageTafsir && brQuran.tafsir.enabled ? pageTafsir[i].text : undefined
                        const ayahReciter = pageReciter && brQuran.reciter.enabled ? pageReciter[i].audio : undefined

                        return (
                            <div key={ayah.number}>

                                <SurahInfo isBeginning={isBeginning} surahObject={ayah.surah} />

                                <div className="mb-6">

                                    {/* Ayah */}
                                    <p style={{ fontSize: brQuran.fontSize }} className="text-justify">
                                        <span className="pe-2">{ayah.text}</span>
                                        <span className="font-serif text-xs bg-secondary text-black font-bold px-1 rounded-sm">{ayah.numberInSurah}</span>
                                    </p>

                                    {/* copy & listen */}
                                    <div className="flex gap-3 *:grid *:place-content-center *:text-xs *:w-6 *:h-5 *:rounded-sm *:transition-colors my-2">
                                        <AyahListen audioURL={ayahReciter} />
                                        <button onClick={() => copyToClipboard(ayah.text)} className="bg-surface hover:bg-hover_surface"><FontAwesomeIcon icon={faClone} /></button>
                                    </div>

                                    {/* tafsir */}
                                    {
                                        ayahTafsir &&
                                        <div className="text-justify text-sm text-on_surface mb-0">
                                            {ayahTafsir}
                                        </div>
                                    }

                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <Navigation />
        </section>
    )
}


async function copyToClipboard(text: string): Promise<void> {
    await navigator.clipboard.writeText(text)
}