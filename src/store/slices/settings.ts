import { createSlice } from '@reduxjs/toolkit';
import { Range } from '../../types/Range';

type InitialState = {
  prayerTimes: {
    location: {
      latitude: number;
      longitude: number;
      city: string;
      city_ar: string;
      countryCode: string;
    };
    calculationMethod: {
      enabled: boolean;
      which: Range<0, 25>;
    };
    clockType: 24 | 12;
  };

  browsingQuranPage: {
    pageNumber: number;
    quranType: 'quran-simple' | 'quran-simple-clean';
    showCopy: boolean;
    fontSize: {
      value: number;
      min: number;
      max: number;
    };
    tafsir: {
      enabled: boolean;
      which: 'ar.muyassar' | 'ar.qurtubi' | 'ar.baghawi';
    };
    reciter: {
      enabled: boolean;
      which: string;
    };
  };
};

const initialState: InitialState = {
  prayerTimes: {
    location: {
      latitude: 27.125286,
      longitude: -13.1625,
      city: 'laayoune',
      city_ar: 'العيون',
      countryCode: 'MA',
    },
    calculationMethod: {
      enabled: false,
      which: 21,
    },
    clockType: 24,
  },

  browsingQuranPage: {
    pageNumber: 480,
    quranType: 'quran-simple',
    showCopy: true,
    fontSize: {
      value: 20,
      min: 10,
      max: 46,
    },
    tafsir: {
      enabled: true,
      which: 'ar.muyassar',
    },
    reciter: {
      enabled: true,
      which: 'ar.alafasy',
    },
  },
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    nextPage: (state) => {
      const currentPage = state.browsingQuranPage.pageNumber;
      if (currentPage == 604) return;
      state.browsingQuranPage.pageNumber = currentPage + 1;
    },
    prevPage: (state) => {
      const currentPage = state.browsingQuranPage.pageNumber;
      if (currentPage == 1) return;
      state.browsingQuranPage.pageNumber = currentPage - 1;
    },
    setPage: (state, action) => {
      state.browsingQuranPage.pageNumber = action.payload;
    },

    toggleTafsir: (state) => {
      state.browsingQuranPage.tafsir.enabled =
        !state.browsingQuranPage.tafsir.enabled;
    },
    setTafsir: (state, action) => {
      const isEnabled = state.browsingQuranPage.tafsir.enabled;
      if (!isEnabled) return;
      state.browsingQuranPage.tafsir.which = action.payload;
    },

    toggleQuranType: (state) => {
      const currentType = state.browsingQuranPage.quranType;
      state.browsingQuranPage.quranType =
        currentType === 'quran-simple' ? 'quran-simple-clean' : 'quran-simple';
    },

    setReciter: (state, action) => {
      state.browsingQuranPage.reciter.which = action.payload;
    },
    reciterToggle: (state) => {
      state.browsingQuranPage.reciter.enabled =
        !state.browsingQuranPage.reciter.enabled;
    },

    setFontSize: (state, action) => {
      if (action.payload == '+') {
        state.browsingQuranPage.fontSize.value += 2;
      } else if (action.payload == '-') {
        state.browsingQuranPage.fontSize.value -= 2;
      }
    },

    showCopyIconToggle: (state) => {
      state.browsingQuranPage.showCopy = !state.browsingQuranPage.showCopy;
    },
  },
});

export const {
  nextPage,
  prevPage,
  setPage,
  toggleTafsir,
  setTafsir,
  toggleQuranType,
  setReciter,
  setFontSize,
  showCopyIconToggle,
  reciterToggle,
} = settingsSlice.actions;
export default settingsSlice.reducer;
