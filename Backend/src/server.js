import express, { json } from 'express';
import noteRoute from './routes/notesRouter.js';
import { connectDB } from '../config/db.js';
import dotenv from 'dotenv'
import rateLimiter from '../middleware/rateLimiter.js';
import cors from 'cors'
import path from 'path'



dotenv.config()

// console.log(process.env.MONGO_URI)

const app = express();

const PORT = process.env.PORT || 5001;

const __dirname = path.resolve()

//middleware 
if(process.env.NODE_ENV !== 'production'){
    app.use(cors({
        //by default it allow all request from different frontend site if u want to specific frontend should send request you can name it's url or domain in origin
        origin : 'http://localhost:5173'
    }))
}
app.use(express.json())
app.use(rateLimiter)


app.use('/api/notes',noteRoute);

if(process.env.NODE_ENV === 'production'){

    app.use(express.static(path.join(__dirname,"../Frontend/dist")))

    app.get('*',(req,res) => {
        res.sendFile(path.join(__dirname,"../Frontend","dist","index.html"))
    })
}



connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on PORT : ${PORT}`)
    })
})



