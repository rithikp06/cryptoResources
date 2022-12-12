import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useLoaderData, useNavigate } from "react-router-dom";
import Navbar from "../components/NavigationBar";

export default function Root(props) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Navbar />
      </div>
      <Outlet />
    </div>
  );
}
