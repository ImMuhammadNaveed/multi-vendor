function ShopPageAnimation() {
    return (
        <div className="flex flex-col gap-6 bg-gray-100 p-4 lg:flex-row lg:p-7">
            <div className="animate-pulse w-full bg-white rounded-md p-5 lg:w-70">
                <div className="h-20 w-20 rounded-full bg-gray-200" />
                <div className="mt-4 h-5 w-3/4 rounded bg-gray-200" />
                <div className="mt-3 h-4 w-1/2 rounded bg-gray-200" />
                <div className="mt-5 space-y-3">
                    <div className="h-4 rounded bg-gray-200" />
                    <div className="h-4 w-2/3 rounded bg-gray-200" />
                </div>
            </div>
            <div className="flex-1 animate-pulse bg-white rounded-md p-5">
                <div className="h-6 w-44 rounded bg-gray-200" />
                <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }, (_, index) => (
                        <div key={index} className="space-y-3">
                            <div className="h-40 rounded bg-gray-200" />
                            <div className="h-4 w-3/4 rounded bg-gray-200" />
                            <div className="h-4 w-1/2 rounded bg-gray-200" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ShopPageAnimation
