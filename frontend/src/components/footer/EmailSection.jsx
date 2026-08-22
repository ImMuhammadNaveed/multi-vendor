function EmailSection() {
    return (
        <>
            <div className="bg-[#332AC8] py-10">
                <div className="lg:flex block items-center justify-between w-[90%] m-auto">
                    <p className="w-full lg:w-[50%] text-4xl font-semibold text-white"><span className="text-[#56D879]">Subscribe</span> us for get news events and offers!</p>
                    <div className="flex flex-col lg:flex-row">
                        <input className="w-full h-10 bg-white px-2 w-70 my-3 lg:my-0 mr-5 rounded-md" type="text" placeholder="Enter Your Email..." />
                        <button className="h-10 bg-[#56D879] rounded-md px-5 text-white">Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}





export default EmailSection