const ButtonDanger = ({
    type = "button",
    onClick,
    children,
    disabled,
    formRef,
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            form={formRef}
            className="btn btn-danger"
        >
            {children}
        </button>
    );
};

export default ButtonDanger;
