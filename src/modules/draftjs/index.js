import { useState } from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js';
import compositeDecorator from './CompositeDecorator';
import blockStyleFn from './blockStyleFn';
import 'draft-js/dist/Draft.css';

// BOOKMARK: https://draftjs.org/docs/advanced-topics-inline-styles

const styleMap = {
    RED: {
        color: 'red'
    },
    BLUE: {
        color: 'blue'
    },
    GREEN: {
        color: 'green'
    },
    Arial: {
        fontFamily: 'Arial',
    },
    'Times New Roman': {
        fontFamily: 'Times New Roman',
    },
    FONT_SIZE_16: {
        fontSize: 16
    },
    FONT_SIZE_24: {
        fontSize: 24
    },
    FONT_SIZE_32: {
        fontSize: 32
    },
}

export default function Draftjs() {
    const [editorState, setEditorState] = useState(EditorState.createEmpty(compositeDecorator))

    const handleEditorState = (e) => setEditorState(e)

    const handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command)
        if (newState) {
            handleEditorState(newState)
            return 'handled'
        }
        return 'not-handled'
    }

    const onBoldClick = () => handleEditorState(RichUtils.toggleInlineStyle(editorState, 'RED'))

    const onStyleClick = (value) => handleEditorState(RichUtils.toggleInlineStyle(editorState, value))

    const onFontChange = (e) => {
        const fontFamily = e.target.value
        handleEditorState(RichUtils.toggleInlineStyle(editorState, fontFamily))
    }
    
    const onFontSizeChange = (e) => {
        const fontSize = e.target.value
        handleEditorState(RichUtils.toggleInlineStyle(editorState, fontSize))
    }

    const containerStyle = { 
        background: 'white',
        outline: '3px solid black',
        margin: 15,
        padding: 10,
        width: 800,
        height: 400,
        // position: 'absolute',
        // left: 550
    }

    return (
        <div style={containerStyle}>
            <h3>DraftJS</h3>
            <div style={{ display: 'flex' }}>
                <div className='controls'>
                    <button onClick={onBoldClick}>Bold</button>
                </div>
                <div className='controls'>
                    <label>Colors: </label>
                    <button onClick={() => onStyleClick('RED')}>Red</button>
                    <button onClick={() => onStyleClick('BLUE')}>Blue</button>
                    <button onClick={() => onStyleClick('GREEN')}>Green</button>
                </div>
                <div className='controls'>
                    <label>Font Family: </label>
                    <select onChange={onFontChange}>
                        <option value='Arial'>Arial</option>
                        <option value='Times New Roman'>Times New Roman</option>
                        <option value='Roboto'>Roboto</option>
                    </select>
                </div>
                <div className='controls'>
                    <label>Font Size: </label>
                    <select onChange={onFontSizeChange}>
                        <option value='FONT_SIZE_16'>16</option>
                        <option value='FONT_SIZE_24'>24</option>
                        <option value='FONT_SIZE_32'>32</option>
                    </select>
                </div>
            </div>

            <div style={{ color: 'black', background: '#88caca', height: 300 }}>
                <Editor 
                    editorState={editorState} // The editorState that holds every info of the state (text, history etc.)
                    onChange={handleEditorState} // Updating the editorState object every text change
                    handleKeyCommand={handleKeyCommand} // Handling bold, italic, underline, etc. commands
                    blockStyleFn={blockStyleFn}
                    customStyleMap={styleMap}
                />
            </div>
        </div>
    )
}
