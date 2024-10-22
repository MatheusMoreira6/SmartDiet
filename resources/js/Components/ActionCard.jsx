import { Card } from "react-bootstrap";

const ActionCard = ({ title, children, footer, onClick, disabled }) => {
    const renderHeader = () => {
        if (!title) return null;

        return (
            <Card.Header>
                <h5 className="text-center">{title}</h5>
            </Card.Header>
        );
    };

    const renderBody = () => {
        if (!title && !footer) return children;

        return <Card.Body>{children}</Card.Body>;
    };

    const renderFooter = () => {
        if (!footer) return null;

        return (
            <Card.Footer>
                <p className="text-center my-2">{footer}</p>
            </Card.Footer>
        );
    };

    return (
        <Card
            onClick={onClick}
            disabled={disabled}
            className="m-auto card-pointer"
            style={{ width: "280px", height: "350px" }}
        >
            {renderHeader()}
            {renderBody()}
            {renderFooter()}
        </Card>
    );
};

export default ActionCard;
