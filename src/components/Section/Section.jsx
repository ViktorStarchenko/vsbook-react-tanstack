export default function Section(
    {
        sectionClass,
        sectionId,
        contentWrapper = 'wrapper-1220',
        sectionBgColor,
        children
    }) {

    return (
        <>
            <section
                className={`section ${sectionClass ? sectionClass : ''}`}
                id={sectionId}
                style={{
                    backgroundColor: sectionBgColor
                }}
            >
                <div className={contentWrapper}>
                    {children}
                </div>
            </section>
        </>
    )
}