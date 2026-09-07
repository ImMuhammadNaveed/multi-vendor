import Product from "../components/product/ProductCard"
import { useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"
import ProductCardAnimation from '../assets/ProductCardAnimation'

function Products() {
    const allProducts = useSelector(state => state.product.allProducts)
    const loading = useSelector(state => state.product.allProductsLoading)
    const [searchParams] = useSearchParams()
    const category = searchParams.get('category')

    const data = category !== null
        ? allProducts.filter(product => product.category === category)
        : allProducts

    if (!loading && category && data?.length === 0) {
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
                        loading
                            ? Array.from({ length: 8 }, (_, index) => (
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



export default Products
