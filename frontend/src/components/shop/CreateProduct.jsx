import { useState } from "react"
import { categoriesData } from "../../static/data"
import { MdAddCircleOutline } from "react-icons/md";
import axios from 'axios'
import { backend_url } from "../../server";
import { MdOutlineCancel } from "react-icons/md";
import { toast } from "react-toastify";
import LoadingButton from "../loading/LoadingButton";

function CreateProduct() {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("cosmetics and body care")
    const [tags, setTags] = useState("")
    const [originalPrice, setOriginalPrice] = useState("")
    const [price, setPrice] = useState("")
    const [stock, setStock] = useState("")
    const [images, setImages] = useState([])
    const [previewImages, setPreviewImages] = useState([])
    const [submitting, setSubmitting] = useState(false)

    function handleImages(e) {
        const files = Array.from(e.target.files)
        setImages((prev) => [...prev, ...files])
        const imagesUrls = files.map((file) => URL.createObjectURL(file))
        setPreviewImages((prev) => [...prev, ...imagesUrls])
    }

    async function handleSubmittion(e) {
        const form = new FormData()
        form.append("name", name)
        form.append("description", description)
        form.append("category", category)
        form.append("tags", tags)
        form.append("originalPrice", originalPrice)
        form.append("price", price)
        form.append("stock", stock)
        images.forEach((image) => { form.append("images", image) })
        // form.append("images", images)
        // console.log(form)
        try {
            e.preventDefault()
            setSubmitting(true)
            const { data } = await axios.post(backend_url + "/api/product/create-product", form, { withCredentials: true })
            if (data.success) {
                setName("")
                setDescription("")
                setCategory("cosmetics and body care")
                setTags("")
                setOriginalPrice("")
                setPrice("")
                setStock("")
                setImages([])
                setPreviewImages([])
                toast.success(data.message)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error.response.data.message)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <>
            <div className="flex items-center mx-auto my-auto">
                <form
                    className="w-120 bg-white mx-auto p-3 lg:h-115 h-full overflow-y-auto scrollbar-hide rounded-md"
                    onSubmit={handleSubmittion}
                >
                    <div className="text-center">
                        <p className="text-2xl font-semibold mb-2">Create Product</p>
                    </div>
                    <div className="mb-4">
                        <p className="mb-1 text-sm font-semibold">Name <span className="text-red-500">*</span></p>
                        <input
                            type="text"
                            className="border border-gray-200 rounded-sm w-full p-1 focus:outline-none text-sm"
                            placeholder="Enter your product name..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <p className="mb-1 text-sm font-semibold">Description <span className="text-red-500">*</span></p>
                        <textarea
                            rows={5}
                            type="text"
                            className="border border-gray-200 rounded-sm w-full p-1 focus:outline-none text-sm"
                            placeholder="Enter your product description..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        >
                        </textarea>
                    </div>
                    <div className="mb-4">
                        <p className="mb-1 text-sm font-semibold">Category <span className="text-red-500">*</span></p>
                        <select
                            name=""
                            id=""
                            className="border border-gray-200 rounded-sm w-full p-1 focus:outline-none text-sm"
                            defaultValue="cosmetics and body care"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            {categoriesData.map((item) =>
                                <option value={item.title} key={item.title}>{item.title}</option>
                            )}
                        </select>
                    </div>
                    <div className="mb-4">
                        <p className="mb-1 text-sm font-semibold">Tags</p>
                        <input
                            type="text"
                            className="border border-gray-200 rounded-sm w-full p-1 focus:outline-none text-sm"
                            placeholder="Enter your product tags..."
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <p className="mb-1 text-sm font-semibold">Original Price</p>
                        <input
                            type="text"
                            className="border border-gray-200 rounded-sm w-full p-1 focus:outline-none text-sm"
                            placeholder="Enter your product price..."
                            value={originalPrice}
                            onChange={(e) => setOriginalPrice(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <p className="mb-1 text-sm font-semibold">Price (With Discount) <span className="text-red-500">*</span></p>
                        <input
                            type="text"
                            className="border border-gray-200 rounded-sm w-full p-1 focus:outline-none text-sm"
                            placeholder="Enter your product price with discount..."
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <p className="mb-1 text-sm font-semibold">Product Stock <span className="text-red-500">*</span></p>
                        <input
                            type="text"
                            className="border border-gray-200 rounded-sm w-full p-1 focus:outline-none text-sm"
                            placeholder="Enter your product stock..."
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <p className="mb-1 text-sm font-semibold">Upload Images <span className="text-red-500">*</span></p>
                        <div className="flex items-center">
                            <label htmlFor="images" className="w-10 flex justify-center cursor-pointer">
                                <MdAddCircleOutline />
                                <input
                                    type="file"
                                    id="images"
                                    hidden
                                    onChange={handleImages}
                                />
                            </label>
                            {
                                previewImages.map((item, index) =>
                                    <div key={index} className="relative w-20 h-20">
                                        <MdOutlineCancel
                                            className="absolute -top-2 -right-2 cursor-pointer z-10"
                                            onClick={() => {
                                                setPreviewImages((prev) => prev.filter((_, i) => i !== index))
                                                setImages((prev) => prev.filter((_, i) => i !== index))
                                            }}
                                        />
                                        <img
                                            src={item}
                                            alt=""
                                            className="w-20 h-20 object-cover rounded"
                                        />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div >
                        <LoadingButton
                            loading={submitting}
                            type="submit"
                            className="border border-gray-200 rounded-sm w-full p-1 focus:outline-none text-sm cursor-pointer"
                        >
                            Create
                        </LoadingButton>
                    </div>
                </form>
            </div>
        </>
    )
}


export default CreateProduct
