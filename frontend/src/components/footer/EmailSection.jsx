function EmailSection() {
    return (
        <>
            <div className="bg-[#332AC8] py-10">
                <div className="flex items-center justify-between w-[90%] m-auto">
                    <p className="text-4xl font-semibold text-white w-[50%]"><span>Subscribe</span> us for get news events and offers!</p>
                    <div>
                        <input className="h-10 bg-white px-2 w-70 mr-5 rounded-md" type="text" placeholder="Enter Your Email..." />
                        <button className="h-10 bg-[#56D879] rounded-md px-5 text-white">Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}





export default EmailSection