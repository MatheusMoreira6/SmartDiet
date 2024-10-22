import { Container } from "react-bootstrap";

const WrapperContainer = ({ children }) => {
    return (
        <Container className="rounded shadow-lg my-5 p-3">{children}</Container>
    );
};

export default WrapperContainer;
