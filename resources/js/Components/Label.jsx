const Label = ({ htmlFor, children }) => {
    return (
        <label htmlFor={htmlFor} className="form-label fw-semibold">
            {children}
        </label>
    );
};

export default Label;
