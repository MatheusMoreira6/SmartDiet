const Label = ({ htmlFor, required, children }) => {
    let className;
    
    if (required) {
        className = "form-label required";
    } else {
        className = "form-label";
    }

    return (
        <label htmlFor={htmlFor} className={className}>
            {children}
        </label>
    );
};

export default Label;
