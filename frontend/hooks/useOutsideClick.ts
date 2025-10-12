import { useEffect, useRef, RefObject } from "react";

function useOutsideClick<T extends HTMLElement>(
  handler: () => void,
  listenCapture: boolean = true
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(
    function () {
      function handleClick(e: MouseEvent) {
        if (ref.current && !ref.current.contains(e.target as Node)) {
          handler();
        }
      }

      document.addEventListener("click", handleClick, listenCapture);

      return () =>
        document.removeEventListener("click", handleClick, listenCapture);
    },
    [handler, listenCapture]
  );

  return ref;
}

export default useOutsideClick;
