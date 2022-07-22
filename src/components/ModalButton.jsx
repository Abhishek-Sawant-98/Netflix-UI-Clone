import { forwardRef } from "react";

const ModalButton = forwardRef(({ targetModal }, ref) => {
  return (
    <button
      ref={ref}
      className="visually-hidden"
      aria-label="modalButton"
      data-bs-toggle="modal"
      data-bs-target={`#${targetModal}`}
    ></button>
  );
});

export default ModalButton;
