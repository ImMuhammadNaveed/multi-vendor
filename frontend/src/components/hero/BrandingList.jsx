import { brandingData } from "../../static/data"
import { categoriesData } from "../../static/data"
import { Link } from "react-router-dom"
function BrandigList() {
    return (
        <>
            <div className="hidden md:flex bg-white mt-12 w-[90%] m-auto justify-between rounded-lg">
                {
                    brandingData.map((item) =>
                        <div key={item.id} className="flex p-[20px] items-center">
                            {item.icon}
                            <div className="ml-2">
                                <p className="font-bold">{item.title}</p>
                                <p className="text-sm">{item.Description}</p>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 bg-white mt-12 p-10 w-[90%] m-auto justify-between rounded-lg">
                {
                    categoriesData.map((item) =>
                        <Link to={`/products/?category=${item.title}`} key={item.id} className="flex items-center justify-between cursor-pointer">
                            <p className="text-lg w-[50%]">{item.title}</p>
                            <img className="w-25" src={item.image} alt="" />
                        </Link>
                    )
                }
            </div>
        </>
    )
}



export default BrandigList