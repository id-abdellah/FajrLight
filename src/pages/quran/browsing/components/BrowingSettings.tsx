import { useSelector } from 'react-redux';
import { RooteState } from '../../../../store/store';
import { useDispatch } from 'react-redux';
import {
  reciterToggle,
  setFontSize,
  setReciter,
  setTafsir,
  showCopyIconToggle,
  toggleQuranType,
  toggleTafsir,
} from '../../../../store/slices/settings';
import Switcher from '../../../../components/Switcher';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

export default function BrowsingSettings() {
  const { browsingQuranPage: brQuran } = useSelector(
    (state: RooteState) => state.settings,
  );
  const dispatch = useDispatch();

  return (
    <div
      className="absolute inset-auto left-1/2 top-1/2 min-h-72 min-w-[250px] -translate-x-1/2 -translate-y-[55%] space-y-3 rounded-md bg-surface p-4 text-base text-on_bg shadow-[0_0px_20px_3px_black]"
      id="brQuranSettingsPopover"
      popover="auto"
    >
      <div>
        <div className="mb-2 border-b border-b-on_surface pb-1 text-on_surface">
          عام
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>حجم الخط</div>
            <div className="flex select-none items-center gap-2">
              <span
                className="cursor-pointer text-[12px] hover:text-on_surface active:scale-95"
                onClick={() => dispatch(setFontSize('+'))}
              >
                <FontAwesomeIcon icon={faPlus} />
              </span>
              <span className="w-4 text-center">{brQuran.fontSize.value}</span>
              <span
                className={`cursor-pointer text-[12px] hover:text-on_surface active:scale-95`}
                onClick={() => dispatch(setFontSize('-'))}
              >
                <FontAwesomeIcon icon={faMinus} />
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>ايقونة النسخ</div>
            <Switcher
              isChecked={brQuran.showCopy}
              onChange={() => dispatch(showCopyIconToggle())}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>التشكيل</div>
            <Switcher
              isChecked={brQuran.quranType === 'quran-simple'}
              onChange={() => dispatch(toggleQuranType())}
            />
          </div>
        </div>
      </div>

      <div>
        <div className="mb-2 border-b border-b-on_surface pb-1 text-on_surface">
          التفسير
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>اظهار التفسير</div>
            <Switcher
              isChecked={brQuran.tafsir.enabled}
              onChange={() => dispatch(toggleTafsir())}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>اختر التفسير</div>
            <select
              className="rounded-sm bg-surface ring-2 ring-on_surface"
              value={brQuran.tafsir.which}
              onChange={(e) => dispatch(setTafsir(e.target.value))}
              disabled={!brQuran.tafsir.enabled}
            >
              <option value="ar.baghawi">تفسير البغوي</option>
              <option value="ar.muyassar">التفسير الميسر</option>
              <option value="ar.qurtubi">تفسير القرطبي</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <div className="mb-2 border-b border-b-on_surface pb-1 text-on_surface">
          القارئ
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>ايقونة القارئ</div>
            <Switcher
              isChecked={brQuran.reciter.enabled}
              onChange={() => dispatch(reciterToggle())}
            />
          </div>

          <div className="space-y-1">
            <div>اختر القارئ</div>
            <select
              className="w-full rounded-sm bg-surface ring-2 ring-on_surface"
              value={brQuran.reciter.which}
              onChange={(e) => dispatch(setReciter(e.target.value))}
            >
              <option value="ar.abdulbasitmurattal">
                عبد الباسط عبد الصمد المرتل
              </option>
              <option value="ar.abdullahbasfar">عبد الله بصفر</option>
              <option value="ar.abdurrahmaansudais">عبدالرحمن السديس</option>
              <option value="ar.abdulsamad">عبدالباسط عبدالصمد</option>
              <option value="ar.shaatree">أبو بكر الشاطري</option>
              <option value="ar.ahmedajamy">أحمد بن علي العجمي</option>
              <option value="ar.alafasy">مشاري العفاسي</option>
              <option value="ar.hanirifai">هاني الرفاعي</option>
              <option value="ar.husary">محمود خليل الحصري</option>
              <option value="ar.husarymujawwad">
                محمود خليل الحصري (المجود)
              </option>
              <option value="ar.hudhaify">علي بن عبدالرحمن الحذيفي</option>
              <option value="ar.ibrahimakhbar">إبراهيم الأخضر</option>
              <option value="ar.mahermuaiqly">ماهر المعيقلي</option>
              <option value="ar.minshawi">محمد صديق المنشاوي</option>
              <option value="ar.minshawimujawwad">
                محمد صديق المنشاوي (المجود)
              </option>
              <option value="ar.muhammadayyoub">محمد أيوب</option>
              <option value="ar.muhammadjibreel">محمد جبريل</option>
              <option value="ar.saoodshuraym">سعود الشريم</option>
              <option value="ar.parhizgar">شهریار پرهیزگار</option>
              <option value="ar.aymanswoaid">أيمن سويد</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
