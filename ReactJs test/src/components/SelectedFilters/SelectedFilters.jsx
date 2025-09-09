import "./SelectedFilters.scss"
import { RxCross1 } from "react-icons/rx";

const SelectedFilters = ({ lookups, searchParams, setSearchParams }) => {
    const clearFilter = (key) => {
        searchParams.delete(key);
        setSearchParams(searchParams);
    };

    const filterLabels = {
        department: (id) => lookups.departments.find((d) => d.id.toString() === id)?.title,
        location: (id) => lookups.locations.find((l) => l.id.toString() === id)?.title,
        function: (id) => lookups.functions.find((f) => f.id.toString() === id)?.title,
        q: (value) => value,
    };

    const activeFilters = Object.keys(filterLabels).map((key) => {
        const value = searchParams.get(key);
        if (!value) return null;
        return {
            key,
            label: filterLabels[key](value),
        };
    }).filter(Boolean);

    if (activeFilters.length === 0) return null;

    const clearAll = () => {
        setSearchParams({});
    };

    return (
        <div className="selected-filters">
            <div className="tags">
                {activeFilters.map((filter) => (
                    <div className="tag" key={filter.key}>
                        <span>{filter.label}</span>
                        <button onClick={() => clearFilter(filter.key)}><RxCross1 /></button>
                    </div>
                ))}
            </div>
            <button className="clear-all" onClick={clearAll}>Clear All</button>
        </div>
    )
}

export default SelectedFilters