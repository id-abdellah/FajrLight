import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import Loader from "../../../../components/Loader";

type Props = {
    audioURL: string | undefined
}

const AudioLoading = <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><circle cx={18} cy={12} r={0} fill="currentColor"><animate attributeName="r" begin={0.67} calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle><circle cx={12} cy={12} r={0} fill="currentColor"><animate attributeName="r" begin={0.33} calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle><circle cx={6} cy={12} r={0} fill="currentColor"><animate attributeName="r" begin={0} calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle></svg>;

export default function AyahListen({ audioURL }: Props) {

    const [audioState, setAudioState] = useState<"pause" | "play" | "loading">("pause")

    const audioRef = useRef<null | HTMLAudioElement>(null)

    const audioControle = () => {
        if (!audioRef.current) return
        if (!audioRef.current.src) return
        const audio = audioRef.current
        if (audioState == "pause") {
            setAudioState("play")
            audio.play()
        } else if (audioState == "play") {
            setAudioState("pause")
            audio.pause()
        }
    }

    if (!audioURL) return <Loader />

    return (
        <button className="bg-primary hover:bg-hover_primary" onClick={() => audioControle()}>
            {
                audioState == "pause"
                    ?
                    <FontAwesomeIcon icon={faPlay} />
                    :
                    audioState == "loading"
                        ?
                        AudioLoading
                        :
                        <FontAwesomeIcon icon={faPause} />
            }
            <audio
                onEnded={() => setAudioState("pause")}
                ref={audioRef}
                src={audioURL}>
            </audio>
        </button>
    )
}