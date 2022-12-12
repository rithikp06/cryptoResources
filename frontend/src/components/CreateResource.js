import React, { useState } from "react";
import { firebase } from "../firebase/config.js";
import { collection, addDoc } from "firebase/firestore"; 



const CreateResource = () => {
    const addResource = async (event) => {
        event.preventDefault();
        // return;
        const db = firebase.firestore();
        const docRef = await addDoc(collection(db, "resources"), {
            experience_level: exp,
            name: name,
            topic: topic,
            url: url
        });
        console.log("Document written with ID: ", docRef.id);
    };
    
      
    const [exp, setExp] = useState("");
    const [name, setName] = useState("");
    const [topic, setTopic] = useState("");
    const [url, setUrl] = useState("");
    return (
        <div>
            <h1>create resource</h1>
            <div>
                <form onSubmit={addResource}>
                Name: <input type="text" value={name} onChange={(event)=>{setName(event.target.value)}}></input>
                URL: <input type="text" value={url} onChange={(event)=>{setUrl(event.target.value)}}></input>
                Experience Level: <input type="text" value={exp} onChange={(event)=>{setExp(event.target.value)}}></input>
                Topic: <input type="text" value={topic} onChange={(event)=>{setTopic(event.target.value)}}></input>
                {/* Password: <input type="password" value={password} onChange={()=>{}}></input> */}
                <input type="submit" value="Resource Create" />
                </form>
            </div>
        </div>
    );
};

export default CreateResource;