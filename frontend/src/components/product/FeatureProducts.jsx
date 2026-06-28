import { productData } from "../../static/data"
import { productContext } from "../../context/ProductContext"
import Product from "./ProductCard"
import { useContext } from "react"

function FeatureProducts() {
    const { allProducts } = useContext(productContext)
    const recentProducts = [...allProducts]
        .sort((a, b) => new Date(b.createAt) - new Date(a.createAt))
        .slice(0, 10)

    return (
        <>
            <div className="w-[90%] m-auto mt-10">
                <p className="text-3xl font-bold mb-5">Feature Products</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
                    {
                        recentProducts.map((item) =>
                            <Product item={item} key={item.id} />
                        )
                    }

                </div>
            </div>
        </>
    )
}




export default FeatureProducts