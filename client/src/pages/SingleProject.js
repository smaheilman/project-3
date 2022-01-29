import React from 'react';
import { useParams } from 'react-router-dom';
import ReactionList from '../components/ReactionList';
import ReactionForm from '../components/ReactionForm';
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

    return (
        <div>
            <div className="card mb-3">
                <p className="card-header">
                    <span style={{ fontWeight: 700 }} className="text-light">
                        {job.username}
                    </span>{' '}
                    Job created on {job.createdAt}
                </p>
                <div className="card-body">
                    <p>{job.jobText}</p>
                </div>
            </div>
        </div>
    );
};

export default SingleJob;