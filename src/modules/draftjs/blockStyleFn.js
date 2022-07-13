export default function blockStyleFn(contentBlock) {
    console.log(contentBlock.getType())
    if (contentBlock.getType() === 'unstyled') {
        return 'fancyBlockQuote'
    }
}