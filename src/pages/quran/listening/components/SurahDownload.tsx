/* eslint-disable no-unsafe-optional-chaining */
import { faCheck, faCloudArrowDown, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

type Props = {
    surahURL: string,
    surahName: string,
    reciterName: string
}
type DownloadStatus = "idle" | "downloading" | "success" | "error"


export default function SurahDownload({ surahURL, surahName, reciterName }: Props) {

    const [downloadStatus, setDownloadStatus] = useState<DownloadStatus>("idle")
    const [progress, setProgress] = useState<number>(0)

    return (
        <button className="hover:text-hover_secondary cursor-pointer"
            onClick={() => downloadSurah(surahURL, setProgress, downloadStatus, setDownloadStatus, surahName, reciterName)}>

            {
                downloadStatus == "idle"
                    ?
                    <FontAwesomeIcon icon={faCloudArrowDown} />
                    : downloadStatus == "downloading"
                        ?
                        progress + "%"
                        : downloadStatus == "error"
                            ?
                            <FontAwesomeIcon icon={faTriangleExclamation} className="text-red-800" />
                            :
                            <FontAwesomeIcon icon={faCheck} className="text-primary" />
            }
        </button>
    )
}




async function downloadSurah(
    url: string,
    setProgress: React.Dispatch<React.SetStateAction<number>>,
    downloadStatus: DownloadStatus,
    setDownloadStatus: React.Dispatch<React.SetStateAction<DownloadStatus>>,
    surahName: string,
    reciterName: string
) {
    if (downloadStatus == "downloading") return;
    setDownloadStatus("downloading")
    try {
        const response = await fetch(url)
        const contentLength = response.headers.get("content-length")
        let loaded = 0;
        const stream = new ReadableStream({
            async start(controller) {
                if (!response.body) throw new Error("")
                const reader = response.body.getReader()
                while (true) {
                    const { done, value } = await reader?.read()
                    if (done) {
                        controller.close()
                        setProgress(100)
                        setDownloadStatus("idle")
                        break;
                    }
                    loaded += value.byteLength;
                    setProgress(Math.round((loaded / Number(contentLength)) * 100))
                    controller.enqueue(value)
                }
            },
        });
        anchorElement(new Response(stream), surahName, reciterName)
    } catch {
        setDownloadStatus("error")
    }
}

async function anchorElement(finalResponse: Response, surahName, reciterName) {
    const blob = await finalResponse.blob()
    const a = document.createElement("a")
    a.href = URL.createObjectURL(blob)
    a.download = `${reciterName} - ${surahName}.mp3`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}