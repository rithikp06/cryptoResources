import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "../css/NavigationBar.css";

const NavigationBar = () => {
  const [home, setHome] = useState("navHead hover-underline-animation");
  const [tracks, setTracks] = useState("navHead hover-underline-animation");
  const [manage, setManage] = useState("navHead hover-underline-animation");
  const [account, setAccount] = useState("navHead hover-underline-animation");
  const [contact, setContact] = useState("navHead hover-underline-animation");
  const selected = window.location.pathname;

  useEffect(() => {
    const path = selected.split('/');
    if (selected == "/") {
      setHome("navHead selected");
    }
    if (selected == "/account") {
      setAccount("navHead selected");
    }
    if (path.includes("tracks")) {
      setTracks("navHead selected");
    }
    if (selected == "/manage") {
      setManage("navHead selected");
    }
  }, []);

  return (
    <Navbar bg="dark" variant="dark" fixed="top" expand="lg" id="navigationBar">
      <Navbar.Brand
        href="/"
        style={{
          marginLeft: 25,
          fontFamily: "Raleway",
          fontSize: "50px",
          padding: "0",
          marginTop: "-15px",
          marginBottom: "-15px",
          marginRight: 20,
        }}
      >
        Crypto
      </Navbar.Brand>
      {selected !== "/signup" && selected !== "/signin" && (
        <>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link data-testid="home" className={home} href="/">
                Home
              </Nav.Link>
              <Nav.Link data-testid="tracks" className={tracks} href="/tracks">
                Learning Tracks
              </Nav.Link>
              <Nav.Link data-testid="account" className={account} href="/account">
                Your Account
              </Nav.Link>
              <Nav.Link data-testid="manage" className={manage} href="/manage">
                Manage
              </Nav.Link>
              <Nav.Link
                data-testid="signout"
                className={contact}
                onClick={() => {
                  localStorage.setItem("token", "");
                }}
                href="/"
              >
                Sign Out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </>
      )}
    </Navbar>
  );
};

export default NavigationBar;
