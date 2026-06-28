import sony from '../../static/sony.png'
import dell from '../../static/dell.png'
import microsoft from '../../static/microsoft.png'
function Sponser() {
    return(
        <>
        <div className="w-[90%] m-auto bg-white rounded-lg flex justify-between items-center p-10 mt-10">
            <div className='flex'>
                <img src={sony} alt="" className='w-35 object-contain' />
                <img src={dell} alt="" className='w-35 object-contain ml-10' />
            </div>
            <img src={microsoft} alt="" className='w-35 object-contain' />
        </div>
        </>
    )
}




export default Sponser