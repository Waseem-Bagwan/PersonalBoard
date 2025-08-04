import ratelimit from "../config/upstash.js"


const rateLimiter = async (_,res,next) => {
    try {
        const { success } = await ratelimit.limit('my-limit-key')
        console.log(success)
        if(!success){
            //429 status is used to show that user request has finished , now user can't req and have to wait 
            return res.status(429).json({
                message : 'too many request, your hitting limit is over please after some time'
            })
        }
        next()
    } catch (error) {
        console.log('Error in ratelimit :',error )
        next(error)     
    }
}

export default rateLimiter