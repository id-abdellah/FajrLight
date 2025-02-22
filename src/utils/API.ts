const OPENWEATHERMAP_API_KEY = import.meta.env.VITE_OPENWEATHERMAP_KEY
// const GEONAMES_USERNAME = import.meta.env.VITE_GEONAMES_USERNAME

const base_url = 'https://api.aladhan.com/v1';

export const API = {
    async monthPrayerTimes(
        year: number,
        month: number,
        city: string,
        country: string,
    ) {
        const response = await fetch(
            `${base_url}/calendarByCity/${year}/${month}?city=${city}&country=${country}`,
        );
        const data = await response.json();
        return data;
    },

    async dayPrayerTimes(
        date: { day: number; month: number; year: number },
        lat: number,
        long: number,
        method: number | undefined,
    ) {
        const fDate = `${date.day.toString().padStart(2, '0')}-${date.month.toString().padStart(2, '0')}-${date.year}`;

        const url = `${base_url}/timings/${fDate}?latitude=${lat.toFixed(2)}&longitude=${long.toFixed(2)}${method ? `&method=${method}` : ''}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error()
        const data = await response.json();
        return data;
    },

    async getQuranPage(page: number, edition: string) {
        const url = `https://api.alquran.cloud/v1/page/${page}/${edition}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error()
        const data = await response.json();
        return data;
    },

    async getReciters() {
        const response = await fetch('/resources/reciters.json');
        const data = await response.json();
        return data;
    },

    async geocoding(q: string) {
        const url = `https://api.openweathermap.org/geo/1.0/direct?q=${q}&limit=5&appid=${OPENWEATHERMAP_API_KEY}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    }
};
