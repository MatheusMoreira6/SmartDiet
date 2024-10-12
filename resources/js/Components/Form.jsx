const Form = ({ formRef, hendleSubmit, children }) => {
    return (
        <form
            noValidate
            ref={formRef}
            onSubmit={hendleSubmit}
            className="needs-validation"
        >
            {children}
        </form>
    );
};

export default Form;
