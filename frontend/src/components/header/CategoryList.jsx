import { categoriesData } from "../../static/data"
import { Link } from 'react-router-dom'
function CategoryList() {
    return (
        <>
            <div className="bg-white w-70 rounded-b-lg ml-20 absolute z-10">
                {
                    categoriesData.map((item) =>
                        <div className="flex items-center py-3">
                            <img className="w-10 pl-4" src={item.image} alt="" />
                            <Link className="pl-4">{item.title}</Link>
                        </div>
                    )
                }
            </div>
        </>
    )
}


export default CategoryList