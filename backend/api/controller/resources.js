import { firebase } from "../firebase/config.js";
import { doc, collection, setDoc } from "firebase/firestore";
import { setHeaders } from "../utility/setHeaders.js";

const resourceCollection = firebase
                            .firestore()
                            .collection("resources");

const createResource = async (req, res) => {
    console.log(req.body.url);
    resourceCollection
    .doc(req.body.url)
    .set({
        experience_level: req.body.experience_level,
        name: req.body.name,
        topic: req.body.topic,
        url: req.body.url
    })
    .then(() => {
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.status(200);
        res.json({
            "data": "Document successfully written!"    
        });
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
};

const getResources = async (req, res) => {
    let resources = [];
    await resourceCollection.get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                resources.push(doc.data());
            });
        })
        .then(() => {
            // Website you wish to allow to connect
            setHeaders(res);    
    // Request methods you wish to allow
    
            res.status(200);
            res.json({
                "data": resources
            });
        });
    
};

const updateResources = async (req, res) => {
    const urls = req.body.favorites;
    console.log(urls);

    var batch = firebase.firestore().batch();
    urls.forEach((url) => {
        batch.delete(resourceCollection.doc(url));
    });
    
    batch.commit()
    .then(() => {
        console.log("Documents successfully deleted!");
        res.status(200);
        res.json({
            "data": "deletion done"
        });
    })
    .catch((error) => {
        console.log(error);
    });

    
};


export { getResources, createResource, updateResources };