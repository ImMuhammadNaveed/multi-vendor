function ProductDetailsAnimation() {
    return (
        <>
            <style>
                {`
            /* Base Layout */
                .skeleton-container {
                display: flex;
                gap: 40px;
                max-width: 1100px;
                margin: 20px auto;
                padding: 20px;
                font-family: system-ui, sans-serif;
                }

                .skeleton-gallery {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 16px;
                }

                .skeleton-details {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 20px;
                }

                /* Base Skeleton Pulse Animation */
                .skeleton-box {
                background: #e0e0e0;
                background: linear-gradient(
                    90deg,
                    #e0e0e0 25%,
                    #f0f0f0 37%,
                    #e0e0e0 63%
                );
                background-size: 400% 100%;
                animation: skeleton-shimmer 1.4s ease infinite;
                border-radius: 8px;
                }

                @keyframes skeleton-shimmer {
                0% {
                    background-position: 100% 50%;
                }
                100% {
                    background-position: 0 50%;
                }
                }

                /* Gallery Elements */
                .skeleton-main-img {
                width: 100%;
                height: 350px;
                }

                .skeleton-thumbnails {
                display: flex;
                gap: 16px;
                }

                .skeleton-thumb {
                width: 120px;
                height: 120px;
                }

                /* Text & Info Elements */
                .skeleton-title {
                width: 80px;
                height: 32px;
                }

                .skeleton-description {
                display: flex;
                flex-direction: column;
                gap: 10px;
                }

                .skeleton-line {
                height: 14px;
                }

                .width-100 { width: 100%; }
                .width-95  { width: 95%; }
                .width-90  { width: 90%; }
                .width-85  { width: 85%; }
                .width-60  { width: 60%; }

                .skeleton-price {
                width: 140px;
                height: 28px;
                margin-top: 10px;
                }

                .skeleton-actions {
                display: flex;
                align-items: center;
                gap: 20px;
                }

                .skeleton-quantity {
                width: 110px;
                height: 40px;
                }

                .skeleton-icon-btn {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                }

                .skeleton-add-to-cart {
                width: 180px;
                height: 48px;
                }

                /* Responsive adjustment for small screens */
                @media (max-width: 768px) {
                .skeleton-container {
                    flex-direction: column;
                }
                }
            `}
            </style>
            {/* <!-- HTML Structure --> */}
            <div class="skeleton-container">
                {/* <!-- Left Column: Image Gallery --> */}
                <div class="skeleton-gallery">
                    <div class="skeleton-box skeleton-main-img"></div>
                    <div class="skeleton-thumbnails">
                        <div class="skeleton-box skeleton-thumb"></div>
                        <div class="skeleton-box skeleton-thumb"></div>
                    </div>
                </div>

                {/* <!-- Right Column: Product Details --> */}
                <div class="skeleton-details">
                    <div class="skeleton-box skeleton-title"></div>

                    <div class="skeleton-description">
                        <div class="skeleton-box skeleton-line width-100"></div>
                        <div class="skeleton-box skeleton-line width-95"></div>
                        <div class="skeleton-box skeleton-line width-90"></div>
                        <div class="skeleton-box skeleton-line width-100"></div>
                        <div class="skeleton-box skeleton-line width-85"></div>
                        <div class="skeleton-box skeleton-line width-60"></div>
                    </div>

                    <div class="skeleton-box skeleton-price"></div>

                    <div class="skeleton-actions">
                        <div class="skeleton-box skeleton-quantity"></div>
                        <div class="skeleton-box skeleton-icon-btn"></div>
                    </div>

                    <div class="skeleton-box skeleton-add-to-cart"></div>
                </div>
            </div>
        </>
    )
}


export default ProductDetailsAnimation