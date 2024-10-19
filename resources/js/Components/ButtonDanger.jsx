const ButtonDanger = ({ type = "button", onClick, children, disabled }) => {
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
