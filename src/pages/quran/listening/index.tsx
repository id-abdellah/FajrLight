import { useQuery } from "@tanstack/react-query"
import { API } from "../../../utils/API"
import Loader from "../../../components/Loader"
import ErrorOccured from "../../../components/Error"
import RecitersList from "./components/RecitersList"
import { useState } from "react"
import { RecitersGroupedByLetters, RecitersReponse } from "./types"

export default function Quran_Listening() {

    const [searchQuery, setSearchQuery] = useState("")

    const { data, isLoading, isError } = useQuery({
        queryFn: () => API.getReciters(),
        queryKey: ["recitersList"],
        staleTime: Infinity,
        gcTime: Infinity,
        select: (data: RecitersReponse): RecitersGroupedByLetters => {
            const groupedByLetter = data.reciters.reduce((acc, curr) => {
                const letter = ["أ", "إ", "ا"].includes(curr.letter) ? "ا" : curr.letter
                if (!(letter in acc)) {
                    acc[letter] = []
                }
                acc[letter].push(curr)
                return acc
            }, {})
            return groupedByLetter
        }
    })

    if (isLoading) return <Loader />;
    if (isError || !data) return <ErrorOccured />;

    let reciters = Object.entries(data).sort()
    reciters = reciters.map((entry) => {
        const l = entry[0]
        const rcs = entry[1].filter(p => p.name.includes(searchQuery))
        return [l, rcs]
    })

    return (
        <section className="p-4">

            <div>
                <div className="space-y-6">
                    <input
                        className="focus:outline-none rounded-sm p-1 bg-on_bg"
                        placeholder="ابحث عن قارئ"
                        type="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} />
                    <div className="space-y-6">
                        <RecitersList reciters={reciters} />
                    </div>
                </div>
            </div>

        </section>
    )
}