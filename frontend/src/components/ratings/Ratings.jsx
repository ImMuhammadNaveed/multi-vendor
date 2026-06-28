import {FaStar, FaStarHalfAlt, FaRegStar} from 'react-icons/fa'

function Ratings({rating}) {
    const fullStars = Math.floor(rating)
    const halfStar = rating - fullStars >= 0.25 && rating - fullStars < 0.75
    const emptyStars = Math.floor(5 - rating)
    return (
        <div className='flex'>
            {
                Array.from({ length: fullStars }).map((_, i) =>
                    <FaStar key={i}
                        color='#F6BA00'
                        className='mr-2'
                    />
                )
            }
            {halfStar ? <FaStarHalfAlt key="half" color="#F6BA00" className='mr-2' /> : null}
            {emptyStars > 0 ? Array.from({ length: emptyStars }).map((_, i) =>
                <FaRegStar key={i}
                    color='#F6BA00'
                    className='mr-2'
                />
            ) : ""
            }
        </div>
    )
}


export default Ratings