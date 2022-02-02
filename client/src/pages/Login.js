// see SignupForm.js for comments
import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { userLogin } from "../utils/API";
import Auth from "../utils/auth";

import FormControl from "@material-ui/core/FormControl";
import { TextField } from "@material-ui/core";
// import Button from "@material-ui/core/Button";

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const response = await userLogin(userFormData);

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const { token, user } = await response.json();
      console.log(user);
      Auth.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <main>
      <div className="login-page">
        <Form noValidate validated={validated} onSubmit={handleFormSubmit} className="form">
          {/* <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant="danger">
            Something went wrong with your login credentials!
          </Alert> */}
          <h1>Sign in</h1>
          <Form.Group className="fontuser">
            {/* <Form.Label htmlFor="email">Email</Form.Label> */}
            <Form.Control
              type="text"
              placeholder="Your email"
              name="email"
              onChange={handleInputChange}
              value={userFormData.email}
              required
            />
            <i class="fas fa-user"></i>
            {/* <Form.Control.Feedback type="invalid">Email is required!</Form.Control.Feedback> */}
          </Form.Group>

          <Form.Group className="fontpassword">
            {/* <Form.Label htmlFor="password">Password</Form.Label> */}
            <Form.Control
              type="password"
              placeholder="Your password"
              name="password"
              onChange={handleInputChange}
              value={userFormData.password}
              required
            />
            {/* <Form.Control.Feedback type="invalid">Password is required!</Form.Control.Feedback> */}
            <i class="fas fa-lock"></i>
          </Form.Group>
          <Button disabled={!(userFormData.email && userFormData.password)} type="submit" variant="success">
            Login <i class="fa-solid fa-paper-plane-top"></i>
          </Button>
          <p className="message">
            Not registered? <a href="/signup">Create an account</a>
          </p>
        </Form>
      </div>
    </main>
  );
};

export default LoginForm;
