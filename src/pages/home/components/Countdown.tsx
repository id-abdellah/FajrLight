import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CurrentDate, PRAYERS_ID } from "..";
import { useEffect, useState } from "react";
import { formatCountdown, getNextPrayerDiff } from "../utils/coutdown";
import { getNextPrayer } from "../utils/getNextPrayer";

type Props = {
    currentDate?: CurrentDate
    nextPrayerID: number | null
    setNextPrayerID: React.Dispatch<React.SetStateAction<number | null>>
    currentPrayersTimings: Record<number, string>
}

export type NextPrayerData = {
    name: string
    time: {
        hour: number
        minuts: number
    }
}

export default function Countdown({ nextPrayerID, setNextPrayerID, currentPrayersTimings }: Props) {

    const [countdown, setCountdown] = useState("00:00:00")

    // this useEffect logic won't run unless there is nextPrayerID
    // countdown till next prayer
    useEffect(() => {
        if (!nextPrayerID) return

        const nextPrayerData: NextPrayerData = {
            name: PRAYERS_ID[nextPrayerID].en,
            time: {
                hour: Number(currentPrayersTimings[nextPrayerID].split(":")[0]),
                minuts: Number(currentPrayersTimings[nextPrayerID].split(":")[1])
            }
        }

        const countdownInterval = setInterval(() => {
            const diff = getNextPrayerDiff(nextPrayerData);
            setCountdown(formatCountdown(diff))
        }, 1000)

        return () => clearInterval(countdownInterval)
    }, [nextPrayerID, currentPrayersTimings])

    // set the next prayer id state in the parent component
    useEffect(() => {
        setNextPrayerID(getNextPrayer(currentPrayersTimings))
    })


    return (
        <div className=" w-full h-36 sm:h-40 bg-cover bg-[url('pics/hero-quran.webp')] bg-gray-500 bg-blend-multiply relative">
            <>
                <div className="flex flex-col justify-center items-center h-full">
                    <div className="font-semibold text-2xl">متبق على صلاة {nextPrayerID && PRAYERS_ID[+nextPrayerID].ar}</div>
                    <div className="text-2xl font-medium flex flex-row-reverse gap-1 mt-1 tabular-nums w-24 select-none">
                        <span>-</span>
                        <span>{countdown}</span>
                    </div>
                </div>
                <div className="flex gap-2 items-center justify-center text-sm mt-1 absolute bottom-1 left-1/2 -translate-x-1/2">
                    <span className="text-primary"><FontAwesomeIcon icon={faLocationDot} /></span>
                    <span>العيون</span>
                </div>
            </>
        </div>
    )
}
