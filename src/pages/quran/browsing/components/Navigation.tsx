import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { RooteState } from "../../../../store/store";
import { nextPage, prevPage, setPage } from "../../../../store/slices/settings";
import { useDispatch } from "react-redux";
import { API } from "../../../../utils/API";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

const pgOptions = Array.from({ length: 604 }, (_, i) => (
    <option key={i + 1} value={i + 1} className="text-on_bg font-semibold bg-surface">
        {i + 1}
    </option>
))

export default function Navigation() {
    const { browsingQuranPage: brQuran } = useSelector((state: RooteState) => state.settings)
    const dispatch = useDispatch()
    const queryClient = useQueryClient()

    const pagePrefetch = (which: 1 | -1) => {
        const currentPage = brQuran.pageNumber
        if (which == 1 && currentPage !== 604) {
            queryClient.prefetchQuery({
                queryKey: ["quranRead", currentPage + 1, brQuran.quranType],
                queryFn: () => API.getQuranPage(currentPage + 1, brQuran.quranType),
                staleTime: Infinity,
                gcTime: Infinity
            })
            queryClient.prefetchQuery({
                queryKey: ["quranTafsir", currentPage + 1, brQuran.tafsir.which],
                queryFn: () => API.getQuranPage(currentPage + 1, brQuran.tafsir.which),
                staleTime: Infinity,
                gcTime: Infinity
            })
        } else if (which == -1 && currentPage !== 1) {
            queryClient.prefetchQuery({
                queryKey: ["quranRead", currentPage - 1, brQuran.quranType],
                queryFn: () => API.getQuranPage(currentPage - 1, brQuran.quranType),
                staleTime: Infinity,
                gcTime: Infinity
            })
            queryClient.prefetchQuery({
                queryKey: ["quranTafsir", currentPage - 1, brQuran.tafsir.which],
                queryFn: () => API.getQuranPage(currentPage - 1, brQuran.tafsir.which),
                staleTime: Infinity,
                gcTime: Infinity
            })
        }
    }

    const changePage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = Number(e.target.value)
        dispatch(setPage(value))
    }

    return (
        <div className="w-[150px] py-1 px-2 rounded-md bg-primary absolute left-1/2 bottom-1 -translate-x-1/2 flex justify-between font-serif">

            <button onMouseEnter={() => pagePrefetch(-1)} onClick={() => dispatch(prevPage())} disabled={brQuran.pageNumber == 1} className="size-6 rounded-full grid place-content-center text-sm transition-colors bg-bg hover:bg-hover_bg active:scale-95 disabled:text-gray-500 disabled:cursor-not-allowed" >
                <span><FontAwesomeIcon icon={faArrowRight} /></span>
            </button>

            <div>
                <select name="" id="" className="bg-transparent rounded-sm text-sm font-semibold text-center" value={brQuran.pageNumber} onChange={changePage}>
                    {pgOptions}
                </select>
            </div>

            <button onMouseEnter={() => pagePrefetch(1)} onClick={() => dispatch(nextPage())} disabled={brQuran.pageNumber == 604} className="size-6 text-sm rounded-full grid place-content-center transition-colors bg-bg hover:bg-hover_bg active:scale-95 disabled:text-gray-500 disabled:cursor-not-allowed">
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>

        </div>
    )
}