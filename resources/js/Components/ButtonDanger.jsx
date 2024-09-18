const ButtonDanger = ({ type = "button", onClick, children }) => {
    return (
        <button type={type} onClick={onClick} className="btn btn-danger">
            {children}
        </button>
    );
};

export default ButtonDanger;
