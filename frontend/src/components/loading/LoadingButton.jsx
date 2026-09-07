import ButtonSpinner from "./ButtonSpinner"

function LoadingButton({
    loading = false,
    children,
    className = "",
    disabled = false,
    ...props
}) {
    return (
        <button
            {...props}
            disabled={disabled || loading}
            className={`${className} disabled:cursor-not-allowed disabled:opacity-60`}
        >
            <span className="inline-flex items-center justify-center gap-2">
                {loading && <ButtonSpinner />}
                {children}
            </span>
        </button>
    )
}

export default LoadingButton
