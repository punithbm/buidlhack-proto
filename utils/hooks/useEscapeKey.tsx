import { useEventListener } from "./useEventListener";

function useEscapeKey(KeyboardEvent: "keyup" | "keydown", handler: () => void): void {
    useEventListener(KeyboardEvent, (event) => {
        if (event.key === "Escape") {
            handler();
        }
    });
}

export { useEscapeKey };
