import "reflect-metadata";
import dotenv from "dotenv";
import express from "express";
import router from "./routes";
import config from "./config/config";
import { Request, Response, NextFunction } from "express";
import { HttpError } from "./common";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

app.get("/health", (_req, res) => {
    res.status(200).send("ok");
});

app.use((
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    console.error(err);

    const status = err instanceof HttpError ? err.status : 500;
    const message = err.message || "Internal server error";

    res.status(status).json({ message });
});

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});

export default app;