import { lazy, useEffect } from 'react';
import { NavLink, Route, Routes } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookQuran,
  faCalendarDay,
  faGear,
  faHandPointUp,
} from '@fortawesome/free-solid-svg-icons';
import Quran_Browsing from './pages/quran/browsing';
import Quran_Listening from './pages/quran/listening';
import ChoosedReciter from './pages/quran/listening/components/ChoosedReciter';

// App pages
const PrayerTimesPage = lazy(() => import('./pages/home/index'));
const QuranPage = lazy(() => import('./pages/quran/index'));
const AzkarPage = lazy(() => import('./pages/azkar/index'));
const SettingsPage = lazy(() => import('./pages/settings/index'));

export default function App() {
  useEffect(() => {
    document.body.setAttribute('data-theme', 'dark');
  }, []);

  return (
    <div className="container">
      <main className="h-[calc(100svh-60px)] overflow-auto">
        <Routes>
          <Route path="/" element={<PrayerTimesPage />} />
          <Route path="/quran" element={<QuranPage />} />
          <Route path="/quran/browsing" element={<Quran_Browsing />} />
          <Route path="/quran/listening" element={<Quran_Listening />} />
          <Route
            path="/quran/listening/:reciterID"
            element={<ChoosedReciter />}
          />
          <Route path="/athkar" element={<AzkarPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </main>

      <nav className="flex h-[60px] flex-row-reverse items-center justify-between bg-surface px-2 sm:px-4">
        <div>
          <img src="/pics/logo/logo-32.png" alt="" />
        </div>

        <ul className="flex items-center gap-8">
          <li className="h-fit justify-between *:flex *:flex-col *:items-center *:text-on_surface *:transition-colors hover:*:text-primary">
            <NavLink
              to={'/'}
              className={({ isActive }) => (isActive ? 'activeLink' : '')}
            >
              <FontAwesomeIcon icon={faCalendarDay} />
              <span className="text-sm">اليوم</span>
            </NavLink>
          </li>
          <li className="h-fit justify-between *:flex *:flex-col *:items-center *:text-on_surface *:transition-colors hover:*:text-primary">
            <NavLink
              to={'/quran'}
              className={({ isActive }) => (isActive ? 'activeLink' : '')}
            >
              <FontAwesomeIcon icon={faBookQuran} />
              <span className="text-sm">القران</span>
            </NavLink>
          </li>
          <li className="h-fit justify-between *:flex *:flex-col *:items-center *:text-on_surface *:transition-colors hover:*:text-primary">
            <NavLink
              to={'/athkar'}
              className={({ isActive }) => (isActive ? 'activeLink' : '')}
            >
              <FontAwesomeIcon icon={faHandPointUp} />
              <span className="text-sm">الاذكار</span>
            </NavLink>
          </li>
          <li className="h-fit justify-between *:flex *:flex-col *:items-center *:text-on_surface *:transition-colors hover:*:text-primary">
            <NavLink
              to={'/settings'}
              className={({ isActive }) => (isActive ? 'activeLink' : '')}
            >
              <FontAwesomeIcon icon={faGear} />
              <span className="text-sm">الاعدادات</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
