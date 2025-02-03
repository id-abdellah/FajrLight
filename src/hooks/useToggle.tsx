import { useState } from "react";

export default function useToggle(defaultValue: boolean): [boolean, ((value?: boolean) => void)] {
    const [value, setValue] = useState<boolean>(defaultValue)

    function toggleValue(value?: boolean): void {
        setValue(currentValue => value !== undefined ? value : !currentValue)
    }

    return [value, toggleValue]
}