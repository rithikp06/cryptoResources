import express from "express";
import bodyParser from "body-parser";
import routesApi from "./api/routes/index.js";

const server = express();
const port = process.env.PORT || 3001;

server.use(bodyParser.json());
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use('/', routesApi);

server.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
  });

server.listen(port, () => console.log('server started on port ' + port));

export default server;