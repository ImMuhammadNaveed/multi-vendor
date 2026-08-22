import { useNavigate } from 'react-router-dom'
import hero_bg from '../../static/hero-bg.jpg'
function Hero() {
    const navigate = useNavigate()
    
    return(
        <>
        <div className="h-120 relative" style={{backgroundImage: `url(${hero_bg})`}}>
            <div className='w-[90%] md:w-[70%] lg:w-[60%] m-auto'>
                <p className='text-3xl md:text-4xl lg:text-6xl font-semibold pt-13 text-[#3D3A3A]'>Best Collection For <br /> Home Decoration</p>
                <p className='text-lg my-7 text-[#3D3A3A]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti quas ad <br />facilis quo hic aliquid repellat voluptatem, ullam ratione, accusantium beatae illum voluptatum voluptas ea <br />alias pariatur blanditiis reiciendis libero.</p>
                <button onClick={()=>navigate("/products")} className='text-white bg-black px-7 py-3 rounded-xl text-lg cursor-pointer'>Shop Now</button>
            </div>
            <div className='absolute top-0 left-20 z-50'>
            </div>
        </div>
        
        </>
    )
}



export default Hero