function ButtonSpinner({ size = 16, className = "" }) {
    return (
        <span
            className={`inline-block animate-spin rounded-full border-2 border-current border-t-transparent ${className}`}
            style={{ width: size, height: size }}
            aria-hidden="true"
        />
    )
}

export default ButtonSpinner
