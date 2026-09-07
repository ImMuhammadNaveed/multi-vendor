import Product from "../components/product/ProductCard"
import { useSelector } from "react-redux"
import ProductCardAnimation from "../assets/ProductCardAnimation"

function BestSelling() {
    const allProducts = useSelector(state => state.product.allProducts)
    const loading = useSelector(state => state.product.allProductsLoading)
    const data = [...allProducts].sort((a, b) => b.soldOut - a.soldOut)

    return data &&(
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



export default BestSelling
