/* eslint-disable no-unsafe-optional-chaining */
import {
    faCheck,
    faCloudArrowDown,
    faTriangleExclamation,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';

type Props = {
    surahURL: string;
    surahName: string;
    reciterName: string;
};
type DownloadStatus = 'idle' | 'downloading' | 'success' | 'error';

export default function SurahDownload({
    surahURL,
    surahName,
    reciterName,
}: Props) {
    const [downloadStatus, setDownloadStatus] = useState<DownloadStatus>('idle');
    const [progress, setProgress] = useState<number>(0);

    const abortControllerRef = useRef<null | AbortController>(null);

    const cancelDownload = () => {
        if (!abortControllerRef.current) return;
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
        setDownloadStatus('idle');
        setProgress(0);
    };

    return (
        <>
            {downloadStatus === 'idle' ? (
                <button
                    onClick={() =>
                        downloadSurah(
                            surahURL,
                            setProgress,
                            downloadStatus,
                            setDownloadStatus,
                            surahName,
                            reciterName,
                            abortControllerRef,
                        )
                    }
                >
                    <FontAwesomeIcon icon={faCloudArrowDown} />
                </button>
            ) : downloadStatus === 'downloading' ? (
                <div className="relative flex flex-row-reverse items-center gap-2">
                    <div className="relative size-6 rounded-full bg-secondary/40">
                        <div
                            className="absolute left-0 top-0 size-6 rounded-full transition-all"
                            style={{
                                backgroundImage: `conic-gradient(green ${progress}%, transparent 0%)`,
                            }}
                        ></div>
                        <div className="absolute left-1/2 top-1/2 grid size-5 -translate-x-1/2 -translate-y-1/2 place-content-center rounded-full bg-on_bg text-xs font-medium">
                            {progress}
                        </div>
                    </div>
                    <button
                        title="Cancel The Download"
                        onClick={cancelDownload}
                        className="text-md grid place-content-center rounded-full transition-colors hover:text-error"
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
            ) : downloadStatus === 'error' ? (
                <div>
                    <FontAwesomeIcon
                        icon={faTriangleExclamation}
                        className="text-red-800"
                    />
                </div>
            ) : (
                <div>
                    <FontAwesomeIcon icon={faCheck} className="text-primary" />
                </div>
            )}
        </>
    );
}

async function downloadSurah(
    url: string,
    setProgress: React.Dispatch<React.SetStateAction<number>>,
    downloadStatus: DownloadStatus,
    setDownloadStatus: React.Dispatch<React.SetStateAction<DownloadStatus>>,
    surahName: string,
    reciterName: string,
    controllerRef: React.RefObject<AbortController | null>,
) {
    if (downloadStatus == 'downloading') return;

    controllerRef.current = new AbortController();
    const { signal } = controllerRef.current;

    setDownloadStatus('downloading');
    try {
        const response = await fetch(url, { signal });
        const contentLength = response.headers.get('content-length');
        let loaded = 0;
        const stream = new ReadableStream({
            async start(controller) {
                if (!response.body) throw new Error('');
                const reader = response.body.getReader();
                while (true) {
                    const { done, value } = await reader?.read();
                    if (done) {
                        controller.close();
                        setProgress(100);
                        setDownloadStatus('idle');
                        break;
                    }
                    loaded += value.byteLength;
                    setProgress(Math.round((loaded / Number(contentLength)) * 100));
                    controller.enqueue(value);
                }
            },
        });
        anchorElement(new Response(stream), surahName, reciterName);
    } catch {
        setDownloadStatus('error');
    }
}

async function anchorElement(
    finalResponse: Response,
    surahName: string,
    reciterName: string,
) {
    const blob: Blob = await finalResponse.blob();
    const blobURL: string = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = blobURL;
    a.download = `${reciterName} - ${surahName}.mp3`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(blobURL);
}
