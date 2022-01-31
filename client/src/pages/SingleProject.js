import React from 'react';
import { useParams } from 'react-router-dom';
import { deleteJob } from '../utils/API';
import Auth from '../utils/auth';

const SingleJob = (props) => {

    const { id: jobId } = useParams();

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetch(getJobs)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setJobs(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div> Loading...</div>;
    }
    if (loading) {
        return <div>Loading...</div>;
    }

    const handleDeleteJob = async (jobId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const response = await deleteJob(jobId, token);

            if (!response.ok) {
                throw new Error('something went wrong!');
            }

            const updatedUser = await response.json();
            setUserData(updatedUser);

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <div className="card mb-3">
                <p className="card-header">
                    <span style={{ fontWeight: 700 }} className="text-light">
                        {jobs.username}
                    </span>{' '}
                    Job created on {jobs.jobId.createdAt}
                </p>
                <div className="card-body">
                    <p>{jobs.jobText}</p>
                </div>
            </div>
        </div>
    );
};

export default SingleJob;