import React, { useState, useEffect } from 'react';
import { Outlet } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.css";
import { useLoaderData, useNavigate } from "react-router-dom";
import Navbar from "../components/NavigationBar";

export default function Root(props) {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const navigate = useNavigate();

  // console.log(playlists.data);
  return (
    <div>
        <div style={{marginBottom: 20}}>
            <Navbar/>
        </div>
        {/* where we want the dynamic content */}
        {/* <main className="col-10"> */}
          {/* <div class="d-flex justify-content-end"> */}
          <Outlet />

          {/* </div> */}
        {/* </main> */}
    </div>
  );
}
