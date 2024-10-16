const ButtonPrimary = ({ type = "submit", onClick, disabled, children }) => {
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
