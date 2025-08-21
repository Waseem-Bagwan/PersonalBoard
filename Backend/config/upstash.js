//if you are facing cjs syntaxError it could resolved with this 
import pkg from '@upstash/ratelimit'
const { Ratelimit } = pkg
import { Redis } from '@upstash/redis'
import dotenv from 'dotenv'

dotenv.config()

// creating rate limiter that allow 10 request per 20 seconds
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),// access redis from .env             
    limiter : Ratelimit.slidingWindow(100,"60s") // slidingWindow(request : 100,time : 20 seconds)
})

export default ratelimit
