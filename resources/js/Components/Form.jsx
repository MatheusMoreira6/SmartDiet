const Form = ({ formRef, handleSubmit, children }) => {
    return (
        <form
            noValidate
            ref={formRef}
            onSubmit={handleSubmit}
            className="needs-validation"
        >
            {children}
        </form>
    );
};

export default Form;
