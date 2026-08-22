import { useContext, useEffect, useState } from "react"
import ProductCard from "../components/product/ProductCard"
import { useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"

function Products() {
    const [data, setData] = useState([])
    const allProducts = useSelector(state => state.product.allProducts)
    const [searchParams] = useSearchParams()
    const category = searchParams.get('category')

    useEffect(() => {
        if (category !== null) {
            setData(allProducts.filter((p) => p.category === category))
            console.log(category)
        } else {
            setData(allProducts)
        }
    }, [category, allProducts])

    if (category && data?.length === 0) {
        return (
            <div className="flex items-center justify-center h-50 ">
                <p className="text-lg font-semibold">No product with this category!</p>
            </div>
        )
    }

    return (
        <>
            <div className="bg-[#f6f6f5] py-15">
                <div className="w-[90%] m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
                    {
                        data.map((item) =>
                            <ProductCard item={item} key={item._id} />
                        )
                    }
                </div>
            </div>
        </>
    )
}



export default Products