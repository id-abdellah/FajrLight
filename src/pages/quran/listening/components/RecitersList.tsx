import { Link } from "react-router"
import { Reciter } from "../types"

type Props = {
    reciters: [string, Reciter[]][]
}

export default function RecitersList({ reciters }: Props) {

    return (
        <>
            {
                reciters.map((entry, i) => {
                    const letter = entry[0]
                    const letterReciters = entry[1]
                    if (letterReciters.length == 0) return
                    return (
                        <div key={i}>
                            <div className="bg-primary size-6 grid place-content-center font-bold rounded-md mb-3 font-serif">{letter}</div>
                            <div className="*:block text-md grid grid-cols-3 max-sm:grid-cols-2 gap-3">
                                {
                                    letterReciters.map((reciter, i) => {

                                        const reciterID = reciter.id

                                        return (
                                            <Link
                                                className="text-bg bg-on_bg p-2 rounded-[4px] hover:brightness-90"
                                                key={i}
                                                to={`${reciterID}`}
                                            >
                                                {reciter.name}</Link>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}