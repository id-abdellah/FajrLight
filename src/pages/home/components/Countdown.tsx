import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CurrentDate, PRAYERS_ID } from '..';
import { useEffect, useState } from 'react';
import { formatCountdown, getNextPrayerDiff } from '../utils/coutdown';
import { getNextPrayer } from '../utils/getNextPrayer';

type Props = {
  currentDate?: CurrentDate;
  nextPrayerID: number | null;
  setNextPrayerID: React.Dispatch<React.SetStateAction<number | null>>;
  currentPrayersTimings: Record<number, string>;
};

export type NextPrayerData = {
  name: string;
  time: {
    hour: number;
    minuts: number;
  };
};

export default function Countdown({
  nextPrayerID,
  setNextPrayerID,
  currentPrayersTimings,
}: Props) {
  const [countdown, setCountdown] = useState('00:00:00');

  // this useEffect logic won't run unless there is nextPrayerID
  // countdown till next prayer
  useEffect(() => {
    if (!nextPrayerID) return;

    const nextPrayerData: NextPrayerData = {
      name: PRAYERS_ID[nextPrayerID].en,
      time: {
        hour: Number(currentPrayersTimings[nextPrayerID].split(':')[0]),
        minuts: Number(currentPrayersTimings[nextPrayerID].split(':')[1]),
      },
    };

    const countdownInterval = setInterval(() => {
      const diff = getNextPrayerDiff(nextPrayerData);
      setCountdown(formatCountdown(diff));
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [nextPrayerID, currentPrayersTimings]);

  // set the next prayer id state in the parent component
  useEffect(() => {
    setNextPrayerID(getNextPrayer(currentPrayersTimings));
  });

  return (
    <div className="relative h-36 w-full bg-gray-500 bg-[url('/pics/hero-quran.webp')] bg-cover bg-blend-multiply sm:h-40">
      <div className="flex h-full flex-col items-center justify-center">
        <div className="text-2xl font-semibold">
          متبق على صلاة {nextPrayerID && PRAYERS_ID[+nextPrayerID].ar}
        </div>
        <div className="mt-1 flex w-24 select-none flex-row-reverse gap-1 text-2xl font-medium tabular-nums">
          <span>-</span>
          <span>{countdown}</span>
        </div>
      </div>
      <div className="absolute bottom-1 left-1/2 mt-1 flex -translate-x-1/2 items-center justify-center gap-2 text-sm">
        <span className="text-primary">
          <FontAwesomeIcon icon={faLocationDot} />
        </span>
        <span>العيون</span>
      </div>
    </div>
  );
}
