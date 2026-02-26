"use client";

import {
  cloneElement,
  createContext,
  useContext,
  useState,
  ReactElement,
  ReactNode,
  useRef,
  useEffect,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";

// Define types for the modal context
interface ModalContextType {
  openName: string;
  open: (name: string) => void;
  close: () => void;
}

interface ModalProps {
  children: ReactNode;
}

interface OpenProps {
  children: ReactElement;
  opens: string;
}

interface WindowProps {
  children: ReactElement;
  name: string;
}

// Create context with proper typing
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Custom hook for modal context
function useModal(): ModalContextType {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a Modal provider");
  }
  return context;
}

// Outside click hook
const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [callback]);

  return ref;
};

// Main Modal component
function Modal({ children }: ModalProps) {
  const [openName, setOpenName] = useState<string>("");

  const close = () => setOpenName("");
  const open = (name: string) => setOpenName(name);

  return (
    <ModalContext.Provider value={{ open, close, openName }}>
      {children}
    </ModalContext.Provider>
  );
}

// Open component
function Open({ children, opens: openWindowName }: OpenProps) {
  const { open } = useModal();
  return cloneElement(children, {
    onClick: () => open(openWindowName),
  });
}

// Window component
function Window({ children, name }: WindowProps) {
  const { openName, close } = useModal();
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed top-0 left-0 w-full h-full bg-[rgba(255, 255, 255, 0.1)] backdrop-blur-md z-50 transition-all duration-500 dark:bg-[rgba(0, 0, 0, 0.3)]">
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-8 transition-all duration-500 dark:bg-[#18212f]"
        ref={ref}
      >
        <button
          className="bg-none border-none p-1 rounded-sm absolute top-3 right-4 hover:bg-[#f3f4f6] dark:text-[#9ca3af] dark:hover:bg-[#374151] hover:cursor-pointer"
          onClick={close}
          aria-label="Close modal"
        >
          <HiXMark size={24} />
        </button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body,
  );
}

// Attach subcomponents to Modal
Modal.Window = Window;
Modal.Open = Open;

export default Modal;
