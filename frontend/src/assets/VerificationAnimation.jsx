function VerificationAnimation() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#F6F6F5] p-6">
            <div className="animate-pulse w-full max-w-md rounded-lg bg-white p-6">
                <div className="mx-auto h-16 w-16 rounded-full bg-gray-200" />
                <div className="mx-auto mt-6 h-6 w-2/3 rounded bg-gray-200" />
                <div className="mt-4 h-4 rounded bg-gray-200" />
                <div className="mt-2 h-4 w-2/3 rounded bg-gray-200" />
                <div className="mt-6 h-10 rounded bg-gray-200" />
            </div>
        </div>
    )
}

export default VerificationAnimation
