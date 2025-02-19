import { useSelector } from 'react-redux';
import { RooteState } from '../../../store/store';
import { useQuery } from '@tanstack/react-query';
import { API } from '../../../utils/API';
import Loader from '../../../components/Loader';
import { Ayah, AyahAudio } from './types';
import ErrorOccured from '../../../components/Error';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClone } from '@fortawesome/free-solid-svg-icons';
import SurahInfo from './components/SurahInfo';
import Navigation from './components/Navigation';
import AyahListen from './components/AyahAudio';
import BrowsingSettings from './components/BrowingSettings';

export default function Quran_Browsing() {
  const { browsingQuranPage: brQuran } = useSelector(
    (state: RooteState) => state.settings,
  );

  /* quran */
  const quranSimple = useQuery({
    queryFn: () => API.getQuranPage(brQuran.pageNumber, brQuran.quranType),
    queryKey: ['quranRead', brQuran.pageNumber, brQuran.quranType],
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  /* tafsir */
  const tafsir = useQuery({
    queryFn: () => API.getQuranPage(brQuran.pageNumber, brQuran.tafsir.which),
    queryKey: ['quranTafsir', brQuran.pageNumber, brQuran.tafsir.which],
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: brQuran.tafsir.enabled,
  });

  /* reciter */
  const reciter = useQuery({
    queryFn: () => API.getQuranPage(brQuran.pageNumber, brQuran.reciter.which),
    queryKey: ['quranReciter', brQuran.pageNumber, brQuran.reciter.which],
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: brQuran.reciter.enabled,
  });

  if (quranSimple.isLoading) return <Loader />;
  if (quranSimple.isError) return <ErrorOccured />;

  const pageAyahs: Ayah[] = quranSimple.data.data.ayahs;
  const pageTafsir: Ayah[] = tafsir.isSuccess
    ? tafsir.data.data.ayahs
    : undefined;
  const pageReciter: AyahAudio[] = reciter.isSuccess
    ? reciter.data.data.ayahs
    : undefined;

  return (
    <section className="relative h-full p-3">
      <div className="h-full overflow-auto">
        {pageAyahs.map((ayah, i: number) => {
          const isBeginning = ayah.numberInSurah == 1;
          const ayahTafsir =
            pageTafsir && brQuran.tafsir.enabled
              ? pageTafsir[i].text
              : undefined;
          const ayahReciter =
            pageReciter && brQuran.reciter.enabled
              ? pageReciter[i].audio
              : undefined;

          return (
            <div key={ayah.number}>
              <SurahInfo isBeginning={isBeginning} surahObject={ayah.surah} />

              <div className="mb-6">
                {/* Ayah */}
                <p
                  style={{ fontSize: brQuran.fontSize.value }}
                  className="text-justify"
                >
                  <span className="pe-2">{ayah.text}</span>
                  <span className="rounded-sm bg-secondary px-1 font-serif text-xs font-bold text-black">
                    {ayah.numberInSurah}
                  </span>
                </p>

                {/* copy & listen */}
                <div className="my-2 flex gap-3 *:grid *:h-5 *:w-6 *:place-content-center *:rounded-sm *:text-xs *:transition-colors">
                  {brQuran.reciter.enabled && (
                    <AyahListen audioURL={ayahReciter} />
                  )}
                  {brQuran.showCopy && (
                    <button
                      onClick={() => copyToClipboard(ayah.text)}
                      className="bg-surface hover:bg-hover_surface"
                    >
                      <FontAwesomeIcon icon={faClone} />
                    </button>
                  )}
                </div>

                {/* tafsir */}
                {ayahTafsir && (
                  <div className="mb-0 text-justify text-sm text-on_surface">
                    {ayahTafsir}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Navigation />
      <BrowsingSettings />
    </section>
  );
}

async function copyToClipboard(text: string): Promise<void> {
  await navigator.clipboard.writeText(text);
}
