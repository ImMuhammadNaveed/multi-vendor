import { useState } from "react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { RxCross1 } from "react-icons/rx";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import { backend_url } from "../../server";
import { getSeller } from '../../redux/thunks/shop'
import { toast } from "react-toastify";
import LoadingButton from "../loading/LoadingButton";
import ButtonSpinner from "../loading/ButtonSpinner";

function WithdrawMoney() {
    // const orders = useSelector(state => state.order.sellerOrders)
    // const deliveredOrders = orders && orders.filter((order) => order.status === "Delivered")
    // const totalPrice = deliveredOrders && deliveredOrders.reduce((acc, item) => acc + item.totalPrice, 0)
    // const serviceCharges = totalPrice && totalPrice * 0.1
    // const availableBalance = totalPrice - serviceCharges
    const seller = useSelector(state => state.shop.seller)

    const [openWithdraw, setOpenWithdraw] = useState(false)
    return (
        <>
            <div className="flex flex-col justify-center items-center mx-auto my-auto">
                <p className="text-xl font-[600] mb-4">Available Balance: ${seller.availableBalance}</p>
                <button
                    className='bg-black text-white py-2 px-6 rounded-md text-lg font-semibold cursor-pointer'
                    onClick={() => setOpenWithdraw(true)}
                >Withdraw</button>
                {openWithdraw && <WithdrawForm setOpenWithdraw={setOpenWithdraw} />}
            </div>
        </>
    )
}

function WithdrawForm({ setOpenWithdraw }) {
    const seller = useSelector(state => state.shop.seller)
    const [addNewMethod, setAddNewMethod] = useState(false)
    const dispatch = useDispatch()
    const [amount, setAmount] = useState(0)
    const [deletingMethod, setDeletingMethod] = useState(false)
    const [creatingWithdraw, setCreatingWithdraw] = useState(false)

    async function handleDeleteWithdrawMethod() {
        try {
            setDeletingMethod(true)
            const {data} = await axios.delete(backend_url+"/api/shop/delete-withdraw-method", {withCredentials: true})
            console.log(data)
            if(data.success){
                dispatch(getSeller())
            }
        } catch (error) {
            console.log(error)
        } finally {
            setDeletingMethod(false)
        }
    }

    async function handleCreateWithdraw(e) {
        e.preventDefault()
        if(amount > seller.availableBalance){
            toast.error("Insufficient balance")
            return
        }
        try {
            setCreatingWithdraw(true)
            const {data} = await axios.post(backend_url+'/api/withdraw/create-withdraw', {amount: amount}, {withCredentials: true})
            if(data.success){
                dispatch(getSeller())
                setOpenWithdraw(false)
            }
        } catch (error) {
            toast.error(error.response?.data?.message)
        } finally {
            setCreatingWithdraw(false)
        }
    }
    return (
        <>
            <div className="bg-black/40 fixed inset-0 flex justify-center items-center">
                <div className="bg-white w-[40%] p-2 rounded-md p-2">
                    <div className="flex justify-end">
                        <RxCross1
                            className="cursor-pointer"
                            size={20}
                            onClick={() => setOpenWithdraw(false)}
                        />
                    </div>
                    <div className={`${addNewMethod ? "hidden" : ""}`}>
                        <p
                            className="text-2xl font-bold mb-2 text-center"
                        >Available Withdraw Methods:</p>
                        {!seller.withdrawMethod
                            ? <div >
                                <p>No Withdraw Method Available!</p>
                                <button
                                    className='bg-black text-white py-1 px-4 rounded-md font-semibold cursor-pointer mt-4'
                                    onClick={() => setAddNewMethod(true)}
                                >Add New</button>
                            </div>
                            : < div >
                                <div className="flex items-center">
                                    <div>
                                        <p>Account Number: <span className="font-[700]">{seller.withdrawMethod.bankAccountNumber}</span></p>
                                        <p>Bank Name: <span className="font-[700]">{seller.withdrawMethod.bankName}</span></p>
                                    </div>
                                    <div className="ml-20">
                                        {deletingMethod
                                            ? <ButtonSpinner size={22} />
                                            : <AiOutlineDelete
                                                size={25}
                                                className="cursor-pointer"
                                                onClick={handleDeleteWithdrawMethod}
                                            />}
                                    </div>
                                </div>

                                <br />
                                <p>Available Balance: <span className="font-[700]">${seller.availableBalance}</span></p>
                                <br />
                                <form onSubmit={handleCreateWithdraw}>
                                    <input
                                        type="number"
                                        placeholder="Amount..."
                                        className="border border-gray-300 focus:outline-none rounded-sm p-1"
                                        required
                                        value={amount}
                                        onChange={(e)=>setAmount(e.target.value)}
                                    />
                                    <LoadingButton
                                        loading={creatingWithdraw}
                                        type="submit"
                                        className='bg-black text-white py-1 px-4 rounded-md font-semibold cursor-pointer ml-2'
                                    >Withdraw</LoadingButton>
                                </form>
                            </div >
                        }
                    </div>
                    {addNewMethod && <AddNewForm setAddNewMethod={setAddNewMethod}/>}
                </div>

            </div>
        </>
    )
}
export default WithdrawMoney







