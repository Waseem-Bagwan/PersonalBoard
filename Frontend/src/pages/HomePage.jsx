import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import Navbar from '../components/Navbar'
import RateLimitAlert from '../components/RateLimitAlert'
import axios from 'axios'
import NoteCard from '../components/NoteCard.jsx'
import NoteNotFound from '../components/NoteNotFound.jsx'
import api from '../lib/axios.js'


const HomePage = () => {
    const [isRateLimit,setIsRateLimit] = useState(false)
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      const fetchNotes = async () => {
        try {
          const res = await api.get("/notes");
          setNotes(res.data)
          setIsRateLimit(false)
        } 
        catch (error) {
            console.log('error in fetching notes :',error)
            if(error.response?.status === 429){
              setIsRateLimit(true)
            }else{
              toast.error('Fail to load note')
            }
        }
        finally{
          setLoading(false)
        }
      }
    
      fetchNotes()
    }, [])
    
    return (

    <div className='min-h-screen '>
       <Navbar/> 
       {isRateLimit && <RateLimitAlert/>}

       <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <div className='text-center text-primary text-lg'>loading notes
            <span className="loading loading-ball loading-xs"></span>
            <span className="loading loading-ball loading-sm"></span>
            <span className="loading loading-ball loading-md"></span>
           
        </div>}

        {notes.length === 0 && !isRateLimit && <NoteNotFound/>}
       </div>

       {/* it only display if user has'nt crossed his rate-limit and if there atleast a note */}
       {notes.length > 0 && !isRateLimit && (
        //it follow the row * col if screen is small it follow grid-col-1 if it is medium, it will follow grid-col-2, if it's large it follow grid-col-3 
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-10'>

          {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes}/>
          ))}
          
        </div>
       )}

    </div>
  )
}

export default HomePage