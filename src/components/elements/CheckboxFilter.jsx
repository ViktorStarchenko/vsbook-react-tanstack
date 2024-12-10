export default function CheckboxFilter({ name, id, object, filterState, handleFilterChange }) {
    return (
        <div className="controlCheckbox">
            <h3>{name}</h3>
            {object?.length > 0 ? (
                object.map((item) => (
                    <label key={item.id} htmlFor={`${id}-${item.id}`}>
                        <input
                            type="checkbox"
                            id={`${id}-${item.id}`}
                            name={id}
                            value={item.id}
                            checked={filterState.includes(item.id)} // Link the checkbox state to the selected filters
                            onChange={() => handleFilterChange(item.id)}
                        />
                        {item.name}
                    </label>
                ))
            ) : (
                <span>Loading...</span>
            )}
        </div>
    );
}