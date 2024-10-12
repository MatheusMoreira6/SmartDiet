const Label = ({ htmlFor, children }) => {
    return (
        <label htmlFor={htmlFor} className="form-label">
            {children}
        </label>
    );
};

export default Label;
