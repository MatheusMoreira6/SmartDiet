import Form from "./Form";
import { Modal } from "bootstrap";
import { useEffect } from "react";
import ContainerFluid from "./ContainerFluid";
import ButtonPrimary from "./ButtonPrimary";
import ButtonDanger from "./ButtonDanger";

const ModalClose = ({ performClose }) => {
    return (
        <button
            type="button"
            aria-label="Fechar"
            className="btn-close"
            onClick={performClose}
        ></button>
    );
};

const ModalSize = ({ size }) => {
    let modalSize = "";

    if (size === "sm") {
        modalSize = "modal-sm";
    } else if (size === "lg") {
        modalSize = "modal-lg";
    } else if (size === "xl") {
        modalSize = "modal-xl";
    }

    return modalSize;
};

const FormModal = ({
    title,
    children,
    modalRef,
    modalOpen,
    formRef,
    processing,
    handleSubmit,
    performClose,
    size = "lg",
}) => {
    const modalSize = ModalSize({ size });

    useEffect(() => {
        const modal = modalRef.current;

        if (modal) {
            const modalInstance = Modal.getOrCreateInstance(modalRef.current);

            if (modalOpen) {
                modalInstance.show();
            } else {
                modalInstance.hide();

                const form = formRef.current;

                if (form) {
                    formRef.current.reset();
                    formRef.current.classList.remove("was-validated");
                }
            }

            return () => {
                modalInstance.dispose();
            };
        }
    }, [modalOpen, modalRef]);

    const performSubmit = () => {
        const form = formRef.current;

        if (form) {
            formRef.current.dispatchEvent(
                new Event("submit", { bubbles: true, cancelable: true })
            );
        }
    };

    return (
        <div
            tabIndex="-1"
            ref={modalRef}
            className="modal fade"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
        >
            <div
                className={`modal-dialog modal-dialog-scrollable ${modalSize}`}
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <ModalClose performClose={performClose} />
                    </div>

                    <div className="modal-body">
                        <Form formRef={formRef} handleSubmit={handleSubmit}>
                            <ContainerFluid>{children}</ContainerFluid>
                        </Form>
                    </div>

                    <div className="modal-footer">
                        <ButtonDanger onClick={performClose}>
                            Cancelar
                        </ButtonDanger>

                        <ButtonPrimary
                            disabled={processing}
                            onClick={performSubmit}
                        >
                            {processing ? "Salvando..." : "Salvar"}
                        </ButtonPrimary>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormModal;
