import React, { useState, useEffect, useContext } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./components/CryptoPrice";
import CryptoPrice from "./components/CryptoPrice";
import { signup } from "./context/AuthContext";
import CreateResource from "./components/CreateResource";
import { ToastContainer, toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "./components/Modal";
import Form from "react-bootstrap/Form";

function App() {
  const [token, setToken] = useState("");
  const [topic, setTopic] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    signup(email, password, setToken);
  };

  useEffect(() => {
    console.log("test");
    const currToken = localStorage.getItem("token");
    console.log(currToken);
    if (currToken != null) {
      setToken(currToken);
    }
  }, [token]);
  return (
    <div style={{ color: "white" }}>
      <div style={{ margin: "5%" }}>
        <h1>Pothu's Crypto Resources</h1>
        <h4>
          Welcome! I've compiled a thorough list of crypto resources, and
          Created this website to make them easy to view and share. I hope you
          enjoy!
        </h4>
      </div>
      <div
        className="App"
        style={{
          backgroundColor: "white",
          color: "var(--secondary",
          paddingTop: 50,
          width: "100%",
        }}
      >
        {isModalOpen && (
          <Modal
            title="Common Topics"
            onClose={() => {
              setIsModalOpen(false);
              console.log("modal open", isModalOpen);
            }}
          >
            <p>
              <a href="/tracks/topic/defi">DeFi</a>
            </p>
            <p>
              <a href="/tracks/topic/infrastructure">Infrastructure</a>
            </p>
            <p>
              <a href="/tracks/topic/tokenomics">Tokenomics</a>
            </p>
          </Modal>
        )}
        <div className="row">
          <div
            className="col-sm-3 border border-5 rounded"
            style={{ width: 500, margin: "auto" }}
          >
            <h2>Prices of some top tokens</h2>
            <CryptoPrice token="ethereum" />
            <CryptoPrice token="bitcoin" />
            <CryptoPrice token="solana" />
            <CryptoPrice token="dogecoin" />
            <CryptoPrice token="uniswap" />
          </div>
          <div
            className="col-sm-3 border border-5 rounded"
            style={{ width: 500, margin: "auto" }}
          >
            <h2>Learning Tracks</h2>
            <a className="trackLink" href="/tracks/level/beginner">
              <h4>Beginner</h4>
            </a>
            <a className="trackLink" href="/tracks/level/intermediate">
              <h4>Intermediate</h4>
            </a>
            <a className="trackLink" href="/tracks/level/advanced">
              <h4>Advanced</h4>
            </a>
            <p>
              <Button
                type="button"
                onClick={() => {
                  setIsModalOpen(!isModalOpen);
                }}
              >
                View Common Topics
              </Button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
