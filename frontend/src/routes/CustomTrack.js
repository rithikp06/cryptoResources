import React, { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import CryptoPrice from "../components/CryptoPrice";
import TrackGroup from "../components/TrackGroup";

const CustomTrack = () => {
  const resources = useLoaderData().resources;
  const [favorites, setFavorites] = useState(
    useLoaderData().favorites.data.favorites
  );
  const { topic } = useParams();

  useEffect(() => {
    console.log("topic", topic);
    document.title = "Resources related to " + topic;
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/users/updateFavorites", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: localStorage.getItem("token"),
        favorites: favorites,
      }),
    }).then(async (response) => {
      console.log(localStorage.getItem("token"));
      console.log(await response.json());
    });
    console.log(favorites);
  }, [favorites]);

  return (
    <div style={{ marginLeft: "5%", width: "90%" }}>
      <h2>Resoures related to '{topic}'</h2>
      <TrackGroup
        noAccordian={true}
        name={topic}
        resources={resources.data.filter((resource) => {
          return resource.topic.toLowerCase() === topic;
        })}
        favorites={favorites}
        setFavorites={setFavorites}
        eventKey=""
      />
      <CryptoPrice token={topic} />
    </div>
  );
};

export default CustomTrack;
