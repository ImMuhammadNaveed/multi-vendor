function EventCardAnimation({ count = 1 }) {
    return (
        <>
            {Array.from({ length: count }, (_, index) => (
                <div
                    key={index}
                    className="animate-pulse bg-white p-5 rounded-lg lg:flex lg:items-start gap-6"
                >
                    <div className="w-full lg:w-1/2 p-12">
                        <div className="w-full h-48 rounded-md bg-gray-200" />
                    </div>
                    <div className="w-full lg:w-1/2 space-y-4">
                        <div className="h-7 w-2/5 rounded bg-gray-200" />
                        <div className="h-4 rounded bg-gray-200" />
                        <div className="h-4 w-4/5 rounded bg-gray-200" />
                        <div className="flex gap-4">
                            <div className="h-6 w-24 rounded bg-gray-200" />
                            <div className="h-6 w-20 rounded bg-gray-200" />
                        </div>
                        <div className="h-6 w-32 rounded bg-gray-200" />
                        <div className="flex gap-4 pt-2">
                            <div className="h-11 w-32 rounded-lg bg-gray-200" />
                            <div className="h-11 w-28 rounded-lg bg-gray-200" />
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default EventCardAnimation
