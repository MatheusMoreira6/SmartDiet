import { Button, Container, Modal } from "react-bootstrap";

const FormModal = ({
    show,
    title,
    children,
    handleClose,
    handleSubmit,
    processing,
    size = "lg",
}) => {
    return (
        <Modal
            size={size}
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            scrollable={true}
        >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Container fluid>{children}</Container>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                    Cancelar
                </Button>

                <Button variant="primary" onClick={handleSubmit}>
                    {processing ? "Salvando..." : "Salvar"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default FormModal;
