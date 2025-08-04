//import it first to use
import mongoose from 'mongoose'

//export it to use  
export const connectDB = async () => {
    try{
        
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`database connected successfully`)
    }
    catch (error){
        console.error(`something went wrong while connecting MONGODB`, error)
        process.exit(1) //:  is used inside the catch block to force the Node.js process to terminate if the connection to MongoDB fails ,1 means failure
    }
}

/*
    i have to create a config folder and file name db.js where i have connected my db 
    db mongo_uri is id and password i have stored it in .env file and i m accessing it through dotenv
*/