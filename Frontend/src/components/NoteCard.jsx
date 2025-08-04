import React, { useEffect } from 'react'
import { PenSquareIcon, Trash2Icon } from 'lucide-react';
import { Link, useNavigate } from 'react-router'
import { formatDate } from '../lib/utils.js';
import api from '../lib/axios.js'
import toast from 'react-hot-toast';

const NoteCard = ({note , setNotes }) => {
    const naviagte = useNavigate()
    const handleDelete = async (e, id) => {
        e.preventDefault()
        if(!window.confirm(`Are you sure you want to delete `)) return;
        try {
            await api.delete(`/notes/${id}`)
            setNotes((prev) => prev.filter(note => note._id !== id))
            toast.success('note deleted successfully')
        } catch (error) {
            console.log('Error in handleDelete : ',error)
            toast.error('failed to delete note')
        }
    }

  return (
        <Link to={`/note/${note._id}`}
            className='card bg-black hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-primary'
        >

            <div className='card-body'>

                <h3 className='card-title text-base-content'>{note.title}</h3>
                <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
                <div className='card-actions items-center justify-between mt-4'>
                    
                    <span className='text-sm text-base-content/60 '>
                        {formatDate(new Date(note.createdAt))}
                    </span>

                    <div className='flex items-center gap-1'>
                        <PenSquareIcon className='size-4'/>
                        <button className='btn btn-ghost btn-xs text-error' onClick={(e) => handleDelete(e,note._id)}>
                            <Trash2Icon className='size-4'/>
                        </button>
                    </div>
                     
                </div>

            </div>

        </Link>
    )
}

export default NoteCard