import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type Props = {
    text: string
    onClick: () => void
}

export default function Button({ text, onClick }: Props) {

    return (
        <button onClick={onClick} className="flex items-center justify-between font-medium bg-primary text-on_primary py-2 px-3 w-[120px] rounded-md border border-primary hover:bg-transparent hover:text-primary transition-colors active:scale-95">
            <span>
                {text}
            </span>
            <FontAwesomeIcon icon={faChevronLeft} />
        </button>
    )
}