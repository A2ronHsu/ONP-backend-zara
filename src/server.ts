
import express from "express"; 
import dotenv from 'dotenv';
import routes from "./routes";
import { Request, Response } from "express";

dotenv.config();
const server = express();

server.use(express.json());
server.use(routes);
server.use((req: Request, res: Response)=>{
   res.status(404);
   res.sendStatus(404);
   // res.json({
   //    error: 'route not found'
   // })
})
console.log(process.env.PORT);


server.listen(process.env.PORT);
console.log( 'server online' );