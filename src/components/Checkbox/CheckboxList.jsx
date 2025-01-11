export default function CheckboxList({id, children}) {

    return (
        <>
            <div id={id} className="checkbox-list">
                {children}
            </div>
        </>
    )
}