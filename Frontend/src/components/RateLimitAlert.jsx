import { ZapIcon } from 'lucide-react'
import React from 'react'

const RateLimitAlert = () => {
  return (
    <div className='mx-auto max-w-6xl px-4 py-8'>
        <div role="alert" className="bg-primary/10 border border-primary/30 rounded-lg shadow-md px-6 py-4 flex items-center gap-7  ">
            <div className='bg-primary/80 rounded-full p-4 flex-shrink-0'>
                <ZapIcon />
            </div>
            <div>
                <h1 className='font-bold text-2xl'>Rate Limiter</h1>
                <span className='font-semibold'>You made too many request in short period. Please wait a moment</span>
                <p className='font-sm'>Try again in few minutes for best exprience</p>
            </div>
        </div>
    </div>
  )
}

export default RateLimitAlert