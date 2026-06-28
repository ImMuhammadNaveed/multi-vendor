import { useContext, useState } from "react"
import { categoriesData } from "../../static/data"
import { MdAddCircleOutline } from "react-icons/md";
import { productContext } from "../../context/ProductContext";
import axios from 'axios'

function CreateCoupon() {
    const { backend_url } = useContext(productContext)

    const [name, setName] = useState("")
    const [percentage, setPercentage] = useState("")
    const [minAmount, setMinAmount] = useState("")
    const [maxAmount, setMaxAmount] = useState("")
    const [product, setProduct] = useState("")

    async function handleSubmittion(e) {
        e.preventDefault()
        const form = new FormData()
        const newCoupon={
            name: name,
            value: percentage,
            minAmount: minAmount,
            maxAmount: maxAmount,
            product: product
        }
        try {
            const { data } = await axios.post(backend_url+"/api/coupon/create-coupon", newCoupon, { withCredentials: true })
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
        <div className="flex mx-auto items-center">
            <form
                className="w-120 bg-white mx-auto p-3 h-fit overflow-y-auto scrollbar-hide rounded-md"
                onSubmit={handleSubmittion}
            >
                <div className="text-center">
                    <p className="text-2xl font-semibold mb-2">Create Coupon</p>
                </div>
                <div className="mb-4">
                    <p className="mb-1 text-sm font-semibold">Name <span className="text-red-500">*</span></p>
                    <input
                        type="text"
                        className="border border-gray-200 rounded-sm w-full p-1 focus:outline-none text-sm"
                        placeholder="Enter your coupon name..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <p className="mb-1 text-sm font-semibold">Discount Percentage <span className="text-red-500">*</span></p>
                    <input
                        type="number"
                        className="border border-gray-200 rounded-sm w-full p-1 focus:outline-none text-sm"
                        placeholder="Enter your coupon percentage..."
                        value={percentage}
                        onChange={(e) => setPercentage(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <p className="mb-1 text-sm font-semibold">Min Amount</p>
                    <input
                        type="number"
                        className="border border-gray-200 rounded-sm w-full p-1 focus:outline-none text-sm"
                        placeholder="Enter your coupon min amount..."
                        value={minAmount}
                        onChange={(e) => setMinAmount(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <p className="mb-1 text-sm font-semibold">Max Amount</p>
                    <input
                        type="number"
                        className="border border-gray-200 rounded-sm w-full p-1 focus:outline-none text-sm"
                        placeholder="Enter your coupon max amount..."
                        value={maxAmount}
                        onChange={(e) => setMaxAmount(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <p className="mb-1 text-sm font-semibold">Selected Product</p>
                    <select
                        name=""
                        id=""
                        className="border border-gray-200 rounded-sm w-full p-1 focus:outline-none text-sm"
                        value={product}
                        onChange={(e) => setProduct(e.target.value)}
                    >
                        <option value="" disabled>
                            Select a product
                        </option>
                        <option value="abc">abc</option>
                        <option value="def">def</option>
                    </select>
                </div>
                <div >
                    <button
                        type="submit"
                        className="border border-gray-200 rounded-sm w-full p-1 focus:outline-none text-sm cursor-pointer"
                    >
                        Create
                    </button>
                </div>
            </form>
            </div>
        </>
    )
}


export default CreateCoupon