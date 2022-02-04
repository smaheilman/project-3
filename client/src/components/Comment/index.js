import React from "react";
import {  Container, CardColumns, Card } from 'react-bootstrap';


const Comment = ({username, comments}) => {
    return (
        <main>
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
        </main>
    );
}

export default Comment;