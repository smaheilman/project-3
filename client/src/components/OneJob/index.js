import React, { useState, useEffect } from "react";
import { getSingleJob, deleteJob } from "../../utils/API";
import { Button, Container, CardColumns, Card } from "react-bootstrap";
import Auth from "../../utils/auth";

const OneJob = () => {
  const jobId = window.location.toString().split("/")[window.location.toString().split("/").length - 1];
  console.log(jobId);

  const [jobData, setJobData] = useState([]);

  // use this to determine if `useEffect()` hook needs to run again
  const jobDataLength = Object.keys(jobData).length;

  useEffect(() => {
    const getJobData = async () => {
      try {
        const response = await getSingleJob(jobId);

        if (!response.ok) {
          throw new Error("something went wrong!");
        }

        const job = await response.json();
        setJobData(job);
      } catch (err) {
        console.error(err);
      }
    };

    getJobData();
  }, [jobDataLength]);

  const handleDeleteJob = async () => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await deleteJob(jobId);
      console.log(jobId);
      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const updatedJob = await response.json();
      setJobData(updatedJob);

      alert("Record has been successfully deleted");
      window.location.replace("/profile");
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
        <Button className="btn-block btn-danger" onClick={() => handleDeleteJob(jobData._Id)}>
          Delete this Job!
        </Button>
      </div>
      <Container>
                    <h2>
                        {jobData.bids.length ? `Viewing ${jobData.bids.length} ${jobData.bids.length === 1 ? "bid" : "bids"}:` : "You have no bids yet!"}
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
    </main>
  );
};

export default OneJob;
