import { useEffect, useState } from "react"
import Product from "../components/product/ProductCard"
import { productData } from "../static/data"

function BestSelling() {
    const [data, setData] = useState([])
    useEffect(()=>{
        const items = [...productData]
        setData(items.sort((a,b)=>b.total_sell-a.total_sell))
    }, [])
    return(
        <>
        <div className="bg-[#f6f6f5] py-15">
            <div className="w-[90%] m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
                    {
                        data.map((item) =>
                            <Product item={item} key={item.id} />
                        )
                    }
                </div>
        </div>
        </>
    )
}



export default BestSelling