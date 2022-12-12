import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signin } from "../context/AuthContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";

const Signin = () => {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    let invalid = false;
    event.preventDefault();
    setSubmitted(true);
    if (!invalid) {
      signin(email, password, setToken, toast);
    }
  };

  useEffect(() => {
    const currToken = localStorage.getItem("token");
    if (currToken) {
      setToken(currToken);
    }
    document.title = "Signin";
    console.log("test");
  }, []);

  useEffect(() => {
    if (token !== "") {
      window.location.reload(false);
    }
  }, [token]);

  return (
    <div style={{ width: "70%", marginLeft: "15%" }}>
      <h2>Signin</h2>
      <ToastContainer />
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            data-testid="email"
            type=""
            placeholder="Enter email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            data-testid="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <Button data-testid="submit" variant="primary" type="submit">
          Submit
        </Button>
        <a style={{ marginLeft: 30 }} href="/signup">
          Create an account here
        </a>
      </Form>
    </div>
  );
};

export default Signin;
