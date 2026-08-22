import { categoriesData } from "../../static/data"
import { Link } from 'react-router-dom'
function CategoryList({ setShowCategory }) {
    return (
        <>
            <div className="bg-white w-70 rounded-b-lg ml-20 absolute z-10">
                {
                    categoriesData.map((item) =>
                        <Link
                            to={`/products/?category=${item.title}`}
                            className="flex items-center py-3 hover:bg-[#f6f6f5]"
                            onClick={() => setShowCategory(false)}
                        >
                            <img className="w-10 pl-4" src={item.image} alt="" />
                            <p className="pl-4">{item.title}</p>
                        </Link>
                    )
                }
            </div>
        </>
    )
}


export default CategoryList