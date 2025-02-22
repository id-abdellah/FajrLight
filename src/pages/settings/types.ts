import { RooteState } from "../../store/store"

export type SelectOption = {
    name: string
    country: string
    dispatchedLocation: RooteState["settings"]["prayerTimes"]["location"]
}


// geocoding response

export type GeoCity = {
    name: string
    local_names?: Record<string, string>
    lat: number
    lon: number
    country: string
    state?: string
}

export type GeocodingResponse = GeoCity[]