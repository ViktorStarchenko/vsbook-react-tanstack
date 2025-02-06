export default function ContentItem({width, flexSizing = "none", justifyContent, children}) {

    return (
        <div style={{width: width, flex: flexSizing, justifyContent: justifyContent}}>
            {children}
        </div>
    )
}