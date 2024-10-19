import Form from "./Form";
import ButtonDanger from "./ButtonDanger";
import ButtonPrimary from "./ButtonPrimary";
import ContainerFluid from "./ContainerFluid";

const Modal = ({
    title,
    children,
    formRef,
    hendleSubmit,
    processing,
    size = "lg",
}) => {
    let modalSize = "";

    if (size === "sm") {
        modalSize = "modal-sm";
    } else if (size === "lg") {
        modalSize = "modal-lg";
    } else if (size === "xl") {
        modalSize = "modal-xl";
    }

    return (
        <div
            tabindex="-1"
            className="modal fade"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
        >
            <div className={`modal-dialog modal-dialog-scrollable ${size}`}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>

                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Fechar"
                            data-bs-dismiss="modal"
                        ></button>
                    </div>

                    <div className="modal-body">
                        <ContainerFluid>
                            <Form formRef={formRef} hendleSubmit={hendleSubmit}>
                                {children}
                            </Form>
                        </ContainerFluid>
                    </div>

                    <div className="modal-footer">
                        <ButtonDanger type="reset" formRef={formRef}>
                            Fechar
                        </ButtonDanger>

                        <ButtonPrimary formRef={formRef} disabled={processing}>
                            {processing ? "Salvando..." : "Salvar"}
                        </ButtonPrimary>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
