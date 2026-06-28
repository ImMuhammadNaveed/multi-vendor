import { AiTwotoneDelete } from "react-icons/ai";
import axios from "axios";
import { useContext, useState } from "react";
import { userContext } from "../../context/UserContext";
function ChangePassword() {

    const { backend_url } = useContext(userContext)
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const { data } = await axios.put(backend_url + "/api/user/change-password", { oldPassword, newPassword, confirmPassword }, { withCredentials: true })
            alert(data.message)
            if (data.success) {
                setOldPassword("")
                setNewPassword("")
                setConfirmPassword("")
            }
        } catch (error) {
            alert(error.response.data.message)
        }
    }
    return (
        <div className="flex justify-center">
            <form
                action=""
                className="flex flex-col gap-2 bg-white w-[60%] overflow-y-auto p-2 rounded-sm"
                onSubmit={handleSubmit}
            >
                <h1 className="text-center text-xl font-bold">Change Password</h1>
                <div>
                    <p>Enter your old password</p>
                    <input
                        type="password"
                        className="w-full border border-gray-300 rounded-sm h-8 focus:outline-none pl-1"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                </div>
                <div>
                    <p>Enter your new password</p>
                    <input
                        type="password"
                        className="w-full border border-gray-300 rounded-sm h-8 focus:outline-none pl-1"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div>
                    <p>Enter your confirm password</p>
                    <input
                        type="password"
                        className="w-full border border-gray-300 rounded-sm h-8 focus:outline-none pl-1"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="w-full rounded-sm bg-gray-700 cursor-pointer text-white font-bold text-lg mt-2 h-8">Update</button>
            </form>


        </div>
    )
}
export default ChangePassword