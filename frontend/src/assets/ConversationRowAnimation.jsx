function ConversationRowAnimation() {
    return (
        <div className="flex animate-pulse items-center gap-3 bg-gray-100 px-2 py-3 my-2 rounded">
            <div className="h-12 w-12 shrink-0 rounded-full bg-gray-200" />
            <div className="flex-1 space-y-2">
                <div className="h-4 w-32 rounded bg-gray-200" />
                <div className="h-3 w-48 rounded bg-gray-200" />
            </div>
            <div className="h-5 w-10 rounded-full bg-gray-200" />
        </div>
    )
}

export default ConversationRowAnimation
