import Note from '../models/Note.js'

export async function getAllNotes(_,res) {
    try {          //finding notes ffrom mongdb               
        const note = await Note.find().sort({createdAt : -1})//it keep the recently created note on top so that we can view the newest note
        res.status(200).json(note);
    } catch (error) {
        console.log('Error in getAllNote controller : ',error);
        res.status(500).json({
            message : 'Internal server error',
        })   
    }
}

export async function createNote(req,res){
    try {
        const { title , content } = req.body
                    //create new note in db
        const note = new Note({title,content});// we would hava mention { title : title , content : content } it have same keyname and valuename , to shorten we can mention {title , content}
        //saving the notes in database 
        note.save()
        res.status(200).json({
            message : 'new note created successfully'
        })
    } catch (error) {
        console.log('Error in createNote controller : ',error);
        res.status(500).json({
            message : 'Internal server error',
        })
    }
}

export async function updateNote(req,res) {
    try {
        const { title , content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id,{ title , content},{
            new : true,
        })
        if(!updatedNote) return res.status(404).json({message : 'id not exist',})
        res.status(200).json(updatedNote)
    
    } catch (error) {
        console.log('Error in updateNote controller : ', error)
        res.status(500).json({
            message : 'Internal server error',
        })
    }
}

export async function deleteNote(req,res){
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id,{new : true})
        if(!deletedNote) return res.status(404).json({ message : 'user not exist'})
        res.status(200).json(deletedNote);
    } catch (error) {
        console.log('Error in deleteNote controller : ',error);
        res.status(500).json({
            message : 'Internal server error',
        })
    }
}

export async function getNote(req,res) {
    try {
        const note = await Note.findById(req.params.id)
        if(!note) return res.status(404).json({
            message :'user not exist'
        })
        res.status(200).json(note);
    } catch (error) {
        console.log('Error in getNote controller : ',error);
        res.status(500).json({
            message : 'Internal server error',
        })
    }
}