const Card = ({ title, children, footer, onClick, disabled }) => {
    const renderHeader = () => {
        if (!title) return null;

        return (
            <div className="card-header">
                <h5 className="text-center">{title}</h5>
            </div>
        );
    };

    const renderBody = () => {
        if (!title && !footer) return children;

        return <div className="card-body">{children}</div>;
    };

    const renderFooter = () => {
        if (!footer) return null;

        return (
            <div className="card-footer">
                <p className="text-center my-2">{footer}</p>
            </div>
        );
    };

    return (
        <div
            onClick={onClick}
            disabled={disabled}
            className="card m-auto"
            style={{ width: "280px", height: "350px" }}
        >
            {renderHeader()}
            {renderBody()}
            {renderFooter()}
        </div>
    );
};

export default Card;
