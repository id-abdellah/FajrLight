import React, { useEffect, useState } from "react"
import supplicationsIndex from "../../../public/resources/supplications/index.json"
import Modal from "./components/Modal"
import Hadith from "../../components/Hadith"

export type Supplication = {
    ID: number
    ARABIC_TEXT: string
    LANGUAGE_ARABIC_TRANSLATED_TEXT: string
    TRANSLATED_TEXT: string
    REPEAT: number
    AUDIO: string
}

export type Supplications = Supplication[]

export type SupplicationModule = { data: Supplications }


const mainThreeSupps = supplicationsIndex.slice(0, 3)

export default function AzkarPage() {

    const [choosedSuppID, setChoosedSuppID] = useState<string | null>(null)
    const [suppData, setSuppData] = useState<[] | Supplications>([])


    useEffect(() => {
        // Dynamically import JSON files based on choosedSupp state
        const loadJson = async () => {
            if (!choosedSuppID) return;
            try {
                const jsonModule: SupplicationModule = await import(`../../../public/resources/supplications/referrence/${choosedSuppID}.json`)
                setSuppData(jsonModule.data)
            } catch {
                console.log("Error occured when loading data")
            }
        }

        loadJson()
    }, [choosedSuppID])


    function openModal(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        const id = e.currentTarget.dataset.suppId
        if (!id) return
        setChoosedSuppID(id)
    }

    function closeModal(): void {
        setSuppData([])
        setChoosedSuppID(null)
    }

    return (
        <section className="p-3">

            <Hadith page="azkar" />

            {/* Supplications List */}
            <div className="mt-5 space-y-5 text-on_primary font-medium text-sm">

                <div className="*:block grid grid-cols-3 gap-2">
                    {
                        mainThreeSupps.map((supp, i) => {
                            return (
                                <button
                                    onClick={(e) => openModal(e)}
                                    popoverTarget="supplicationModal"
                                    popoverTargetAction="show"
                                    data-supp-id={supp.ID}
                                    key={i}
                                    className="bg-primary py-1 px-2.5 rounded-md border-[2px] border-primary hover:bg-transparent hover:text-on_bg transition-colors"
                                >
                                    {supp.TITLE}
                                </button>
                            )
                        })
                    }
                </div>

                <div className="*:block grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {
                        supplicationsIndex.map((supp, i) => {
                            if (supp.PRIORITY) return;
                            return (
                                <button
                                    onClick={(e) => openModal(e)}
                                    popoverTarget="supplicationModal"
                                    popoverTargetAction="show"
                                    data-supp-id={supp.ID}
                                    key={i}
                                    className="bg-primary py-1 px-2.5 rounded-md border-[2px] border-primary hover:bg-transparent hover:text-on_bg transition-colors">
                                    {supp.TITLE}
                                </button>
                            )
                        })
                    }
                </div>
            </div>

            <Modal choosedSuppID={choosedSuppID} suppData={suppData} closeModal={closeModal} />
        </section >
    )
}