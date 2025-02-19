import { Link } from 'react-router';
import { Reciter } from '../types';

type Props = {
  reciters: [string, Reciter[]][];
};

export default function RecitersList({ reciters }: Props) {
  return (
    <>
      {reciters.map((entry, i) => {
        const letter = entry[0];
        const letterReciters = entry[1];
        if (letterReciters.length == 0) return;
        return (
          <div key={i}>
            <div
              className="mb-3 grid size-6 place-content-center rounded-md bg-primary font-serif font-bold"
              id={letter}
            >
              {letter}
            </div>
            <div className="text-md grid grid-cols-3 gap-3 *:block max-sm:grid-cols-2">
              {letterReciters.map((reciter, i) => {
                const reciterID = reciter.id;

                return (
                  <Link
                    className="rounded-[4px] bg-on_bg p-2 text-bg hover:brightness-90"
                    key={i}
                    to={`${reciterID}`}
                  >
                    {reciter.name}
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}
