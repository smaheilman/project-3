import React, { useState } from 'react';
import { createJob } from '../../utils/API';
import Auth from '../../utils/auth';
import {Form, Button, Alert} from 'react-bootstrap';

const JobForm = () => {
  // set initial form state
  const [jobFormData, setJobFormData] = useState({ title: '', description: '', username: ''});
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setJobFormData({ ...jobFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const token = Auth.getProfile();
    jobFormData.username = token.data.username;
    console.log(jobFormData);

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const response = await createJob(jobFormData);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { token, user } = await response.json();
      console.log(user);
      Auth.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setJobFormData({
      title: '',
      description: '',
      username: ''
    });
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>

        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your job creation!
        </Alert>

        <Form.Group>
          <Form.Label htmlFor='title'>Job Title</Form.Label>
          <Form.Control
            type='text'
            placeholder='Job Title'
            name='title'
            onChange={handleInputChange}
            value={jobFormData.title}
            required
          />
          <Form.Control.Feedback type='invalid'>Title is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='description'>Describe Your Job</Form.Label>
          <Form.Control
            type='text'
            placeholder='Job Description'
            name='description'
            onChange={handleInputChange}
            value={jobFormData.description}
            required
          />
          <Form.Control.Feedback type='invalid'>A description is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(jobFormData.title && jobFormData.description)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default JobForm;