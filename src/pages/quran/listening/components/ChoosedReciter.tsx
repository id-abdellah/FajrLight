import { useParams } from "react-router"
import { useQuery } from "@tanstack/react-query"
import { API } from "../../../../utils/API"
import Loader from "../../../../components/Loader"
import ErrorOccured from "../../../../components/Error"
import surahs from "../../../../../public/resources/surahs.json"
import SurahAudio from "./SurahAudio"
import SurahDownload from "./SurahDownload"

export default function ChoosedReciter() {
    const { reciterID } = useParams()

    const { data, isLoading, isError } = useQuery({
        queryKey: ["resiter", reciterID],
        queryFn: () => API.getReciters(),
        staleTime: Infinity,
        gcTime: Infinity,
        select: (data) => {
            return data.reciters.filter(r => r.id == Number(reciterID))[0]
        }
    })

    if (isLoading) return <Loader />;
    if (isError) return <ErrorOccured />;

    const reciter = {
        reciterName: data.name,
        reciterServer: data.moshaf[0].server,
        reciterAvailableSurah: data.moshaf[0].surah_list.split(",")
    };

    return (
        <div className="pt-5 px-3">
            <div className="font-bold text-center text-xl mb-5">{reciter.reciterName}</div>
            <div className="grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-3 gap-2">
                {
                    surahs.map((surah) => {
                        const surahNumber = surah.number
                        if (!reciter.reciterAvailableSurah.includes(String(surahNumber))) return
                        const surahAudioURL = `${reciter.reciterServer}${String(surah.number).padStart(3, "0")}.mp3`
                        return (
                            <div key={surah.englishName} className="flex justify-between p-2 bg-on_bg text-bg rounded-md">
                                <div>{surah.name}</div>
                                <div className="*:size-6 *:rounded-full *:text-sm *:grid *:place-content-center flex gap-1 items-center transition-colors">
                                    <SurahDownload surahURL={surahAudioURL} surahName={surah.name} reciterName={reciter.reciterName} />
                                    <SurahAudio audioURL={surahAudioURL} />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}