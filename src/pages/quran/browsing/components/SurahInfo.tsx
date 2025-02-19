import { Ayah } from '../types';

type Props = {
  isBeginning: boolean;
  surahObject: Ayah['surah'];
};

export default function SurahInfo({ isBeginning, surahObject }: Props) {
  return (
    <div>
      {isBeginning && (
        <div className="mx-auto my-6 w-fit text-center">
          <div className="text-[40px] font-black text-secondary">
            <p>{surahObject.name}</p>
          </div>
          <div className="mt-2 flex justify-center gap-4 text-secondary">
            <span>
              {surahObject.revelationType == 'Meccan' ? 'مكية' : 'مدنية'}
            </span>
            <span>عدد اياتها: {surahObject.numberOfAyahs}</span>
            <span>ترتيبها المصحفي: {surahObject.number}</span>
          </div>
        </div>
      )}
    </div>
  );
}
