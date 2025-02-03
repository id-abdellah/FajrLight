/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";

export default function usePrevious<T>(value: T): T | undefined {
    const prevRef = useRef<T | undefined>(undefined);
    const currentRef = useRef<T>(value);

    useEffect(() => {
        prevRef.current = currentRef.current;
        currentRef.current = value;
    }, [value]);

    return prevRef.current;
}