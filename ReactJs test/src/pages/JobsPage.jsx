import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import Filters from '../components/Filters/Filters';
import JobList from '../components/JobList/JobList';
import SelectedFilters from '../components/SelectedFilters/SelectedFilters';

const BASE_URL = "https://teknorix.jobsoid.com/api/v1";

const JobsPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [jobs, setJobs] = useState([]);
    const [lookups, setLookups] = useState({ departments: [], locations: [], functions: [] });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            try {
                let query = searchParams.toString();
                const res = await fetch(`${BASE_URL}/jobs?${query}`);
                const data = await res.json();

                setJobs(data);

                const departments = Array.from(
                    new Map(data.map((job) => [job.department?.id, job.department]))
                )
                    .filter(([id, dep]) => id && dep)
                    .map(([_, dep]) => dep);

                const locations = Array.from(
                    new Map(data.map((job) => [job.location?.id, job.location]))
                )
                    .filter(([id, loc]) => id && loc)
                    .map(([_, loc]) => loc);

                const functions = Array.from(
                    new Map(data.map((job) => [job.function?.id, job.function]))
                )
                    .filter(([id, func]) => id && func)
                    .map(([_, func]) => func);

                setLookups({ departments, locations, functions });
            } catch (err) {
                console.error("Error fetching jobs", err);
            }
            setLoading(false);
        };
        fetchJobs();
    }, [searchParams]);

    const selectedDepartment = searchParams.get("department");
    const selectedLocation = searchParams.get("location");
    const selectedFunction = searchParams.get("function");
    const searchQuery = searchParams.get("q") || "";

    const filteredJobs = jobs.filter((job) => {
        return (
            (selectedDepartment ? job.department?.id === parseInt(selectedDepartment) : true) &&
            (selectedLocation ? job.location?.id === parseInt(selectedLocation) : true) &&
            (selectedFunction ? job.function?.id === parseInt(selectedFunction) : true) &&
            (searchQuery ? job.title.toLowerCase().includes(searchQuery.toLowerCase()) : true)
        );
    });

    return (
        <div className="jobs-page">
             <Filters
        lookups={lookups}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
            {/* {console.log('jobs', jobs)} */}
             <SelectedFilters
        lookups={lookups}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />

            {loading ? (
                <p className='loading'>Loading jobs...</p>
            ) : filteredJobs.length > 0 ? (
                <JobList jobs={filteredJobs} />
            ) : (
                <p className='loading'>No jobs found.</p>
            )}
        </div>
    )
}

export default JobsPage