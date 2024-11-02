import { usePage } from "@inertiajs/react";
import { Editor } from "@tinymce/tinymce-react";

const TinyMCE = ({ value, onChange }) => {
    const { tinymceApiKey } = usePage().props;

    return (
        <Editor
            apiKey={tinymceApiKey}
            init={{
                height: 300,
                menubar: false,
                plugins: ["lists", "advlist", "autoresize"],
                toolbar: `undo redo | bold italic | fontselect fontsizeselect | alignleft aligncenter alignright | bullist numlist`,
                font_formats: `Arial=arial,helvetica,sans-serif; Courier New=courier new,courier,monospace; Times New Roman=times new roman,times,serif;`,
                fontsize_formats: "10pt 12pt 14pt 18pt 24pt 36pt",
            }}
            initialValue={value}
            onEditorChange={(content) => onChange(content)}
        />
    );
};

export default TinyMCE;
