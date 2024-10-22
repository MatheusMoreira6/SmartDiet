import { useRef } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";

const FormModal = ({
    show,
    title,
    children,
    validated,
    processing,
    handleClose,
    handleSubmit,
    size = "lg",
}) => {
    const formRef = useRef(null);

    const performSubmit = () => {
        formRef.current.dispatchEvent(
            new Event("submit", { bubbles: true, cancelable: true })
        );
    };

    return (
        <Modal
            show={show}
            size={size}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            scrollable={true}
        >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Container fluid>
                    <Form
                        noValidate
                        ref={formRef}
                        validated={validated}
                        onSubmit={handleSubmit}
                    >
                        {children}
                    </Form>
                </Container>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                    Cancelar
                </Button>

                <Button variant="primary" onClick={performSubmit}>
                    {processing ? "Salvando..." : "Salvar"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default FormModal;
