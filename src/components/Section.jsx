export default function Section({sectionClass, contentWrapper = 'wrapper-1220', children}) {

    return (
        <>
            <section className="section">
                <div className={contentWrapper}>
                    {children}
                </div>
            </section>
        </>
    )
}