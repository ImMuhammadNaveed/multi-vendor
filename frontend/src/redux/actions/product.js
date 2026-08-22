import { setAllProducts, setShopProducts, deleteProduct } from "../slices/product"
import axios from "axios"
import { backend_url } from "../../server"
import { toast } from "react-toastify"

export function getAllProductsAction() {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(backend_url + "/api/product/all-products", { withCredentials: true })
            // console.log("data at getAllProductsAction: ", data)
            if (data.success) {
                dispatch(setAllProducts(data.products))
            }
        } catch (error) {
            console.log(error.response)
        }
    }
}

export function getShopProductsAction(id) {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(backend_url + `/api/product/all-products-of-shop/${id}`, { withCredentials: true })
            if (data.success) {
                dispatch(setShopProducts(data.data))
            }
        } catch (error) {
            console.log(error.response?.data?.message)
        }
    }
}

export function deleteProductAction(id) {
    return async function (dispatch) {
        try {
            const { data } = await axios.delete(backend_url + `/api/product/delete-product/${id}`, { withCredentials: true })
            if (data.success) {
                dispatch(deleteProduct(id))
            }
            console.log(data)
            return data
        } catch (error) {
            console.log(error)
            return {success: false, message: error.response?.data?.message}
            toast.error(error.response?.data?.message)
        }
    }
}