import { firebase } from "../firebase/config.js";
import { collection, addDoc } from "firebase/firestore";
import { setHeaders } from "../utility/setHeaders.js";

const userCollection = firebase
                            .firestore()
                            .collection("users");

const getUserData = async (req, res) => {
    const uid = req.query.uid;
    console.log(uid);
    userCollection.doc(uid)
    .get(uid)
    .then((doc) => {
        console.log(doc.data());
        setHeaders(res);
        res.status(200);
        res.json({
            "data": doc.data()
        })
    });
};

const updateFavorites = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
    const uid = req.body.uid;
    const favorites = req.body.favorites;
    console.log(favorites);
    userCollection.doc(uid)
    .update({
        favorites: favorites
    })
    .then(() => {
        console.log("Document successfully updated!");
        res.status(200);
        res.json({
            "data": "Document successfully updated!"
        })
    })
    .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
};

export { getUserData, updateFavorites };