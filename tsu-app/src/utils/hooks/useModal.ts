import { useState } from "react";

export const useModal = () => {
    const [stateModal, setStateModal] = useState<boolean>(false);

    const openModal = () => setStateModal(true);
    const closeModal = () => setStateModal(false);

    return { stateModal, openModal, closeModal };
}