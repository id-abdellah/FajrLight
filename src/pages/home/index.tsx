/* eslint-disable react-refresh/only-export-components */
import { useQuery } from '@tanstack/react-query';
import { API } from '../../utils/API';
import { useSelector } from 'react-redux';
import { RooteState } from '../../store/store';
import { useState } from 'react';
import MonthTimingsCalendar from './components/MonthCalendar';
import Countdown from './components/Countdown';
import Loader from '../../components/Loader';
import ErrorOccured from '../../components/Error';

export type CurrentDate = {
  day: number;
  month: number;
  year: number;
};

export type PrayerTimesData = {
  timings: Record<number, string>;
  hijriDate: string;
  gregorianDate: string;
  weekDay: string;
};

export const PRAYERS_ID: Record<number, Record<string, string>> = {
  1: {
    en: 'Fajr',
    ar: 'الفجر',
  },
  2: {
    en: 'Dhuhr',
    ar: 'الظهر',
  },
  3: {
    en: 'Asr',
    ar: 'العصر',
  },
  4: {
    en: 'Maghrib',
    ar: 'المغرب',
  },
  5: {
    en: 'Isha',
    ar: 'العشاء',
  },
};

export default function PrayerTimesPage() {
  // settings state
  const settings = useSelector((state: RooteState) => state.settings);

  // current date
  const [currentDate] = useState<CurrentDate>({
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  // next prayer name and id
  const [nextPrayerID, setNextPrayerID] = useState<null | number>(null);

  // getting current day prayer times
  const {
    data: responseData,
    isLoading,
    isError,
  } = useQuery({
    queryFn: () =>
      API.dayPrayerTimes(
        currentDate,
        settings.prayerTimes.location.latitude,
        settings.prayerTimes.location.longitude,
        settings.prayerTimes.calculationMethod.enabled
          ? settings.prayerTimes.calculationMethod.which
          : undefined,
      ),
    queryKey: [
      'currentDayPrayerTimes',
      settings.prayerTimes.location.latitude,
      settings.prayerTimes.location.longitude,
    ],
    refetchOnWindowFocus: false,
    gcTime: 0,
    staleTime: 0,
  });

  if (isLoading) return <Loader />;
  if (isError) return <ErrorOccured />;

  const prayerTimesData: PrayerTimesData = {
    timings: {
      1: responseData.data.timings.Fajr,
      2: responseData.data.timings.Dhuhr,
      3: responseData.data.timings.Asr,
      4: responseData.data.timings.Maghrib,
      5: responseData.data.timings.Isha,
    },
    hijriDate: responseData.data.date.hijri.date,
    weekDay: responseData.data.date.hijri.weekday.ar,
    gregorianDate: responseData.data.date.gregorian.date,
  };

  return (
    <section>
      <Countdown
        currentDate={currentDate}
        setNextPrayerID={setNextPrayerID}
        nextPrayerID={nextPrayerID}
        currentPrayersTimings={prayerTimesData.timings}
      />

      <MonthTimingsCalendar prayerTimesData={prayerTimesData} />

      <div className="mx-auto mt-4 w-4/5 md:w-[65%]">
        {Object.entries(prayerTimesData.timings).map(
          ([prayerID, prayerTime], i) => {
            const styles = `flex justify-between py-1 px-2 items-center rounded-md font-medium ${+prayerID == nextPrayerID ? 'bg-primary/40' : ''}`;
            return (
              <div key={i} className={styles}>
                <span>{PRAYERS_ID[Number(prayerID)].ar}</span>
                <span>{prayerTime}</span>
              </div>
            );
          },
        )}
      </div>

      <div className="mt-6 flex select-none flex-col items-center">
        <span className="font-bold text-secondary/90">
          إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا
        </span>
        <span className="mt-1 text-xs text-on_surface">النساء 103</span>
      </div>
    </section>
  );
}
