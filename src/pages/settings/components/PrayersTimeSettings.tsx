import { useSelector } from "react-redux";
import Switcher from "../../../components/Switcher";
import LocationSearch from "./_LocationSearch";
import { RooteState } from "../../../store/store";
import { useDispatch } from "react-redux";
import { calculationToggle, setcCaclMethod } from "../../../store/slices/settings";
import calcMethods from "../../../../public/resources/calculationMethods.json"

export default function PrayersTimeSettings() {
    const ptState = useSelector((state: RooteState) => state.settings.prayerTimes)
    const dispatch = useDispatch()

    return (
        <div>
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <div>المنطقة الجغرافية</div>
                    <div><LocationSearch /></div>
                </div>

                <div className="flex items-center justify-between">
                    <div>تحديد طريقة حساب الصلوات عبر الموقع تلقائيا</div>
                    <div><Switcher isChecked={ptState.calculationMethod.enabled} onChange={() => dispatch(calculationToggle())} /></div>
                </div>

                <div className="flex items-center justify-between">
                    <div>اختر طريقة الحساب</div>
                    <select
                        value={String(ptState.calculationMethod.which)}
                        disabled={!ptState.calculationMethod.enabled}
                        onChange={(e) => dispatch(setcCaclMethod({
                            which: +e.target.value,
                            name: calcMethods[e.target.value]
                        }))}
                        className="text-on_bg bg-surface appearance-none p-1 w-[180px] rounded-sm hover:outline-none">
                        {
                            Object.entries(calcMethods).map((cm) => {
                                return <option key={cm[0]} value={String(cm[0])}>{cm[1]}</option>
                            })
                        }
                    </select>
                </div>
            </div>

        </div>
    )
}