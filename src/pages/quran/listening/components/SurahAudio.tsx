import {
  faPause,
  faPlay,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import Loader from '../../../../components/Loader';

type Props = {
  audioURL: string;
};

type AudioStatus = 'play' | 'pause' | 'loading' | 'error';

export default function SurahAudio({ audioURL }: Props) {
  const [enabled, setEnabled] = useState(false);
  const [audioStatus, setAudioStatus] = useState<AudioStatus>('play');
  const audioElement = useRef<null | HTMLAudioElement>(null);

  const toggleAudio = () => {
    if (!enabled) {
      setEnabled(true);
      return;
    }
    if (!audioElement.current) return;
    const audio = audioElement.current;
    if (audioStatus == 'pause') {
      setAudioStatus('play');
      audio.pause();
    } else if (audioStatus == 'play') {
      setAudioStatus('pause');
      audio.play();
    }
  };

  return (
    <button
      className="grid size-6 place-content-center rounded-full bg-secondary text-sm hover:bg-hover_secondary"
      onClick={() => toggleAudio()}
    >
      {audioStatus == 'play' ? (
        <FontAwesomeIcon icon={faPlay} />
      ) : audioStatus == 'pause' ? (
        <FontAwesomeIcon icon={faPause} />
      ) : audioStatus == 'error' ? (
        <FontAwesomeIcon
          icon={faTriangleExclamation}
          className="text-red-800"
        />
      ) : (
        <Loader />
      )}
      <audio
        autoPlay
        onLoadStart={() => setAudioStatus('loading')}
        onCanPlay={() => setAudioStatus('pause')}
        onEnded={() => setAudioStatus('play')}
        onError={() => setAudioStatus('error')}
        src={enabled ? audioURL : undefined}
        ref={audioElement}
      ></audio>
    </button>
  );
}
