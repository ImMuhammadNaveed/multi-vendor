import { backend_url } from "../../server"
import Ratings from "../ratings/Ratings"

function ShopReviews({ shopReviews }) {
    return shopReviews && (
        <>
            {
                shopReviews.map((review) =>
                    <div className="flex items-center gap-2 mb-2">
                        <img
                            className="w-15 h-15 object-cover rounded-full"
                            src={backend_url + "/uploads/" + review.user.avator}
                            alt="" 
                        />
                        <div className="">
                            <div className="flex items-center gap-4">
                                <p>{review.user.name}</p>
                                <Ratings rating={review.rating}/>
                            </div>
                            <p>{review.comment}</p>
                        </div>
                    </div>
                )
            }
        </>
    )
}
export default ShopReviews