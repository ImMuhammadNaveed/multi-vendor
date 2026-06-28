import { useContext, useEffect, useState } from "react"
// import { productData } from "../static/data"
import ProductCard from "../components/product/ProductCard"
import {productContext} from "../context/ProductContext"

function Products() {
    const [data, setData] = useState([])
    const {allProducts} = useContext(productContext)
    useEffect(()=>{
        setData(allProducts)
    }, [])
    return(
        <>
        <div className="bg-[#f6f6f5] py-15">
            <div className="w-[90%] m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
                    {
                        data.map((item) =>
                            <ProductCard item={item} key={item.id} />
                        )
                    }
                </div>
        </div>
        </>
    )
}



export default Products