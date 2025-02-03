import { NextPrayerData } from "../components/Countdown";

export function getNextPrayerDiff(nextPrayerData: NextPrayerData): number {
    // today
    const currentDate = new Date();
    // next prayer date
    const nextPrayer_Date = new Date();
    if (nextPrayerData.name == "Fajr") {
        nextPrayer_Date.setDate(nextPrayer_Date.getDate() + 1);
    }
    nextPrayer_Date.setHours(nextPrayerData.time.hour, nextPrayerData.time.minuts, 0);

    const diff = nextPrayer_Date.getTime() - currentDate.getTime();
    return diff;
}


export function formatCountdown(diff: number): string {
    const seconds = Math.floor((diff / 1000) % 60)
    const minutes = Math.floor((diff / (1000 * 60)) % 60)
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
}