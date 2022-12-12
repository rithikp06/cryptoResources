import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import Root from "./routes/root";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./routes/Signup";
import Signin from "./routes/Signin";
import Tracks from "./routes/Tracks";
import Account from "./routes/Account";
import "react-toastify/dist/ReactToastify.css";
import { _fetch } from "./Utility";
import CustomTrack from "./routes/CustomTrack";
import Manage from "./routes/Manage";
import Navbar from "./components/NavigationBar";

const root = ReactDOM.createRoot(document.getElementById("root"));
const host = "http://localhost:3001";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/signin",
        element: (
          <div style={{ marginTop: 100 }}>
            <Signin />
          </div>
        ),
        loader({ params }) {
          const uid = localStorage.getItem("token");
          if (uid !== "") {
            return redirect("/");
          }
          return "";
        },
      },
      {
        path: "/signup",
        element: (
          <div style={{ marginTop: 100 }}>
            <Signup />
          </div>
        ),
        loader({ params }) {
          const uid = localStorage.getItem("token");
          if (uid !== "") {
            return redirect("/");
          }
          return "";
        },
      },
      {
        path: "/tracks",
        element: (
          <div style={{ marginTop: 100 }}>
            <Tracks />
          </div>
        ),
        async loader({ params }) {
          const uid = localStorage.getItem("token");
          if (uid == "" || !uid) {
            return redirect("/signup");
          }
          const resources = await _fetch(host + "/resources/get");
          const favs = await _fetch(host + "/users/get/?uid=" + uid);
          return {
            resources: resources,
            favorites: favs,
          };
        },
      },
      {
        path: "/tracks/level/:defaultlevel",
        element: (
          <div style={{ marginTop: 100 }}>
            <Tracks />
          </div>
        ),
        async loader({ params }) {
          const uid = localStorage.getItem("token");
          if (uid == "" || !uid) {
            return redirect("/signup");
          }
          const resources = await _fetch(host + "/resources/get");
          const favs = await _fetch(host + "/users/get/?uid=" + uid);
          return {
            resources: resources,
            favorites: favs,
          };
        },
      },
      {
        path: "/tracks/topic/:topic",
        element: (
          <div style={{ marginTop: 100 }}>
            <CustomTrack />
          </div>
        ),
        async loader({ params }) {
          const uid = localStorage.getItem("token");
          if (uid == "" || !uid) {
            return redirect("/signup");
          }
          const resources = await _fetch(host + "/resources/get");
          const favs = await _fetch(host + "/users/get/?uid=" + uid);
          return {
            resources: resources,
            favorites: favs,
          };
        },
      },
      {
        path: "/account",
        element: (
          <div style={{ marginTop: 100 }}>
            <Account />
          </div>
        ),
        async loader({ params }) {
          const uid = localStorage.getItem("token");
          if (uid == "" || !uid) {
            return redirect("/signup");
          }
          const resources = await _fetch(host + "/resources/get");
          const favs = await _fetch(host + "/users/get/?uid=" + uid);
          return {
            resources: resources,
            favorites: favs,
          };
        },
      },
      {
        path: "/manage",
        element: (
          <div style={{ marginTop: 100 }}>
            <Manage />
          </div>
        ),
        async loader({ params }) {
          const uid = localStorage.getItem("token");
          if (uid == "" || !uid) {
            return redirect("/signup");
          }
          const resources = await _fetch(host + "/resources/get");
          const favs = await _fetch(host + "/users/get/?uid=" + uid);
          return {
            resources: resources,
            favorites: favs,
          };
        },
      },
      {
        path: "/",
        element: (
          <div
            style={{
              backgroundColor: "var(--secondary)",
              paddingTop: 20,
              paddingBottom: 0,
              width: "100%",
            }}
          >
            <App />
          </div>
        ),
        loader({ params }) {
          const uid = localStorage.getItem("token");
          if (uid == "" || !uid) {
            return redirect("/signup");
          }
          return {};
        },
      },
    ],
  },
  {
    path: "*",
    element: (
      <div>
        <Navbar />
        <div
          style={{
            backgroundColor: "var(--secondary)",
            color: "white",
            padding: 100,
          }}
        >
          <h1>404 Error</h1>
          <h3>This path does not exist</h3>
        </div>
      </div>
    ),
  },
]);

root.render(<RouterProvider router={router} />);
