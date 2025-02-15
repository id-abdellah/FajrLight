import { useNavigate } from "react-router";
import Hadith from "../../components/Hadith";
import Button from "./components/Button";

export default function QuranPage() {

    const navigate = useNavigate()

    return (
        <section className="p-3 h-full grid place-content-center">

            <div className="space-y-4">

                <div>
                    <Hadith page="quran" />
                </div>


                <div className="flex flex-col gap-2 items-center">
                    <Button text="تصفح" onClick={() => navigate("browsing")} />
                    <Button text="استمع" onClick={() => navigate("listening")} />
                </div>

            </div>


        </section>
    )
}