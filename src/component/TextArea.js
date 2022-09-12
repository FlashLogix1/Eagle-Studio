import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';


export const TextArea = ({value, setValue}) => {

    const modules = {
        toolbar:[
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],

            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme

            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],

            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction

            [{ 'align': [] }],

            ['link', 'image'],
            ['link', 'video'],

            ['clean']                                         // remove formatting button
        ]
    }

    return (
        <>
            <ReactQuill
                theme="snow"
                value={value || ''}
                onChange={setValue}
                modules={modules}
            />
        </>)
}
