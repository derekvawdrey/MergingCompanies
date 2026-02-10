import dotenv from "dotenv";
import express from "express";
import router from "./routes";
import config from "./config/config";
import { Request, Response, NextFunction } from "express";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});

app.use((
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    console.error(err);

    res.status(500).json({
        message: err.message || "Internal server error",
    });
});

app.get("/health", (_req, res) => {
    res.status(200).send("ok");
});

export default app;