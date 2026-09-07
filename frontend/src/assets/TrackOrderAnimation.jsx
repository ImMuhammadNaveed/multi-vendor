function TrackOrderAnimation() {
    return (
        <div className="flex min-h-60 items-center justify-center p-6">
            <div className="animate-pulse w-full max-w-2xl rounded-lg bg-white p-6">
                <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gray-200" />
                    <div className="flex-1 space-y-3">
                        <div className="h-5 w-1/2 rounded bg-gray-200" />
                        <div className="h-4 w-1/3 rounded bg-gray-200" />
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-between gap-2">
                    {Array.from({ length: 4 }, (_, index) => (
                        <div key={index} className="flex flex-1 items-center gap-2">
                            <div className="h-9 w-9 rounded-full bg-gray-200" />
                            {index !== 3 && <div className="h-1 flex-1 rounded bg-gray-200" />}
                        </div>
                    ))}
                </div>
                <div className="mt-6 h-10 rounded bg-gray-200" />
            </div>
        </div>
    )
}

export default TrackOrderAnimation
