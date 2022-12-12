import React, { useState, useEffect } from 'react';
import { useLoaderData } from "react-router-dom";
import ManageResources from '../components/ManageResources';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";

const Manage = () => {
    const userData = useLoaderData().favorites;
    const [resources, setResources] = useState(useLoaderData().resources.data);
    const [submitted, setSubmitted] = useState(false);
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [level, setLevel] = useState("");
    const [topic, setTopic] = useState("");
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        console.log("level",level);
    }, [level])
    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitted(true);
        console.log(submitted);
        if (name.length == 0 || url.length == 0 || level.length == 0 || topic.length == 0) {
            return;
        }
        let toastMessage = "Successfully Created Resource";
        const temp = resources.map((resource) => {return resource.url})
        console.log("temp",temp);
        const idx = temp.findIndex((resource)=> {return resource==url});
        let newResources = resources;
        if (idx != -1) {
            newResources[idx] = {
                url: url,
                experience_level: level,
                topic: topic,
                name: name
            }
            toastMessage = "Successfully Updated Resource";
        } 
        else {
            newResources.push({
                url: url,
                experience_level: level,
                topic: topic,
                name: name
            });
        }
        toast.success(toastMessage, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        setResources(newResources);
        fetch("http://localhost:3001/resources/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                url: url,
                experience_level: level,
                topic: topic,
                name: name
            })
        });
        setUpdate(!update);
    }

    useEffect(() => {
        console.log(resources);
        // console.log(resources.data.map((resource) => {return resource.url}));
        document.title = "Manage Resources";  
    }, []);

    return (
        <div style={{margin: 40}}>
            <ToastContainer/>
            <h4>
                Create/Update Resource
            </h4>
            <Form style={{maxWidth: 700}} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail" >
                    <Form.Label>Resource Name</Form.Label>
                    <Form.Control className={(submitted && name.length == 0) ? "is-invalid" : (submitted ? "is-valid" : "") } type="" placeholder="Enter name" value={name} onChange={(event) => setName(event.target.value)} />
                    {submitted && name.length == 0 && <Form.Text className="text-muted" >
                        Name cannot be empty
                    </Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Resource URL</Form.Label>
                    <Form.Control className={(submitted && url.length == 0) ? "is-invalid" : (submitted ? "is-valid" : "") } type="" placeholder="Enter url" value={url} onChange={(event) => setUrl(event.target.value)} />
                    {submitted && url.length == 0 && <Form.Text className="text-muted" >
                        URL cannot be empty
                    </Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Experience Level</Form.Label>
                    {/* <Form.Control  className={(submitted && level.length == 0) ? "is-invalid" : (submitted ? "is-valid" : "") } type="select" placeholder="Enter level" value={level} onChange={(event) => setLevel(event.target.value)}/> */}
                    <Form.Select className={(submitted && level.length == 0) ? "is-invalid" : (submitted ? "is-valid" : "") } type="select" placeholder="Enter level" value={level} onChange={(event) => setLevel(event.target.value)}>
                        <option value="">Select Level...</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </Form.Select>
                    {submitted && level.length == 0 && <Form.Text className="text-muted" >
                        Select a level
                    </Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Topic</Form.Label>
                    <Form.Control className={(submitted && topic.length == 0) ? "is-invalid" : (submitted ? "is-valid" : "") } type="" placeholder="Enter topic" value={topic} onChange={(event) => setTopic(event.target.value)} />
                    {submitted && topic.length == 0 && <Form.Text className="text-muted" >
                        Topic cannot be empty
                    </Form.Text>}
                </Form.Group>
                <Button variant="primary" type="submit">
                Submit
                </Button>
            </Form>
            <h4 style={{marginTop: 30, marginBottom: -10}}>
                Delete Resources
            </h4>
            <ManageResources
                method="DELETE"
                reverseDelete={true}
                key={update}
                url={"http://localhost:3001/resources/update"} 
                favs={resources.map((resource) => {return resource.url})}
                resources={resources}
            />
        </div>
    );
}

export default Manage;