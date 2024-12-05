export default function Checkbox({name, id, object}) {
    return (
        <>
            <div className="controlCheckbox">
                {object?.length > 0
                    ? object.map((item) => (
                    <label key={item.id} htmlFor={id}>
                        <input type="checkbox" name={id} value={item.id}/>
                        {item.name}
                    </label>
                ))
                    : <span disabled>Loading...</span>
                }
            </div>
        </>
    )
}