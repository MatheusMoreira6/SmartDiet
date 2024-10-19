const ButtonWarning = ({
    type = "submit",
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
            className="btn btn-warning"
        >
            {children}
        </button>
    );
};

export default ButtonWarning;
