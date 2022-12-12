import createDataContext from "./createDataContext";
import { firebase } from "../firebase/config.js";


require('firebase/auth');

const signup = async (email, password, setToken, toast) => {
    console.log("signup");
    console.log("password: " + email);
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((response) => {
      if (toast) {
        toast.success("Successfully Signed Up", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      const uid = response.user.uid;
      const data = {
        id: uid,
        email,
        favorites: {}
      };
      const usersRef = firebase.firestore().collection("users");
      usersRef
        .doc(uid)
        .set(data)
        .then(() => {
          localStorage.setItem("token", uid);
          console.log("test token set");
        })
        .then(() => {
          setToken(uid);
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
        toast.error(error.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.log("error", error.message);
    });
};

const signin = async (email, password, setToken, toast) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((response) => {
      const uid = response.user.uid;
      const usersRef = firebase.firestore().collection("users");
      usersRef
        .doc(uid)
        .get()
        .then((firestoreDocument) => {
          if (!firestoreDocument.exists) {
            return;
          }
          if (toast) {
            toast.success("Successfully Logged In", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
          const data = firestoreDocument.data();
        })
        .then(() => {
          localStorage.setItem("token", uid);
        })
        .then(() => {
          setToken(uid);
        })
        .catch((error) => {
          setToken("invalid");
          // console.log(error);
        })
    })
    .catch((error) => {
      toast.error("Invalid Credentials", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });
};

const signout = (dispatch) => () => {
  localStorage.removeItem("token");
};

export { signup, signout, signin };