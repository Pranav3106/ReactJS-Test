import { Link } from "react-router-dom"
import "./JobList.scss"
import { FaBuilding } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";

const JobList = ({ jobs }) => {
    // console.log('jobs')
    
    const groupedJobs = jobs.reduce((acc, job) => {
        const deptName = job.department?.title || "Other";
        if (!acc[deptName]) acc[deptName] = [];
        acc[deptName].push(job);

        // console.log('acc', acc, 'job', job )
        return acc;
    }, {});

    return (
        <div className="job-list">
            {Object.entries(groupedJobs).map(([department, deptJobs]) => (
                <div key={department} className="department-group">
                    <h2 className="department-title">{department}</h2>

                    {deptJobs.map((job) => (
                        <div className="job-card" key={job.id}>
                            <div className="job-info">
                                <Link to={`/job/${job.id}`}><h3>{job.title}</h3></Link>
                                <p>
                                    <span><FaBuilding /> {" "} {job.department?.title} </span>
                                    <span><CiLocationOn /> {" "} {job.location?.city},{" "}
                                    {job.location?.state}</span>
                                    <span className="badge">{job?.type}</span>
                                </p>
                                
                            </div>
                            <div className="actions">
                                <a
                                    href={job.applyUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn apply"
                                >
                                    Apply
                                </a>
                                <Link to={`/job/${job.id}`} className="btn view">
                                    View
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default JobList