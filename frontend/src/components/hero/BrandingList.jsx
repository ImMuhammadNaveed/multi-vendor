import { brandingData } from "../../static/data"
import { categoriesData } from "../../static/data"
import { Link } from "react-router-dom"
function BrandigList() {
    return (
        <>
            <div className="flex bg-white mt-12 w-[90%] m-auto justify-between rounded-lg">
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
            <div className="flex flex-wrap gap-5 bg-white mt-12 p-10 w-[90%] m-auto justify-between rounded-lg">
                {
                    categoriesData.map((item) =>
                        <div key={item.id} className="flex items-center justify-even w-1/4 cursor-pointer">
                            <Link className="text-lg w-[50%]">{item.title}</Link>
                            <img className="w-25 w-[50%]" src={item.image} alt="" />
                        </div>
                    )
                }
            </div>
        </>
    )
}



export default BrandigList