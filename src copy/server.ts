import Express from "express";
import dotenv from "dotenv";

import routes from "./routes";

dotenv.config();

const server = Express();

server.use(routes);

server.listen(process.env.PORT);