import { useSelector } from "react-redux"
import Product from "./ProductCard"
import ProductCardAnimation from '../../assets/ProductCardAnimation'

function FeatureProducts() {
    const allProducts = useSelector(state=> state.product.allProducts)
    const loading = useSelector(state => state.product.allProductsLoading)
    const recentProducts = [...allProducts]
        .sort((a, b) => new Date(b.createAt) - new Date(a.createAt))
        .slice(0, 10)

    return (
        <>
            <div className="w-[90%] m-auto mt-10">
                <p className="text-3xl font-bold mb-5">Feature Products</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
                    {
                        loading
                            ? Array.from({ length: 10 }, (_, index) => (
                                  <ProductCardAnimation key={index} />
                              ))
                            : recentProducts.map((item) => (
                                  <Product item={item} key={item._id} />
                              ))
                    }

                </div>
            </div>
        </>
    )
}




export default FeatureProducts
