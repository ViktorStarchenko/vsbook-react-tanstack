export default function Select({ name, object, emptyValueName }) {
    return (
        <>
            <select name={name} id={name}>
                {emptyValueName && <option value="">{emptyValueName}</option>}
                {object?.length > 0
                    ? object.map((item) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))
                    : <option disabled>Loading...</option>
                }
            </select>
        </>
    );
}