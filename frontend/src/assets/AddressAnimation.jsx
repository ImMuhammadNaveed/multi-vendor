function AddressAnimation() {
    return (
        <>
            <style>{`
    /* Container Layout */
.skeleton-addresses-container {
  max-width: 900px;
  margin: 20px auto;
  padding: 20px;
  font-family: system-ui, sans-serif;
  display: flex;
  flex-direction: column;
  gap: 24px;
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

/* Header Row */
.skeleton-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.skeleton-title {
  width: 180px;
  height: 32px;
}

.skeleton-add-btn {
  width: 100px;
  height: 40px;
  border-radius: 6px;
}

/* Address Card Grid / Alignment */
.skeleton-address-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.skeleton-address-card {
  background: #ffffff;
  border-radius: 8px;
  padding: 20px 24px;
  display: grid;
  grid-template-columns: 100px 1fr 120px 24px;
  align-items: center;
  gap: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.skeleton-address-type {
  height: 20px;
}

.skeleton-address-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.skeleton-line {
  height: 16px;
}

.skeleton-phone {
  height: 16px;
}

.skeleton-delete-icon {
  width: 20px;
  height: 22px;
  border-radius: 4px;
  justify-self: end;
}

/* Helper Widths */
.width-180 { width: 180px; }
.width-100 { width: 100px; }
.width-70  { width: 70px; }
.width-60  { width: 60px; }
.width-100-percent { width: 100%; }
.width-80-percent  { width: 80%; }

/* Mobile View Responsiveness */
@media (max-width: 640px) {
  .skeleton-address-card {
    grid-template-columns: 1fr 24px;
    gap: 12px;
  }
  
  .skeleton-phone {
    grid-column: 1 / 2;
  }
}
        `}</style>
            {/* <!-- HTML Structure --> */}
            <div class="skeleton-addresses-container">


                {/* <!-- Address Cards List --> */}
                <div class="skeleton-address-list">
                    {/* <!-- Single Line Address Card (Default) --> */}
                    <div class="skeleton-address-card">
                        <div class="skeleton-box skeleton-address-type width-70"></div>
                        <div class="skeleton-address-content">
                            <div class="skeleton-box skeleton-line width-180"></div>
                        </div>
                        <div class="skeleton-box skeleton-phone width-100"></div>
                        <div class="skeleton-box skeleton-delete-icon"></div>
                    </div>

                    {/* <!-- Single Line Address Card (Home) --> */}
                    <div class="skeleton-address-card">
                        <div class="skeleton-box skeleton-address-type width-60"></div>
                        <div class="skeleton-address-content">
                            <div class="skeleton-box skeleton-line width-180"></div>
                        </div>
                        <div class="skeleton-box skeleton-phone width-100"></div>
                        <div class="skeleton-box skeleton-delete-icon"></div>
                    </div>

                    {/* <!-- Multi-line Address Card (Office) --> */}
                    <div class="skeleton-address-card">
                        <div class="skeleton-box skeleton-address-type width-60"></div>
                        <div class="skeleton-address-content">
                            {/* <!--<div class="skeleton-box skeleton-line width-100-percent"></div>--> */}
                            <div class="skeleton-box skeleton-line width-180"></div>
                        </div>
                        <div class="skeleton-box skeleton-phone width-100"></div>
                        <div class="skeleton-box skeleton-delete-icon"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddressAnimation