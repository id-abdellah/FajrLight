import {
  faArrowLeft,
  faArrowRight,
  faGear,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { RooteState } from '../../../../store/store';
import { nextPage, prevPage, setPage } from '../../../../store/slices/settings';
import { useDispatch } from 'react-redux';
import { API } from '../../../../utils/API';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

const pgOptions = Array.from({ length: 604 }, (_, i) => (
  <option
    key={i + 1}
    value={i + 1}
    className="bg-surface font-semibold text-on_bg"
  >
    {i + 1}
  </option>
));

export default function Navigation() {
  const { browsingQuranPage: brQuran } = useSelector(
    (state: RooteState) => state.settings,
  );
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const pagePrefetch = (which: 1 | -1) => {
    const currentPage = brQuran.pageNumber;
    if (which == 1 && currentPage !== 604) {
      queryClient.prefetchQuery({
        queryKey: ['quranRead', currentPage + 1, brQuran.quranType],
        queryFn: () => API.getQuranPage(currentPage + 1, brQuran.quranType),
        staleTime: Infinity,
        gcTime: Infinity,
      });
      queryClient.prefetchQuery({
        queryKey: ['quranTafsir', currentPage + 1, brQuran.tafsir.which],
        queryFn: () => API.getQuranPage(currentPage + 1, brQuran.tafsir.which),
        staleTime: Infinity,
        gcTime: Infinity,
      });
    } else if (which == -1 && currentPage !== 1) {
      queryClient.prefetchQuery({
        queryKey: ['quranRead', currentPage - 1, brQuran.quranType],
        queryFn: () => API.getQuranPage(currentPage - 1, brQuran.quranType),
        staleTime: Infinity,
        gcTime: Infinity,
      });
      queryClient.prefetchQuery({
        queryKey: ['quranTafsir', currentPage - 1, brQuran.tafsir.which],
        queryFn: () => API.getQuranPage(currentPage - 1, brQuran.tafsir.which),
        staleTime: Infinity,
        gcTime: Infinity,
      });
    }
  };

  const changePage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    dispatch(setPage(value));
  };

  return (
    <div className="absolute bottom-1 left-1/2 flex w-[180px] -translate-x-1/2 justify-between rounded-md bg-primary px-2 py-1 font-serif">
      <button
        onMouseEnter={() => pagePrefetch(-1)}
        onClick={() => dispatch(prevPage())}
        disabled={brQuran.pageNumber == 1}
        className="grid size-6 place-content-center rounded-full bg-bg text-sm transition-colors hover:bg-hover_bg active:scale-95 disabled:cursor-not-allowed disabled:text-gray-500"
      >
        <span>
          <FontAwesomeIcon icon={faArrowRight} />
        </span>
      </button>

      <div className="flex items-center gap-4">
        <button
          className="text-sm transition-colors hover:text-bg active:scale-95"
          popoverTarget="brQuranSettingsPopover"
        >
          <FontAwesomeIcon icon={faGear} />
        </button>
        <select
          name=""
          id=""
          className="rounded-sm bg-transparent text-center text-sm font-semibold"
          value={brQuran.pageNumber}
          onChange={changePage}
        >
          {pgOptions}
        </select>
      </div>

      <button
        onMouseEnter={() => pagePrefetch(1)}
        onClick={() => dispatch(nextPage())}
        disabled={brQuran.pageNumber == 604}
        className="grid size-6 place-content-center rounded-full bg-bg text-sm transition-colors hover:bg-hover_bg active:scale-95 disabled:cursor-not-allowed disabled:text-gray-500"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
    </div>
  );
}
