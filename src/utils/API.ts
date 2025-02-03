
// const OPENWEATHERMAP_API_KEY = import.meta.env.VITE_OPENWEATHERMAP_KEY
// const GEONAMES_USERNAME = import.meta.env.VITE_GEONAMES_USERNAME


const base_url = "https://api.aladhan.com/v1"

export const API = {
    async monthPrayerTimes(year: number, month: number,city: string, country: string) {
        const response = await fetch(`${base_url}/calendarByCity/${year}/${month}?city=${city}&country=${country}`)
        const data = await response.json()
        return data
    },

    async dayPrayerTimes(date: {day: number, month: number, year: number}, lat: number, long: number) {

        const fDate = `${date.day.toString().padStart(2, "0")}-${date.month.toString().padStart(2, "0")}-${date.year}`

        const response = await fetch(`${base_url}/timings/${fDate}?latitude=${lat.toFixed(2)}&longitude=${long.toFixed(2)}`)
        const data = await response.json()
        return data
    },
}