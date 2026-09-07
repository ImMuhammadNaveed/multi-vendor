function ProductCardAnimation() {
    return (
        <>
            <style>
                {`
                    /* Card Container Layout */
                    .product-card-skeleton {
                        width: 280px;
                        background: #ffffff;
                        border-radius: 12px;
                        border: 1px solid #e2e8f0;
                        padding: 16px;
                        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
                        box-sizing: border-box;
                        overflow: hidden;
                    }

                    .product-details {
                        margin-top: 16px;
                    }

                    .footer-container {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-top: 20px;
                    }

                    /* Base Skeleton Styling & Shimmer Setup */
                    .skeleton {
                        background: #f1f5f9;
                        background-image: linear-gradient(
                            90deg, 
                            #f1f5f9 0px, 
                            #e2e8f0 40px, 
                            #f1f5f9 80px
                        );
                        background-size: 200% 100%;
                        animation: shimmer 1.5s infinite linear;
                        border-radius: 4px;
                    }

                    /* Specific Element Dimensions */
                    .skeleton-image {
                        width: 100%;
                        height: 200px;
                        border-radius: 8px;
                    }

                    .skeleton-text {
                        height: 14px;
                        margin-bottom: 8px;
                    }

                    .skeleton-brand {
                        width: 30%;
                        height: 10px;
                        margin-bottom: 12px;
                    }

                    .skeleton-title {
                        width: 100%;
                        height: 16px;
                    }

                    .skeleton-title.short {
                        width: 60%;
                    }

                    .skeleton-price {
                        width: 35%;
                        height: 20px;
                        margin-bottom: 0;
                    }

                    .skeleton-button {
                        width: 40%;
                        height: 36px;
                        border-radius: 6px;
                    }

                    /* The Shimmer Moving Wave Animation Effect */
                    @keyframes shimmer {
                        0% {
                            background-position: 200% 0;
                        }
                        100% {
                            background-position: -200% 0;
                        }
                    }
                `}
            </style>
            <div className="product-card-skeleton">
                {/* <!-- Product Image Placeholder --> */}
                <div class="skeleton skeleton-image"></div>

                <div className="product-details">
                    {/* <!-- Product Brand/Category --> */}
                    <div className="skeleton skeleton-text skeleton-brand"></div>

                    {/* <!-- Product Title (Two Lines) --> */}
                    <div className="skeleton skeleton-text skeleton-title"></div>
                    <div className="skeleton skeleton-text skeleton-title short"></div>

                    {/* <!-- Price & Button Container --> */}
                    <div className="footer-container">
                        <div className="skeleton skeleton-text skeleton-price"></div>
                        <div className="skeleton skeleton-button"></div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ProductCardAnimation