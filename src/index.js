import { configDotenv } from "../node_modules/dotenv/lib/main.js";
import { Server } from "./server.js";

configDotenv();

const port = process.env?.port || 3000;
const server = new Server(port);
server.listen();
