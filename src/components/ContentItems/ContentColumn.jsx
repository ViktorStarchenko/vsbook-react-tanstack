
export default function ContentColumn({width, flexSizing = "none", children}) {

    return (
        <div style={{width: width, flex: flexSizing}}>
            {children}
        </div>
    )
}