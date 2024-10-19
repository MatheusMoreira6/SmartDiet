const ButtonWarning = ({ type = "submit", onClick, children, disabled }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className="btn btn-warning"
        >
            {children}
        </button>
    );
};

export default ButtonWarning;
