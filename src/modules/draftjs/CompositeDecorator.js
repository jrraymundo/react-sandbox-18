import { CompositeDecorator } from 'draft-js';

/**
 * This is the way to make DraftJS detect certain text in the editor onChange
 * and transform their style on the fly (e.g. when user types a hastag change the style of text)
 */

const HASHTAG_REGEX = /#[\w\u0590-\u05ff]+/g;

function hashtagStrategy(contentBlock, callback, contentState) {
    findWithRegex(HASHTAG_REGEX, contentBlock, callback);
}

function findWithRegex(regex, contentBlock, callback) {
    const text = contentBlock.getText();
    let matchArr, start;
    while ((matchArr = regex.exec(text)) !== null) {
        start = matchArr.index;
        callback(start, start + matchArr[0].length);
    }
}

const hashtagSpan = (props) => {
    return (
        <span style={{ background: 'green' }}>
            {props.children}
        </span>
    )
}

const compositeDecorator = new CompositeDecorator([
    {
        strategy: hashtagStrategy,
        component: hashtagSpan
    }
])

export default compositeDecorator