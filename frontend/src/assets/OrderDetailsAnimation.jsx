function OrderDetailsAnimation() {
    return (
        <>
            <style>
                {`
            /* Container Layout */
.skeleton-order-container {
  max-width: 1000px;
  margin: 30px auto;
  padding: 24px;
  font-family: system-ui, sans-serif;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Base Skeleton Shimmer Animation */
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
  border-radius: 6px;
}

@keyframes skeleton-shimmer {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}

/* Header & Meta */
.skeleton-header-title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.skeleton-icon {
  width: 28px;
  height: 28px;
  border-radius: 6px;
}

.skeleton-heading {
  width: 160px;
  height: 28px;
}

.skeleton-meta-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4px;
}

.skeleton-id {
  width: 260px;
  height: 18px;
}

.skeleton-date {
  width: 140px;
  height: 18px;
}

/* Item Section */
.skeleton-item-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 10px;
}

.skeleton-product-img {
  width: 64px;
  height: 64px;
  border-radius: 8px;
}

.skeleton-item-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.skeleton-divider {
  height: 1px;
  background-color: #eee;
  margin: 10px 0;
}

/* Price Section */
.skeleton-price-row {
  display: flex;
  justify-content: flex-end;
}

.skeleton-price-text {
  width: 150px;
  height: 22px;
}

/* Info Grid Layout */
.skeleton-info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-top: 10px;
}

.skeleton-info-col {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.skeleton-info-col.align-end {
  align-items: flex-end;
}

.skeleton-section-title {
  width: 140px;
  height: 20px;
  margin-bottom: 4px;
}

.skeleton-btn {
  width: 130px;
  height: 42px;
  border-radius: 8px;
  margin-top: 16px;
}

/* Fixed Width Helpers */
.skeleton-line {
  height: 16px;
}

.width-160 { width: 160px; }
.width-140 { width: 140px; }
.width-120 { width: 120px; }
.width-100 { width: 100px; }
.width-80  { width: 80px; }
.width-40  { width: 40px; }

/* Responsive View */
@media (max-width: 640px) {
  .skeleton-info-grid {
    grid-template-columns: 1fr;
  }
  
  .skeleton-info-col.align-end {
    align-items: flex-start;
  }
}
            `}
            </style>
            {/* <!-- HTML Structure --> */}
            <div class="skeleton-order-container">
                {/* <!-- Header Title --> */}
                <div class="skeleton-header-title">
                    <div class="skeleton-box skeleton-icon"></div>
                    <div class="skeleton-box skeleton-heading"></div>
                </div>

                {/* <!-- Sub-header Meta (Order ID & Date) --> */}
                <div class="skeleton-meta-row">
                    <div class="skeleton-box skeleton-id"></div>
                    <div class="skeleton-box skeleton-date"></div>
                </div>

                {/* <!-- Item Card --> */}
                <div class="skeleton-item-row">
                    <div class="skeleton-box skeleton-product-img"></div>
                    <div class="skeleton-item-details">
                        <div class="skeleton-box skeleton-line width-140"></div>
                        <div class="skeleton-box skeleton-line width-80"></div>
                    </div>
                </div>

                <div class="skeleton-divider"></div>

                {/* <!-- Total Price --> */}
                <div class="skeleton-price-row">
                    <div class="skeleton-box skeleton-price-text"></div>
                </div>

                {/* <!-- Details Grid (Shipping & Payment) --> */}
                <div class="skeleton-info-grid">
                    {/* <!-- Left Column: Shipping Address --> */}
                    <div class="skeleton-info-col">
                        <div class="skeleton-box skeleton-section-title"></div>
                        <div class="skeleton-box skeleton-line width-100"></div>
                        <div class="skeleton-box skeleton-line width-40"></div>
                        <div class="skeleton-box skeleton-line width-100"></div>
                        <div class="skeleton-box skeleton-line width-120"></div>
                        <div class="skeleton-box skeleton-btn"></div>
                    </div>

                    {/* <!-- Right Column: Payment Info --> */}
                    <div class="skeleton-info-col align-end">
                        <div class="skeleton-box skeleton-section-title"></div>
                        <div class="skeleton-box skeleton-line width-160"></div>
                        <div class="skeleton-box skeleton-btn"></div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default OrderDetailsAnimation