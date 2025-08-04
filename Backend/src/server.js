import express, { json } from 'express';
import noteRoute from './routes/notesRouter.js';
import { connectDB } from '../config/db.js';
import dotenv from 'dotenv'
import rateLimiter from '../middleware/rateLimiter.js';
import cors from 'cors'

dotenv.config()

// console.log(process.env.MONGO_URI)

const app = express();

const PORT = process.env.PORT || 5001;

//middleware 
app.use(cors({
    //by default it allow all request from different frontend site if u want to specific frontend should send request you can name it's url or domain in origin
    origin : 'http://localhost:5173'
}))
app.use(express.json())
app.use(rateLimiter)


app.use('/api/notes',noteRoute);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on PORT : ${PORT}`)
    })
})



