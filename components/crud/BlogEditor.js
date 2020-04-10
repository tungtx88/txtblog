import dynamic from 'next/dynamic'
// import 'react-quill/dist/quill.snow.css'
const ReactQuill = dynamic(
    () => import('react-quill'),
    { ssr: false }
)

class BlogEditor extends React.Component {
    constructor(props) {
        super(props)
        this.state = { editorHtml: '', theme: 'snow' }
        this.handleChange = this.handleChange.bind(this)
        this.handleSetEditorContent = this.handleSetEditorContent.bind(this)
    }

    handleChange(html) {
        this.setState({ editorHtml: html });
        this.props.onChange(html)
    }

    handleSetEditorContent(html) {
        this.setState({ editorHtml: html });
    }

    handleThemeChange(newTheme) {
        if (newTheme === "core") newTheme = null;
        this.setState({ theme: newTheme })
    }

    render() {
        return (
            <div>
                <ReactQuill
                    theme={this.state.theme}
                    onChange={this.handleChange}
                    value={this.state.editorHtml}
                    modules={BlogEditor.modules}
                    formats={BlogEditor.formats}
                    bounds={'.app'}
                    placeholder={this.props.placeholder}
                />
            </div>
        )
    }
}

/* 
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
BlogEditor.modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        ['clean']
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    }
}
/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
BlogEditor.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
]

export default BlogEditor