const Card = ({ title, children, footer }) => {
    return (
        <div
            className="card m-auto"
            style={{ width: "280px", height: "350px" }}
        >
            {title && (
                <div className="card-header">
                    <h5 className="text-center">{title}</h5>
                </div>
            )}

            <div className="card-body">{children}</div>

            {footer && (
                <div className="card-footer">
                    <p className="text-center my-2">{footer}</p>
                </div>
            )}
        </div>
    );
};

export default Card;
