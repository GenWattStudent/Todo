import { useRef } from "react";

export default function useDebounce() {
    const timer = useRef<null | number>(null);

    const debounce = (callback: () => void, delay: number) => {
        if (timer.current) clearTimeout(timer.current);
        timer.current = window.setTimeout(callback, delay);
    };

    return { debounce };
}