import { ArrowLeftIcon, DeleteIcon, LoaderIcon, TrashIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import api from '../lib/axios.js';
import toast from 'react-hot-toast';

const NoteDetailPage = () => {

  const [Notes, setNotes] = useState(null);
  const [Loading, setLoading] = useState(true);
  const [Saving, setSaving] = useState(false);

  const navigate = useNavigate()

  //Hook to grab id from url 
  const { id } = useParams()
  // console.log({id})

  useEffect(() => {
    const fetchNotes = async() => {
      try {
        const res = await api.get(`/notes/${id}`)
        setNotes(res.data)

      } catch (error) {
        console.log('Error while fetching data',error)
        toast.error(`Failed to load Note...`)
      }
      finally{
        setLoading(false)
      }
    }

    fetchNotes()

    //whenever there is change in id useEffect will run 
  },[id])



  console.log({ Notes })

  if(Loading){
    return (
      <div className='min-h-screen flex items-center justify-center'>
         <LoaderIcon className='animate-spin size-10'/> 
      </div>
    )
  }

  const handleDelete = async () => {
    if(!window.confirm(`Are you sure you want to delete`)) return;
    try {
      await api.delete(`/notes/${id}`)
      toast.success(`Notes deleted successfully`);
      navigate('/')
    } catch (error) {
      
      console.log(`Error in handle delete : `,error);
      toast.error(`Failed to delete note`)
    }
  }

  const handleSave = async () => {
    // setLoading(true)
    if(!Notes.title.trim() || !Notes.content.trim()){
      toast.error(`please add title or content`)
      return;
    }

    setSaving(true)
    
    const { title , content } = Notes

    try {
      await api.put(`/notes/${id}`,{title,content})
      toast.success(`note updated successfully`)
      navigate('/')
      // setLoading()
    } catch (error) {
      console.log(`Error in handleSave : `,error)
      toast.error(`Failed to update note`)
    }
    finally{
      setSaving(false)
    }
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className="container mx-auto px-4 py-8">
        <div className='max-w-2xl mx-auto'>
          <div className='flex items-center justify-between mb-6'>
            <Link to={'/'} className='btn btn-ghost'>
                <ArrowLeftIcon className='size-5' /><span>Back to Note</span>
            </Link>
            <button onClick={handleDelete} className='btn btn-error btn-outline'>
              <TrashIcon className='size-5'/><span>Delete</span>
            </button>
          </div>

          <div className='card bg-base-100'>
              <div className="card-body">
              <h1 className='card-title text-2xl '></h1>
                              {/* use form-control to apply consistent styling to form elements like labels, inputs, selects */}
                <div className='form-control mb-4'>
                        <label className='label'>
                          <span className='label-text'>Title</span>
                        </label>
                        <input 
                          type="text"
                          placeholder='Note title'
                          className='input input-bordered'
                          value={Notes.title}
                          onChange={(e) => setNotes({...Notes,title:e.target.value})}
                         />
                </div>
                <div className='form-control mb-4'>
                    <label className='label'>
                        <span className='label-text'>
                            Content
                        </span>
                    </label>
                    <textarea
                      type="text"
                      value={Notes.content}
                      placeholder='Write your note here '
                      className='textarea textarea-bordered h-32 rounded-2xl  '
                      onChange={ (e) => setNotes({...Notes,content:e.target.value})}
                    />
                </div>
                <div className=' card-actions flex items-center justify-end'>
                  <button className='btn btn-primary' disabled={Saving} onClick={() => {
                    handleSave()
                  }}>
                    {Saving ? 'Saving...' : 'Save Note'}
                  </button>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage

