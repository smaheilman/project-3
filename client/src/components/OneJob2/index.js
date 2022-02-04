import React, { useState, useEffect } from "react";
import { getSingleJob, addBid, createComment } from "../../utils/API";
import { Button, Container, CardColumns, Card } from 'react-bootstrap';
import Auth from "../../utils/auth";
//import Comment from "../Comment"

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
    }, [jobDataLength, jobId]);

    const handleSubmitBid = async () => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const response = await addBid(jobId);
            console.log(addBid(jobId))
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

    const handleSubmitComment = async () => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const response = await createComment(jobId);
            console.log(jobId);
            if (!response.ok) {
                throw new Error("something went wrong!");
            }

            const updatedJob = await response.json();
            setJobData(updatedJob);

            alert("Comment added!");

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
                <input type="text" id="comment" name="comment" value={jobData.comments.commentBody} placeholder='Comment'></input>
                <Button onClick={() => handleSubmitComment(jobData._Id)}>Submit</Button>
                <Container>
                    <h2>
                        {jobData.bids.length ? `Viewing ${jobData.bids.length} ${jobData.bids.length === 1 ? "bid" : "bids"}:` : "You have no Jobs!"}
                    </h2>
                    <CardColumns>
                        {jobData.bids.map((bids) => {
                            //console.log(jobs._id)

                            return (
                                <Card key={bids._id} border="dark">
                                    <Card.Body>
                                        <Card.Title>
                                        </Card.Title>
                                        <p className="small">Bid Amount: ${bids.bidAmount}</p>
                                        <p>By: {bids.username}</p>
                                    </Card.Body>
                                </Card>
                            );
                        })}
                    </CardColumns>
                </Container>
                <Container>
                <h2>
                    {jobData.comments.length ? `Viewing ${jobData.comments.length} ${jobData.comments.length === 1 ? "comment" : "comments"}:` : "0 Comments"}
                </h2>
                <CardColumns>
                    {jobData.comments.map((comments) => {
                        //console.log(jobs._id)

                        return (
                            <Card key={comments._id} border="dark">
                                <Card.Body>
                                    <Card.Title>
                                    </Card.Title>
                                    <p className="small">{comments.commentBody}</p>
                                    <p>By: {comments.username}</p>
                                </Card.Body>
                            </Card>
                        );
                    })}
                </CardColumns>
            </Container>
            </div>
        </main>
    );
}

export default OneJob2;