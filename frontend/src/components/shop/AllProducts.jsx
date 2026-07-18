import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { generalContext } from "../../context/Context"
import { AiOutlineEye } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { shopContext } from "../../context/ShopContext";
import { backend_url } from "../../server";
import { getShopProductsAction } from "../../redux/actions/product";
import { useDispatch, useSelector } from "react-redux";

function AllProducts() {
    const shopProducts = useSelector(state=> state.product.shopProducts)
    const sellerData = useSelector(state=> state.shop.seller)
    const dispatch = useDispatch()

    useEffect(() => { 
        dispatch(getShopProductsAction(sellerData._id))
    }, [sellerData])


    const cols = [
        { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.9 },
        { field: "name", headerName: "Name", minWidth: 180, flex: 0.9 },
        { field: "stock", headerName: "Stock", type: "number", minWidth: 80, flex: 0.5 },
        { field: "sold", headerName: "Sold Out", type: "number", minWidth: 130, flex: 0.5 },
        {
            field: "preview", headerName: "", minWidth: 50, flex: 0.5, type: "number",
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/products/${params.row.id}`} className="h-full flex justify-center items-center">
                            <AiOutlineEye size={20} />
                        </Link>
                    </>
                )
            }
        },

    ]
    const rows = shopProducts && shopProducts.map((item) => ({
        id: item._id,
        name: item.name,
        stock: item.stock,
        sold: item.soldOut
    }))
    return (
        <>
            <DataGrid
                columns={cols}
                rows={rows}
                autoHeight
                pageSize={10}
            />
        </>
    )
}

export default AllProducts