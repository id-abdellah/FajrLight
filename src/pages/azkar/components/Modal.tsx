import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Supplications } from ".."
import { faXmark } from "@fortawesome/free-solid-svg-icons"

// import supplicationIndex from "../../../../public/resources/supplications/index.json"

type Props = {
    choosedSuppID: string | null
    suppData: Supplications | []
    closeModal: () => void
}

export default function Modal({ suppData, closeModal }: Props) {

    return (
        <div id="supplicationModal" popover="manual" className="w-full h-full bg-surface/40" >
            <div className="grid place-content-center h-full">

                <div className="bg-surface max-w-[280px] max-h-[400px] sm:max-w-[350px] rounded-md text-on_bg relative p-4">

                    {/* close button */}
                    <div className="w-fit absolute top-0 -right-2 -translate-y-1/2">
                        <button
                            onClick={closeModal}
                            popoverTarget="supplicationModal"
                            popoverTargetAction="hide"
                            className="bg-error block size-5 rounded-full transition-colors hover:bg-hover_error"
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>

                    <div className="overflow-auto max-h-full space-y-4">
                        {
                            suppData.map((supp, i) => {
                                return (
                                    <div key={i} className="text-justify leading-6">
                                        <p>
                                            <span className="text-on_secondary bg-secondary inline-grid place-content-center font-bold text-xs size-4 rounded-full ml-2">{i + 1}</span>
                                            {supp.ARABIC_TEXT}
                                        </p>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
            </div>
        </div >
    )
}
