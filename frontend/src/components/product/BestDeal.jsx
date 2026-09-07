import Product from "./ProductCard"
import { useSelector } from "react-redux"
import ProductCardAnimation from '../../assets/ProductCardAnimation'
function BestDeal() {
    const allProducts = useSelector(state => state.product.allProducts)
    const loading = useSelector(state => state.product.allProductsLoading)
    const data = [...allProducts]
        .sort((a, b) => b.soldOut - a.soldOut)
        .slice(0, 5)
    return data && (
        <>
            <div className="w-[90%] m-auto mt-8">
                <p className="text-3xl font-bold mb-5">Best Deals</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
                    {
                        loading
                            ? Array.from({ length: 5 }, (_, index) => (
                                <ProductCardAnimation key={index} />
                            ))
                            : data.map((item) => (
                                <Product item={item} key={item._id} />
                            ))
                    }
                </div>

            </div>
        </>
    )
}

export default BestDeal
