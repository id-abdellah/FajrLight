import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  text: string;
  onClick: () => void;
};

export default function Button({ text, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="flex w-[120px] items-center justify-between rounded-md border border-primary bg-primary px-3 py-2 font-medium text-on_primary transition-colors hover:bg-transparent hover:text-primary active:scale-95"
    >
      <span>{text}</span>
      <FontAwesomeIcon icon={faChevronLeft} />
    </button>
  );
}
