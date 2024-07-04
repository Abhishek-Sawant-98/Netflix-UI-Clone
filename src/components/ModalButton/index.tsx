import React, { forwardRef } from "react";
import './index.scss';

interface Props {
    targetModal: string;
}

const ModalButton = forwardRef(({ targetModal }: Props, ref) => {
    return (
        <button
            ref={ref as React.LegacyRef<HTMLButtonElement>}
            className="visually-hidden"
            aria-label="modalButton"
            data-bs-toggle="modal"
            data-bs-target={`#${targetModal}`}
        ></button>
    );
});

export default ModalButton;
