import { lazy, useEffect } from 'react';
import { NavLink, Route, Routes } from 'react-router';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookQuran, faCalendarDay, faGear, faHandPointUp } from "@fortawesome/free-solid-svg-icons"

// App pages
const PrayerTimesPage = lazy(() => import("./pages/home/index"))
const QuranPage = lazy(() => import("./pages/quran/index"))
const AzkarPage = lazy(() => import("./pages/azkar/index"))
const SettingsPage = lazy(() => import("./pages/settings/index"))

export default function App() {
   useEffect(() => {
      document.body.setAttribute("data-theme", "dark")
   }, []);


   return (
      <div className='container'>

         <main className='h-[calc(100svh-60px)] overflow-auto'>
            <Routes>
               <Route path='/' element={<PrayerTimesPage />} />
               <Route path='/quran' element={<QuranPage />} />
               <Route path='/athkar' element={<AzkarPage />} />
               <Route path='/settings' element={<SettingsPage />} />
               <Route path='*' element={<div>Page Not Found</div>} />
            </Routes>
         </main>

         <nav className='h-[60px] bg-surface flex flex-row-reverse justify-between items-center px-2 sm:px-4'>

            <div>
               اوديو
            </div>

            <ul className='flex gap-8 items-center'>
               <li className='*:flex *:flex-col *:items-center justify-between *:text-on_surface *:transition-colors hover:*:text-primary h-fit'>
                  <NavLink to={"/"} className={({ isActive }) => (isActive ? "activeLink" : "")}>
                     <FontAwesomeIcon icon={faCalendarDay} />
                     <span className='text-sm'>اليوم</span>
                  </NavLink>
               </li>
               <li className='*:flex *:flex-col *:items-center justify-between *:text-on_surface *:transition-colors hover:*:text-primary h-fit'>
                  <NavLink to={"/quran"} className={({ isActive }) => (isActive ? "activeLink" : "")}>
                     <FontAwesomeIcon icon={faBookQuran} />
                     <span className='text-sm'>القران</span>
                  </NavLink>
               </li>
               <li className='*:flex *:flex-col *:items-center justify-between *:text-on_surface *:transition-colors hover:*:text-primary h-fit'>
                  <NavLink to={"/athkar"} className={({ isActive }) => (isActive ? "activeLink" : "")}>
                     <FontAwesomeIcon icon={faHandPointUp} />
                     <span className='text-sm'>الاذكار</span>
                  </NavLink>
               </li>
               <li className='*:flex *:flex-col *:items-center justify-between *:text-on_surface *:transition-colors hover:*:text-primary h-fit'>
                  <NavLink to={"/settings"} className={({ isActive }) => (isActive ? "activeLink" : "")}>
                     <FontAwesomeIcon icon={faGear} />
                     <span className='text-sm'>الاعدادات</span>
                  </NavLink>
               </li>
            </ul>

         </nav >

      </div >
   );
}