import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const SweetAlert = withReactContent(Swal);

SweetAlert.error = ({ title, text }) => {
    return SweetAlert.fire({
        icon: "error",
        title: title,
        text: text,
    });
};

SweetAlert.success = ({ title, text }) => {
    return SweetAlert.fire({
        icon: "success",
        title: title,
        text: text,
    });
};

SweetAlert.info = ({ title, text }) => {
    return SweetAlert.fire({
        icon: "info",
        title: title,
        text: text,
    });
};

SweetAlert.warning = ({ title, text }) => {
    return SweetAlert.fire({
        icon: "warning",
        title: title,
        text: text,
    });
};

SweetAlert.confirm = ({
    title,
    text,
    confirmButton = "Sim",
    cancelButton = "Não",
}) => {
    return SweetAlert.fire({
        title: title,
        text: text,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: confirmButton,
        cancelButtonText: cancelButton,
    });
};

export default SweetAlert;
