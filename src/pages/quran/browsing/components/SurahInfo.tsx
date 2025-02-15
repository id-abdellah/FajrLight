import { Ayah } from "../types"

type Props = {
    isBeginning: boolean
    surahObject: Ayah["surah"]
}

export default function SurahInfo({ isBeginning, surahObject }: Props) {

    return (
        <div>
            {
                isBeginning &&
                <div className="my-6 w-fit mx-auto text-center">
                    <div className="font-black text-[40px] text-secondary">
                        <p>{surahObject.name}</p>
                    </div>
                    <div className="flex gap-4 justify-center mt-2 text-secondary">
                        <span>{surahObject.revelationType == "Meccan" ? "مكية" : "مدنية"}</span>
                        <span>عدد اياتها: {surahObject.numberOfAyahs}</span>
                        <span>ترتيبها المصحفي: {surahObject.number}</span>
                    </div>
                </div>
            }
        </div>
    )
}
