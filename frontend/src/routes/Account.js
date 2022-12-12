import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import ManageResources from "../components/ManageResources";
import Table from "react-bootstrap";
import { redirectIfSignedOut } from "../Utility";
import ManageFavorites from "../components/ManageFavorites";

const Account = () => {
  const userData = useLoaderData().favorites;
  const resources = useLoaderData().resources;
  useEffect(() => {
    console.log(resources);
    document.title = "Your Account";
  }, []);
  return (
    <div style={{ margin: 40 }}>
      <h2>Account Info</h2>
      <p>Email: {userData.data.email}</p>
      <h2>Favorites</h2>
      <ManageFavorites
        method="PATCH"
        reverseDelete={false}
        url={"http://localhost:3001/users/updateFavorites"}
        favs={userData.data.favorites}
        resources={resources.data}
      />
    </div>
  );
};

export default Account;
