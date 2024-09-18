const ButtonPrimary = ({ type = "submit", onClick, children }) => {
    return (
        <button type={type} onClick={onClick} className="btn btn-primary">
            {children}
        </button>
    );
};

export default ButtonPrimary;