function AddNewForm({setAddNewMethod}) {
    const dispatch = useDispatch()

    const [bankName, setBankName] = useState("")
    const [bankCountry, setBankCountry] = useState("")
    const [bankSwiftCode, setBankSwiftCode] = useState("")
    const [bankAccountNumber, setBankAccountNumber] = useState("")
    const [bankHolderName, setBankHolderName] = useState("")
    const [bankAddress, setBankAddress] = useState("")
    const [submitting, setSubmitting] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        const withdrawMethod = {
            bankName: bankName,
            bankCountry: bankCountry,
            bankSwiftCode: bankSwiftCode,
            bankAccountNumber: bankAccountNumber,
            bankHolderName: bankHolderName,
            bankAddress: bankAddress
        }
        try {
            setSubmitting(true)
            const {data} = await axios.post(backend_url+"/api/shop/add-withdraw-method", {withdrawMethod: withdrawMethod}, {withCredentials: true})
            if(data.success){
                dispatch(getSeller())
                setBankName("")
                setBankCountry("")
                setBankSwiftCode("")
                setBankAccountNumber("")
                setBankHolderName("")
                setBankAddress("")
                setAddNewMethod(false)
                toast.success(data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message)
        } finally {
            setSubmitting(false)
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <p className="font-bold text-center text-xl">Add new Withdraw Method</p>
                <div className="flex flex-col gap-2">
                    <div>
                        <p className="mb-1">Bank Name <span className="text-red-500 font-bold">*</span></p>
                        <input
                            value={bankName}
                            onChange={(e) => setBankName(e.target.value)}
                            type="text"
                            required
                            className="border border-gray-300 rounded-sm p-1 focus:outline-none w-full"
                            placeholder="Enter your bank name..."
                        />
                    </div>
                    <div>
                        <p className="mb-1">Bank Country <span className="text-red-500 font-bold">*</span></p>
                        <input
                            value={bankCountry}
                            onChange={(e) => setBankCountry(e.target.value)}
                            type="text"
                            required
                            className="border border-gray-300 rounded-sm p-1 focus:outline-none w-full"
                            placeholder="Enter your bank country..."
                        />
                    </div>
                    <div>
                        <p className="mb-1">Bank Swift Code <span className="text-red-500 font-bold">*</span></p>
                        <input
                            value={bankSwiftCode}
                            onChange={(e) => setBankSwiftCode(e.target.value)}
                            type="text"
                            required
                            className="border border-gray-300 rounded-sm p-1 focus:outline-none w-full"
                            placeholder="Enter your bank swift code..."
                        />
                    </div>
                    <div>
                        <p className="mb-1">Bank Account Number <span className="text-red-500 font-bold">*</span></p>
                        <input
                            value={bankAccountNumber}
                            onChange={(e) => setBankAccountNumber(e.target.value)}
                            type="text"
                            required
                            className="border border-gray-300 rounded-sm p-1 focus:outline-none w-full"
                            placeholder="Enter your bank account number..."
                        />
                    </div>
                    <div>
                        <p className="mb-1">Bank Holder Name <span className="text-red-500 font-bold">*</span></p>
                        <input
                            value={bankHolderName}
                            onChange={(e) => setBankHolderName(e.target.value)}
                            type="text"
                            required
                            className="border border-gray-300 rounded-sm p-1 focus:outline-none w-full"
                            placeholder="Enter your bank holder name..."
                        />
                    </div>
                    <div>
                        <p className="mb-1">Bank Address <span className="text-red-500 font-bold">*</span></p>
                        <input
                            value={bankAddress}
                            onChange={(e) => setBankAddress(e.target.value)}
                            type="text"
                            required
                            className="border border-gray-300 rounded-sm p-1 focus:outline-none w-full"
                            placeholder="Enter your bank address..."
                        />
                    </div>
                </div>
                <div className="flex justify-center">
                    <LoadingButton
                        loading={submitting}
                        type="submit"
                        className='bg-black text-white py-1 px-4 rounded-md font-semibold cursor-pointer mt-2'
                    >
                        Submit
                    </LoadingButton>
                </div>
            </form>
        </>
    )
}
