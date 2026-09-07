function SellerDashboardAnimation() {
    return (
        <div className="animate-pulse w-full p-4 lg:px-8">
            <div className="h-6 w-28 rounded bg-gray-200" />
            <div className="mt-4 grid gap-4 lg:grid-cols-3">
                {Array.from({ length: 3 }, (_, index) => (
                    <div key={index} className="h-36 rounded border border-gray-200 bg-white p-4">
                        <div className="h-5 w-2/3 rounded bg-gray-200" />
                        <div className="mt-5 h-7 w-1/3 rounded bg-gray-200" />
                        <div className="mt-5 h-4 w-24 rounded bg-gray-200" />
                    </div>
                ))}
            </div>
            <div className="mt-7 h-6 w-36 rounded bg-gray-200" />
            <div className="mt-4 h-80 rounded border border-gray-200 bg-white p-4" />
        </div>
    )
}

export default SellerDashboardAnimation
