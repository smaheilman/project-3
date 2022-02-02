import React, { useState, useEffect } from "react";
import { getSingleJob, addBid } from "../../utils/API";
import {  Button} from 'react-bootstrap';
import Auth from "../../utils/auth";

const OneJob2 = () => {
    const jobId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    console.log(jobId)

    const [jobData, setJobData] = useState([]);

    // use this to determine if `useEffect()` hook needs to run again
    const jobDataLength = Object.keys(jobData).length;

    useEffect(() => {
        const getJobData = async () => {
            try {

                const response = await getSingleJob(jobId);

                if (!response.ok) {
                    throw new Error('something went wrong!');
                }

                const job = await response.json();
                setJobData(job);
            } catch (err) {
                console.error(err);
            }
        };

        getJobData();
    }, [jobId]);

    const handleSubmitBid = async () => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const response = await addBid(jobId);
            console.log(jobId)
            if (!response.ok) {
                throw new Error('something went wrong!');
            }

            const updatedJob = await response.json();
            setJobData(updatedJob);

            alert('Thank you for placing a bid!');

        } catch (err) {
            console.error(err);
        }
    };

    if (!jobDataLength) {
        return <h2>LOADING...</h2>;
    }




    return (
        <main>
            <div>
                <h1>{jobData.title}</h1>
                <p>{jobData.description}</p>
                <input type="number" id="bid" name="bid" value={jobData.bids.bidAmount} placeholder='Place your bid!'></input>
                <Button onClick={() => handleSubmitBid(jobData._Id)}>Submit</Button>
            </div>
        </main>
    );
}

export default OneJob2;