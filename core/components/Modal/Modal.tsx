import ReactDOM from "react-dom";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  closeModal?: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  closeModal,
  children,
}): JSX.Element => {
  const isBrowser = typeof window !== "undefined";

  const modalBody = isOpen ? (
    <div
      className="absolute top-0 right-0 bottom-0 left-0 bg-primary/50 z-30 flex items-center justify-center"
      onClick={closeModal}
    >
      <div className="w-max h-max px-4 py-4 bg-secondary">{children}</div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(modalBody, document.getElementById("modal"));
  } else {
    return null;
  }
};
