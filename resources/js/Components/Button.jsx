const Button = ({ type = "submit", text, onClick }) => {
    return (
        <button type={type} onClick={onClick} className="btn btn-primary">
            {text}
        </button>
    );
};

export default Button;
