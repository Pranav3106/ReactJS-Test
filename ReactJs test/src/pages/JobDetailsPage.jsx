import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./JobDetailsPage.scss"
import { FaLinkedin, FaFacebook, FaBuilding } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";

const BASE_URL = "https://teknorix.jobsoid.com/api/v1";

const JobDetailsPage = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [relatedJobs, setRelatedJobs] = useState([]);

    useEffect(() => {
        fetch(`${BASE_URL}/jobs/${id}`)
            .then((res) => res.json())
            .then(setJob);
    }, [id]);

    useEffect(() => {
        if (job?.department?.id) {
            fetch(`${BASE_URL}/jobs`)
                .then((res) => res.json())
                .then((allJobs) => {
                    const deptJobs = allJobs.filter(
                        (j) => j.department?.id === job.department.id && j.id !== job.id
                    );
                    setRelatedJobs(deptJobs);
                });
        }
    }, [job]);

    if (!job) return <p className="loading">Loading...</p>;


    return (
        <div className="job-details-page">
            <div className="job-main">

                <p className="dept">
                    {job.department?.title} Department at {job.company} Systems Goa
                </p>
                <h1>{job.title}</h1>
                <div className="meta">
                    <span className="department"><FaBuilding /> {" "} {job.department?.title}</span>
                    <span><CiLocationOn /> {job.location?.city}, {job.location?.state}</span>
                    <span className="badge">{job.type}</span>
                </div>
                <a
                    href={job.applyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn apply"
                >
                    Apply
                </a>

                <hr />
            </div>

            <div className="job-detail-section">
                <div
                    className="description"
                    dangerouslySetInnerHTML={{ __html: job.description }}
                />

                <div>
                    <div className="sidebar">
                        <h3>Other Job Openings</h3>
                        <ul>
                            {relatedJobs.length > 0 ? (
                                relatedJobs.map((rj) => (
                                    <li key={rj.id}>
                                        <Link to={`/job/${rj.id}`}>{rj.title}</Link>
                                        <p>
                                            <FaBuilding /> {" "} {rj.department?.title} <CiLocationOn /> {rj.location?.city},{" "}
                                            {rj.location?.state}
                                        </p>
                                    </li>
                                ))
                            ) : (
                                <p>No other openings in this department.</p>
                            )}
                        </ul>
                    </div>

                    <div className="share-section">
                        <h3>Share Job Openings</h3>
                        <div className="social-links">
                            <a href="#"><FaLinkedin /></a>
                            <a href="#"><FaFacebook /></a>
                            <a href="#"><FaXTwitter /></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDetailsPage