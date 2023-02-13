
import dotenv from 'dotenv';
import express from "express";
import { connectDB } from './config/db.js';
import { photosRouter } from "./routes/photoRoutes.js";
import { usersRouter } from "./routes/userRoutes.js";
dotenv.config()
connectDB()

const port = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/api/photos', photosRouter)
app.use('/api/users', usersRouter)

app.use('/', (req, res) => {
    res.status(200).json({ 'message': 'Welcome to the Unsplash API!' })
})


app.listen(port, () => console.log(`Listening on port ${port}`))
