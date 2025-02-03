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
    }

    browsingQuranPage: {
        pageNumber: Range<1, 605>
        quranType: "quran-simple" | "quran-simple-clean"

        tafsir: {
            enabled: boolean
            which: "ar.muyassar" | "ar.qurtubi" | "ar.baghawi"
        },
        reciter: {
            enabled: boolean
            which: string
        }
    }

    clockType: 24 | 12
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
        }  
    },
    browsingQuranPage: {
        pageNumber: 1,
        quranType: "quran-simple",
        tafsir: {
            enabled: true,
            which: "ar.muyassar"
        },
        reciter: {
            enabled: true,
            which: "ar.abdurrahmaansudais"
        }
    },
    clockType: 24
}


const settingsSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {}
})


// export const {} = settingsSlice.actions
export default settingsSlice.reducer