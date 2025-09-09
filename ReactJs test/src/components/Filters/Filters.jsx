import { useNavigate } from "react-router-dom";
import "./Filters.scss"
import { CiSearch } from "react-icons/ci";

const Filters = ({ lookups, searchParams, setSearchParams }) => {
    const navigate = useNavigate();

    // console.log('lookups', lookups)

    const handleChange = (key, value) => {
        if (value) searchParams.set(key, value);
        else searchParams.delete(key);
        setSearchParams(searchParams);
        navigate({ search: searchParams.toString() });
    };

    return (
        <div className="filters">
            <div className="filters-search">
                <input
                    placeholder="Search for Job"
                    value={searchParams.get("q") || ""}
                    onChange={(e) => handleChange("q", e.target.value)}
                />
                <CiSearch />
            </div>

            <div className="filters-options">
                <select value={searchParams.get("department") || ""} onChange={(e) => handleChange("department", e.target.value)}>
                    <option value="">Department</option>
                    {lookups.departments.map((d) => (
                        <option key={d.id} value={d.id}>{d.title}</option>
                    ))}
                </select>

                <select value={searchParams.get("location") || ""} onChange={(e) => handleChange("location", e.target.value)}>
                    <option value="">Location</option>
                    {lookups.locations.map((l) => (
                        <option key={l.id} value={l.id}>{l.title}</option>
                    ))}
                </select>

                <select value={searchParams.get("function") || ""} onChange={(e) => handleChange("function", e.target.value)}>
                    <option value="">Function</option>
                    {lookups.functions.map((f) => (
                        <option key={f.id} value={f.id}>{f.title}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default Filters