const ButtonPrimary = ({
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
            className="btn btn-primary"
        >
            {children}
        </button>
    );
};

export default ButtonPrimary;
