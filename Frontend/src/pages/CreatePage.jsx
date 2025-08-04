import axios from 'axios'
import { ArrowLeftIcon } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router'
import api from '../lib/axios.js'
const CreatePage = () => {
  
  const [title, settitle] = useState('')
  const [content, setcontent] = useState('')
  const [Loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmite = async (e) => {
    e.preventDefault()

    if(!title.trim() || !content.trim()){
        toast.error('All feilds are requierd')
        return
    }
    setLoading(true)
    try {
      await api.post('/notes/createPost',{
        title,
        content
      })
      toast.success('Note created successfully')
      navigate('/')
    } catch (error) {
      if(error.response.status === 429){
        toast.error(`you are creating notes too fast `,{
          duration : 4000,
          icon : "💀",
        })
      }else {
        toast.error('failed to create note')
        console.log('Error in handleSubmite form : ',error)    
      }
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>

          <div className='max-w-2xl mx-auto'>
              <Link to={'/'} className='btn btn-ghost mb-6'>
                <ArrowLeftIcon className='size-5'/><span>Back to Notes</span>
              </Link>

              <div className='card bg-base-100'>
                <div className='card-body'>

                  <h1 className='card-title text-2xl mb-4'>Create New Note</h1>

                  <form onSubmit={handleSubmite}>

                    <div className='form-control mb-4'>
                        <label className='label'>
                          <span className='label-text'>title</span>
                        </label>
                        <input 
                          type="text"
                          placeholder='Note title'
                          className='input input-bordered rounded-full'
                          value={title}
                          onChange={(e) => settitle(e.target.value)} />
                    </div>

                    <div className='form-control mb-4'>
                        <label className='label'>
                          <span className='label-text'>Content</span>
                        </label>
                        <textarea 
                          type="text"
                          placeholder='write your note here '
                          className='textarea textarea-bordered rounded-3xl h-32'
                          value={content}
                          onChange={(e) => setcontent(e.target.value)} />
                    </div>
    
                    <div className='card-actions justify-end'>
                          <button type='submit' className='btn btn-primary' disabled={Loading}>
                            {Loading ? 'Creating...' : 'Create Note'}
                          </button>
                    </div>
                    
                  </form>

                </div>
              </div>
          </div>
      </div>
    </div>
  )
}

export default CreatePage