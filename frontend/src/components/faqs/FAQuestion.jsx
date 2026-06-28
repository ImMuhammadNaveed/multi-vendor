import { useState } from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";

function FAQuestion({question, answer}) {
    const [showAns, setShowAns] = useState(false)
    return(
        <>
        <div>
            <div className="flex justify-between items-center cursor-pointer" onClick={()=>setShowAns(!showAns)}>
                <p className="font-semibold text-lg my-3">{question}</p>
                {
                    showAns
                    ?<RxCross1 color="#6B7280"/>
                    :<MdOutlineArrowForwardIos color="#6B7280" />
                }
            </div>
            {
                showAns
                ?<p className="text-[#6B7280] mb-3">{answer}</p>
                :''
            }
            <hr className="text-[#E5E7EB]"/>
        </div>
        </>
    )
}


export default FAQuestion