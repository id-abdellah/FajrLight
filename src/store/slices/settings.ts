import { createSlice } from "@reduxjs/toolkit";
import { Range } from "../../types/Range";


type InitialState = {

    prayerTimes: {
        location: {
            latitude: number
            longitude: number
            city: string
            city_ar: string
            countryCode: string
        }
        calculationMethod: {
            enabled: boolean,
            which: Range<0, 25>
        }
        clockType: 24 | 12
    }

    browsingQuranPage: {
        pageNumber: number
        quranType: "quran-simple" | "quran-simple-clean"
        fontSize: number
        showCopy: boolean
        tafsir: {
            enabled: boolean
            which: "ar.muyassar" | "ar.qurtubi" | "ar.baghawi"
        },

        reciter: {
            enabled: boolean
            which: string
        }
    }
}


const initialState: InitialState = {
    prayerTimes: {
        location: {
            latitude: 27.125286,
            longitude: -13.162500,
            city: "laayoune",
            city_ar: "العيون",
            countryCode: "MA"
        },
        calculationMethod: {
            enabled: false,
            which: 21
        },
        clockType: 24
    },
    
    browsingQuranPage: {
        pageNumber: 1,
        quranType: "quran-simple",
        showCopy: true,
        fontSize: 20,
        tafsir: {
            enabled: true,
            which: "ar.muyassar"
        },
        reciter: {
            enabled: true,
            which: "ar.alafasy"
        }
    }
}



const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        nextPage: (state) => {
            const currentPage = state.browsingQuranPage.pageNumber
            if (currentPage == 604) return
            state.browsingQuranPage.pageNumber = currentPage + 1
        },
        prevPage: (state) => {
            const currentPage = state.browsingQuranPage.pageNumber
            if (currentPage == 1) return
            state.browsingQuranPage.pageNumber = currentPage - 1
        },
        setPage: (state, action) => {
            state.browsingQuranPage.pageNumber = action.payload
        }
    }
})


export const {nextPage, prevPage, setPage} = settingsSlice.actions
export default settingsSlice.reducer