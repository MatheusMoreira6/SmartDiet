const ButtonWarning = ({ type = "submit", onClick, children }) => {
    return (
        <button type={type} onClick={onClick} className="btn btn-warning">
            {children}
        </button>
    );
};

export default ButtonWarning;
