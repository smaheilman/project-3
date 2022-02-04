// see SignupForm.js for comments
import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { userLogin } from "../utils/API";
import Auth from "../utils/auth";

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
        console.log(response);
        throw new Error(response.message);
      }

      const { token, user } = await response.json();
      console.log(user);
      Auth.login(token);
    } catch (err) {
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
          <h1>Sign in</h1>
          <Alert show={showAlert} className="login-alert">
            Invalid email or password
          </Alert>
          <Form.Group className="fontuser">
            <Form.Control
              type="text"
              placeholder="Your email"
              name="email"
              onChange={handleInputChange}
              value={userFormData.email}
              required
            />
            <i className="fas fa-user"></i>
          </Form.Group>

          <Form.Group className="fontpassword">
            <Form.Control
              type="password"
              placeholder="Your password"
              name="password"
              onChange={handleInputChange}
              value={userFormData.password}
              required
            />
            <i className="fas fa-lock"></i>
          </Form.Group>
          <Button disabled={!(userFormData.email && userFormData.password)} type="submit" variant="success">
            Login <i className="fa-solid fa-paper-plane-top"></i>
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
