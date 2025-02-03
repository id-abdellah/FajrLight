/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";

export default function usePrevious(value: any): any {
    const currentState = useRef(value)
    const prevState = useRef()

    if (currentState.current !== value) {
        prevState.current = currentState.current;
        currentState.current = value
    }

    return prevState.current
}