const ButtonPrimary = ({ type = "submit", onClick, children, disabled }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className="btn btn-primary"
        >
            {children}
        </button>
    );
};

export default ButtonPrimary;
