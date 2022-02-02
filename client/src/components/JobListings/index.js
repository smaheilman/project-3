import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getJobs, addBid } from '../../utils/API';
import Auth from "../../utils/auth";
import { Jumbotron, Container, CardColumns, Card, Button } from "react-bootstrap";

const JobList = (props) => {
  const [jobData, setJobData] = useState([]);

  // use this to determine if `useEffect()` hook needs to run again
  const jobDataLength = Object.keys(jobData).length;

  useEffect(() => {
    const getJobData = async () => {
      try {
        const response = await getJobs(jobData);

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

  const handleBidJob = async () => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await addBid(jobData);
      //console.log(jobId)
      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const updatedJob = await response.json();
      setJobData(updatedJob);

      alert("Thank you for placing a bid!");
    } catch (err) {
      console.error(err);
    }
  };

  if (!jobDataLength) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Jobs!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {jobData.length ? `Viewing ${jobData.length} ${jobData.length === 1 ? "job" : "jobs"}:` : "You have no Jobs!"}
        </h2>
        <CardColumns>
          {jobData.map((jobs) => {
            //console.log(jobs._id)

            return (
              <Card key={jobs._id} border="dark">
                <Card.Body>
<<<<<<< HEAD
                  <Card.Title><Link to={`/onejob2/${jobs._id}`}> Title: {jobs.title}</Link></Card.Title>
                  <p className='small'>Description: {jobs.description}</p>
                  <p className='small'>User: {jobs.username}</p>
                  <input type= "number" id="bid" name="bid" value={jobs.bidAmount} placeholder='Place your bid!'></input>
=======
                  <Card.Title>
                    <Link to={`/onejob/${jobs._id}`}> Title: {jobs.title}</Link>
                  </Card.Title>
                  <p className="small">Description: {jobs.description}</p>
                  <p className="small">User: {jobs.username}</p>
                  <input type="integer" id="bid" name="bid" value={jobs.bidAmount} placeholder="Place your bid!"></input>
>>>>>>> 50a311cc2c6098b6ca47ac3aaba45c1e7de3e090
                  <Button onClick={() => handleBidJob(jobData._Id)}>Submit</Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default JobList;
