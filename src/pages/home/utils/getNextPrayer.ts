
/**
 * Getting which prayer is next without using API
 * 
 * 1. first, get the current time in hours and minutes
 * 2. then, compare the current time with all prayers time in order
 * 3. the first prayer time bigger than the current time is the next prayer
 * 4. if there is no prayer time bigger than the current time, then the next prayer is "Fajr"
 */

export function getNextPrayer(currentPrayersTimings: Record<number, string>) {
    // getting the current time and convert it into minuts
    const now = new Date()
    // const time = (now.getHours() * 60) + now.getMinutes()
    const time = (now.getHours() * 60) + now.getMinutes()

    const entries = Object.entries(currentPrayersTimings)

    for (let i = 0; i < entries.length; i++) {
        const currEntry = entries[i]
        const prayerID = currEntry[0]
        const prayerTime = currEntry[1]
        const prayerTimeInMiutes = (Number(prayerTime.split(":")[0]) * 60) + Number(prayerTime.split(":")[1])

        if (prayerTimeInMiutes > time) return Number(prayerID)
    }

    // Next day Fajr
    return 1
}