import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { API } from '../../../../utils/API';
import Loader from '../../../../components/Loader';
import ErrorOccured from '../../../../components/Error';
import surahs from '../../../../../public/resources/surahs.json';
import SurahAudio from './SurahAudio';
import SurahDownload from './SurahDownload';

export default function ChoosedReciter() {
  const { reciterID } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['resiter', reciterID],
    queryFn: () => API.getReciters(),
    staleTime: Infinity,
    gcTime: Infinity,
    select: (data) => {
      return data.reciters.filter((r) => r.id == Number(reciterID))[0];
    },
  });

  if (isLoading) return <Loader />;
  if (isError) return <ErrorOccured />;

  const reciter = {
    reciterName: data.name,
    reciterServer: data.moshaf[0].server,
    reciterAvailableSurah: data.moshaf[0].surah_list.split(','),
  };

  return (
    <div className="px-3 pt-5">
      <div className="mb-5 text-center text-xl font-bold">
        {reciter.reciterName}
      </div>
      <div className="grid grid-cols-1 gap-2 min-[400px]:grid-cols-2 md:grid-cols-3">
        {surahs.map((surah) => {
          const surahNumber = surah.number;
          if (!reciter.reciterAvailableSurah.includes(String(surahNumber)))
            return;
          const surahAudioURL = `${reciter.reciterServer}${String(surah.number).padStart(3, '0')}.mp3`;
          return (
            <div
              key={surah.englishName}
              className="flex justify-between rounded-md bg-on_bg p-2 text-bg"
            >
              <div>{surah.name}</div>
              <div className="flex items-center gap-2 transition-colors">
                <SurahDownload
                  surahURL={surahAudioURL}
                  surahName={surah.name}
                  reciterName={reciter.reciterName}
                />
                <SurahAudio audioURL={surahAudioURL} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
