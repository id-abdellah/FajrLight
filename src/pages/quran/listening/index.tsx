import { useQuery } from '@tanstack/react-query';
import { API } from '../../../utils/API';
import Loader from '../../../components/Loader';
import ErrorOccured from '../../../components/Error';
import RecitersList from './components/RecitersList';
import { useState } from 'react';
import { RecitersGroupedByLetters, RecitersReponse } from './types';

export default function Quran_Listening() {
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isLoading, isError } = useQuery({
    queryFn: () => API.getReciters(),
    queryKey: ['recitersList'],
    staleTime: Infinity,
    gcTime: Infinity,
    select: (data: RecitersReponse): RecitersGroupedByLetters => {
      const groupedByLetter = data.reciters.reduce((acc, curr) => {
        const letter = ['أ', 'إ', 'ا'].includes(curr.letter)
          ? 'ا'
          : curr.letter;
        if (!(letter in acc)) {
          acc[letter] = [];
        }
        acc[letter].push(curr);
        return acc;
      }, {});
      return groupedByLetter;
    },
  });

  if (isLoading) return <Loader />;
  if (isError || !data) return <ErrorOccured />;

  let reciters = Object.entries(data).sort();
  reciters = reciters.map((entry) => {
    const l = entry[0];
    const rcs = entry[1].filter((p) => p.name.includes(searchQuery));
    return [l, rcs];
  });

  return (
    <section className="p-4">
      <div>
        <div className="space-y-6">
          <input
            className="rounded-sm bg-on_bg p-1 focus:outline-none"
            placeholder="ابحث عن قارئ"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="flex flex-row-reverse gap-3">
            <div className="h-fit space-y-2">
              {reciters.map((r, i) => {
                const letter = r[0];
                return (
                  <a
                    href={'#' + letter}
                    key={i}
                    className="text-md grid size-6 place-content-center rounded-full bg-primary font-serif font-bold transition-colors hover:brightness-75"
                  >
                    {letter}
                  </a>
                );
              })}
            </div>
            <div className="flex-1 space-y-6">
              <RecitersList reciters={reciters} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
