import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Supplications } from '..';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

// import supplicationIndex from "../../../../public/resources/supplications/index.json"

type Props = {
  choosedSuppID: string | null;
  suppData: Supplications | [];
  closeModal: () => void;
};

export default function Modal({ suppData, closeModal }: Props) {
  return (
    <div
      id="supplicationModal"
      popover="manual"
      className="h-full w-full bg-surface/40"
    >
      <div className="grid h-full place-content-center">
        <div className="relative max-h-[400px] max-w-[280px] rounded-md bg-surface p-4 text-on_bg sm:max-w-[350px]">
          {/* close button */}
          <div className="absolute -right-2 top-0 w-fit -translate-y-1/2">
            <button
              onClick={closeModal}
              popoverTarget="supplicationModal"
              popoverTargetAction="hide"
              className="block size-5 rounded-full bg-error transition-colors hover:bg-hover_error"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          <div className="max-h-full space-y-4 overflow-auto">
            {suppData.map((supp, i) => {
              return (
                <div key={i} className="text-justify leading-6">
                  <p>
                    <span className="ml-2 inline-grid size-4 place-content-center rounded-full bg-secondary text-xs font-bold text-on_secondary">
                      {i + 1}
                    </span>
                    {supp.ARABIC_TEXT}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
