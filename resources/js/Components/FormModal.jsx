import Form from "./Form";
import { useEffect } from "react";
import ContainerFluid from "./ContainerFluid";
import ButtonPrimary from "./ButtonPrimary";

const FormModal = ({
    title,
    children,
    modalRef,
    formRef,
    processing,
    handleSubmit,
    size = "lg",
}) => {
    useEffect(() => {
        const handleHide = () => {
            const form = formRef.current;

            if (form) {
                formRef.current.reset();
                formRef.current.classList.remove("was-validated");
            }
        };

        const modal = modalRef.current;

        if (modal) {
            modal.addEventListener("hidden.bs.modal", handleHide);
        }

        return () => {
            if (modal) {
                modal.addEventListener("hidden.bs.modal", handleHide);
            }
        };
    }, [modalRef]);

    const ModalClose = () => {
        return (
            <button
                type="button"
                aria-label="Fechar"
                className="btn-close"
                data-bs-dismiss="modal"
            ></button>
        );
    };

    const ButtonClose = () => {
        return (
            <button
                type="button"
                data-bs-dismiss="modal"
                className="btn btn-danger"
            >
                Fechar
            </button>
        );
    };

    let modalSize = "";

    if (size === "sm") {
        modalSize = "modal-sm";
    } else if (size === "lg") {
        modalSize = "modal-lg";
    } else if (size === "xl") {
        modalSize = "modal-xl";
    }

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
                        <ModalClose />
                    </div>

                    <div className="modal-body">
                        <Form formRef={formRef} handleSubmit={handleSubmit}>
                            <ContainerFluid>{children}</ContainerFluid>
                        </Form>
                    </div>

                    <div className="modal-footer">
                        <ButtonClose />

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
