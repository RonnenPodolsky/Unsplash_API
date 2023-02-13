
import dotenv from 'dotenv';
import express from "express";
import { photosRouter } from "./routes/photoRoutes.js";
dotenv.config()

const port = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/api/photos', photosRouter)

app.use('/', (req, res) => {
    res.status(200).json({ 'message': 'Welcome to the Unsplash API!' })
})


app.listen(port, () => console.log(`Listening on port ${port}`))
