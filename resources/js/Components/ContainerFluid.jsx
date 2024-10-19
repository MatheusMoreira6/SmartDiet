const ContainerFluid = ({ children, padding = "py-0" }) => {
    return <div className={`container-fluid ${padding}`}>{children}</div>;
};

export default ContainerFluid;
