import { PrayerTimesData } from '..';
import { readableDate } from '../../../utils/readableDate';

type Props = {
  prayerTimesData: PrayerTimesData;
};

export default function MonthTimingsCalendar({ prayerTimesData }: Props) {
  return (
    <div className="bg-surface py-3">
      <div className="text-md flex justify-center gap-3">
        <span>
          {readableDate(
            prayerTimesData.gregorianDate,
            prayerTimesData.weekDay,
            'gregorian',
          )}
        </span>
        <span className="italic">الموافق</span>
        <span>
          {readableDate(
            prayerTimesData.hijriDate,
            prayerTimesData.weekDay,
            'hijri',
          )}
        </span>
      </div>
      {/* <div>
                <a href="#" className="text-secondary mx-auto block w-fit hover:text-hover_secondary hover:underline text-xs">
                    الحصة الشهرية
                </a>
            </div> */}
    </div>
  );
}
