export default function Checkbox({name, id, object, filterState, handleFilterChange}) {
    return (
        <>
            <div className="controlCheckbox">
                {object?.length > 0
                    ? object.map((item) => (
                        <label key={item.id} htmlFor={id}>
                            <input
                                type="checkbox"
                                name={id}
                                value={item.id}
                                checked={filterState.includes(item.id)} // Link the checkbox state to the selected filters
                                onChange={() => handleFilterChange(item.id)}
                            />
                            {item.name}
                        </label>
                    ))
                    : <span disabled>Loading...</span>
                }
            </div>
        </>
    )
}