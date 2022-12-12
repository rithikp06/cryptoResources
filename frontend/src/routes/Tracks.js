import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import TrackGroup from "../components/TrackGroup";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Tracks = () => {
  const {defaultlevel} = useParams();
  const navigate = useNavigate();
  const resources = useLoaderData().resources;
  var timestamps = useLoaderData().favorites.data.favorites;
  const [favorites, setFavorites] = useState(Object.keys(useLoaderData().favorites.data.favorites));
  const [topic, setTopic] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = async (event) => {
    let invalid = false;
    if (topic.length == 0) {
      invalid = true;
    }
    event.preventDefault();
    setSubmitted(true);
    if (!invalid) {
        navigate(`/tracks/${topic}`)
    }
  };

  const updateTimestamps = () => {
    Array.from(favorites).forEach((favorite,index, arr) => {
      if (!(favorite in timestamps)) {
        timestamps[favorite] = Date.now()
      }
    })

    Object.entries(timestamps).forEach(([key, value]) => {
      if (!favorites.includes(key)) {
          delete timestamps[key];
      }
    });
    console.log("updated times", timestamps)
    return timestamps;
  }

  useEffect(() => {
    document.title = "Learning Tracks";
  }, []);



  useEffect(() => {
    console.log("updated",favorites);
    

    fetch("http://localhost:3001/users/updateFavorites", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: localStorage.getItem("token"),
        favorites: updateTimestamps(),
      }),
    }).then(async (response) => {
      console.log("used", timestamps);
      console.log(localStorage.getItem("token"));
      console.log(await response.json());
    });
    console.log("test",favorites);
  }, [favorites]);

  return (
    <div style={{ marginLeft: "5%", width: "90%" }}>
      <h2>By Experience</h2>
      <Accordion flush defaultActiveKey={defaultlevel || ""}>
        <TrackGroup
          name="Beginner"
          resources={resources.data.filter((resource) => {
            return resource.experience_level.toLowerCase() === "beginner";
          })}
          favorites={favorites}
          setFavorites={setFavorites}
          eventKey="beginner"
        />
        <TrackGroup
          name="Intermediate"
          resources={resources.data.filter((resource) => {
            return resource.experience_level.toLowerCase() === "intermediate";
          })}
          favorites={favorites}
          setFavorites={setFavorites}
          eventKey="intermediate"
        />
        <TrackGroup
          name="Advanced"
          resources={resources.data.filter((resource) => {
            return resource.experience_level.toLowerCase() === "advanced";
          })}
          favorites={favorites}
          setFavorites={setFavorites}
          eventKey="advanced"
        />
      </Accordion>
      <h2>Common Topics</h2>
      <Accordion flush>
        <TrackGroup
          name="DeFi"
          resources={resources.data.filter((resource) => {
            return resource.topic.toLowerCase() === "defi";
          })}
          favorites={favorites}
          setFavorites={setFavorites}
          eventKey="0"
        />
        <TrackGroup
          name="Infrastructure"
          resources={resources.data.filter((resource) => {
            return resource.topic.toLowerCase() === "infrastructure";
          })}
          favorites={favorites}
          setFavorites={setFavorites}
          eventKey="1"
        />
        <TrackGroup
          name="Tokenomics"
          resources={resources.data.filter((resource) => {
            return resource.topic.toLowerCase() === "tokenomics";
          })}
          favorites={favorites}
          setFavorites={setFavorites}
          eventKey=""
        />
      </Accordion>
      <div>
        <h2>Search for Other Topics (e.g Solana, Ethereum, Bitcoin)</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              className={
                submitted && topic.length == 0
                  ? "is-invalid"
                  : submitted
                  ? "is-valid"
                  : ""
              }
              type=""
              placeholder="Enter topic"
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
            />
            {submitted && topic.length == 0 && (
              <Form.Text className="text-muted">Enter a topic</Form.Text>
            )}
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Tracks;
