import { useEffect, useState } from "react";

export default function useNetworkState(): { isOnline: boolean } {
    const [isOnline, setIsOnline] = useState<boolean>(true)

    function updateNetworkState(): void {
        setIsOnline(navigator.onLine)
    }

    useEffect(() => {
        window.addEventListener("load", updateNetworkState)
        window.addEventListener("online", updateNetworkState)
        window.addEventListener("offline", updateNetworkState)

        return () => {
            window.removeEventListener("load", updateNetworkState)
            window.removeEventListener("online", updateNetworkState)
            window.removeEventListener("offline", updateNetworkState)

        }
    })

    return { isOnline }
}