import { useContext, useEffect, useState } from "react"
import Product from "./ProductCard"
import { productContext } from "../../context/ProductContext"
function BestDeal() {
    const [data, setData] = useState([])
    const {allProducts} = useContext(productContext)

    useEffect(() => {
        const sortedProducts = [...allProducts].sort((a, b) => b.soldOut - a.soldOut)
        setData(sortedProducts.slice(0, 5))
    }, [allProducts])
    // useEffect(() => { console.log(data) }, [data])
    return data&&(
        <>
            <div className="w-[90%] m-auto mt-8">
                <p className="text-3xl font-bold mb-5">Best Deals</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
                    {
                        data.map((item) =>
                            <Product item={item} key={item._id} />
                        )
                    }
                </div>

            </div>
        </>
    )
}

export default BestDeal