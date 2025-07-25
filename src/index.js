import { configDotenv } from "../node_modules/dotenv/lib/main.js";
import { Server } from "./server.js";

configDotenv();
/* scheduler.addTask("task1", "* * * * * *", () => {
  console.log("Task 1 is running every minute");
});

scheduler.startTask("task1"); */

const port = process.env?.port || 3000;
const server = new Server(port);
server.listen();
