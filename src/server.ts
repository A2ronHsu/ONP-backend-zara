
import express from "express"; 
import dotenv from 'dotenv';
import routes from "./routes";

dotenv.config();

const server = express();

server.use(routes);
console.log(process.env.PORT);


server.listen(process.env.PORT);
console.log( 'server online' );