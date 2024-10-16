const ButtonDanger = ({ type = "button", onClick, disabled, children }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className="btn btn-danger"
        >
            {children}
        </button>
    );
};

export default ButtonDanger;
