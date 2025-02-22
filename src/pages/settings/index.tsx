import PrayersTimeSettings from "./components/PrayersTimeSettings";

export default function SettingsPage() {
    return (
        <section className="p-3">

            <div>
                <div className="mb-4 text-on_surface border-b border-on_surface pb-1 font-medium">اعدادات الحساب و اوقات الصلوات</div>
                <div className="sm:w-[80%] mx-auto">
                    <PrayersTimeSettings />
                </div>
            </div>
        </section>
    );
}
