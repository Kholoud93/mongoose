import "dotenv/config";
import express from "express";
import { connectDB } from "./connection.js";
import errorHandler from "./shared/error.middleware.js";
import userRoutes from "./app/user/user.routes.js";
import noteRoutes from "./app/note/note.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/users", userRoutes);
app.use("/notes", noteRoutes);

app.use(errorHandler);

async function startServer() {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
}

startServer();