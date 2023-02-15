import dotenv from 'dotenv';
import express from "express";
import { connectDB } from './config/db.js';
import { protect } from './middleware/authMiddleware.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import { favoriteRouter } from "./routes/favoriteRoutes.js";
import { photosRouter } from "./routes/photoRoutes.js";
import { usersRouter } from "./routes/userRoutes.js";

dotenv.config()
connectDB()

const port = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the Unsplash API!' })
})

app.use('/api/photos', photosRouter)
app.use('/api/users', usersRouter)
app.use('/api/favorites', protect, favoriteRouter)

app.use("*", (req, res) => {
    res.status(404).json({ message: "Resource not found" });
});

app.use(errorHandler)

app.listen(port, () => console.log(`Listening on port ${port}`))