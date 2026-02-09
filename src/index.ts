import dotenv from "dotenv";
import express from "express";
import router from "./routes";
import config from "./config/config";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});