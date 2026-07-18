import { setAllProducts, setShopProducts } from "../slices/product"
import axios from "axios"
import { backend_url } from "../../server"

export function getAllProductsAction() {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(backend_url + "/api/product/all-products", { withCredentials: true })
            // console.log(data)
            if (data.success) {
                dispatch(setAllProducts(data.data))
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export function getShopProductsAction(id) {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(backend_url + `/api/product/all-products-of-shop/${id}`, { withCredentials: true })
            // alert(data.message)
            if (data.success) {
                dispatch(setShopProducts(data.data))
            }
        } catch (error) {
            console.log(error.response?.data?.message)
        }
    }
}