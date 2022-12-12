import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../context/AuthContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  // const navigate = useNavigate();

  const handleSubmit = async (event) => {
    let invalid = false;
    if (!validateEmail()) {
        invalid = true;
    }
    if (!validatePassword()) {
        invalid = true;
    }
    event.preventDefault();
    setSubmitted(true);
    if (!invalid) {
        signup(email, password, setToken, toast);
    }
  };

  const validateEmail = () => {
    return email.toLowerCase().match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  }
  
  const validatePassword = () => {
    return password.length >= 6;
  }

  useEffect(() => {
    // localStorage.setItem("token", "test")
    const currToken = localStorage.getItem("token");
    if (currToken) {
      setToken(currToken);
    }
    document.title = "Signup";
    console.log("test");
  }, []);

  useEffect(() => {
    if (token !== "") {
      // navigate("/");
      window.location.reload(false);
    }
  }, [token]);

  return (
    <div style={{ width: "70%", marginLeft: "15%" }}>
      <h2>Signup</h2>
      <ToastContainer/>
      <Form  onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail" >
          <Form.Label>Email address</Form.Label>
          <Form.Control data-testid="email" className={(submitted && !validateEmail()) ? "is-invalid" : (submitted ? "is-valid" : "") } type="" placeholder="Enter email" value={email} onChange={(event) => setEmail(event.target.value)} />
          {submitted && !validateEmail() && <Form.Text className="text-muted" >
            Invalid Email Format 
          </Form.Text>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control data-testid="password" className={(submitted && !validatePassword()) ? "is-invalid" : (submitted ? "is-valid" : "")} type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
          {submitted && !validatePassword() && <Form.Text className="text-muted" >
           Password must be at least 6 characters
          </Form.Text>}
        </Form.Group>
        <Button data-testid="submit" variant="primary" type="submit">
          Submit
        </Button>
        <a style={{marginLeft: 30}} href="/signin">Login here if you already have an account</a>
      </Form>
    </div>
  );
};

export default Signup;
