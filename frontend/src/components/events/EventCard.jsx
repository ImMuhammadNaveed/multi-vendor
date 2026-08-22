import { useEffect, useState } from 'react';
import mobile from '../../static/mobile.jpg'
import { FaArrowRight } from "react-icons/fa6";
import { addToCartAction } from '../../redux/actions/cart';
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { backend_url } from '../../server';

function EventCard({ event }) {
    const [timeLeft, setTimeLeft] = useState("")
    const dispatch = useDispatch()

    useEffect(() => {
        if (!event || !event.endingDate) return
        const interval = setInterval(() => {
            const today = Date.now()
            const ending = new Date(event.endingDate).getTime()
            const difference = ending - today
            if (difference <= 0) {
                setTimeLeft("Time's up!")
                clearInterval(interval)
                return
            }
            const days = Math.floor(difference / (24 * 60 * 60 * 1000))
            const hours = Math.floor((difference % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))
            const minutes = Math.floor((difference % (60 * 60 * 1000)) / (60 * 1000))
            const seconds = Math.floor((difference % (60 * 1000)) / (1000))
            setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`)
        }, 1000)
        return()=>clearInterval(interval)
    }, [event])

    // useEffect(() => { calculateTime() }, [event])
    return event && (
        <>
            <div className="bg-white lg:flex items-center p-5 rounded-lg">
                <div className="w-full lg:w-[50%] p-12">
                    <img src={backend_url + `/uploads/${event.images[0]}`} alt="" />
                </div>
                <div className="w-full lg:w-[50%]">
                    <p className='text-2xl font-bold mb-2'>{event.name}</p>
                    <p>{event.description}</p>
                    <div className='flex justify-between items-center my-3'>
                        <div className='flex'>
                            <p className='text-red-500 text-xl line-through font-semibold mr-4'>$ {event.originalPrice}</p>
                            <p className='font-bold text-xl'>$ {event.price}</p>
                        </div>
                        <p className='text-green-500'>{event.soldOut} Sold</p>
                    </div>
                    <p className='text-red-500 text-2xl my-5'>{timeLeft}</p>
                    <div>
                        <Link to={`/products/${event._id}?isEvent=true`} className='bg-black text-white px-7 py-3 rounded-lg cursor-pointer mr-10'>See Details</Link>
                        <button 
                        className='bg-black text-white px-7 py-3 rounded-lg cursor-pointer'
                        onClick={()=>dispatch(addToCartAction(event))}
                        >Buy Now</button>
                    </div>
                    <div className='flex justify-end mt-5'>
                        {/* <p className='flex items-center flex-end'>See More Events <FaArrowRight className='ml-2'/></p> */}
                    </div>
                </div>
            </div>
        </>
    )
}




export default EventCard