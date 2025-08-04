import mongoose from "mongoose";


//Sturcture 
const noteSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    content : {
        type : String,
        required : true,
    }
},{ timestamps:true }) // it would provide time by mongo when it is createAt,updateAt last time  

//this is how we create model which handle the crud operation
//it is created based on sechema
const Note = mongoose.model('Note',noteSchema);
                        //modelname,
//mongoose.model('Note', noteSchema):
// This tells Mongoose: “Create a Model called 'Note' that uses the structure (noteSchema) we just defined.”

// The Model is an object we use in our application code to interact with a MongoDB collection. It handles CRUD operations (Create, Read, Update, Delete) for us.

export default Note