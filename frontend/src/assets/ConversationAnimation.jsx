function ConversationAnimation() {
    return (
        <>
            <style>
                {`
            /* Container Layout */
.skeleton-inbox-container {
  max-width: 1000px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-family: system-ui, sans-serif;
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
}

@keyframes skeleton-shimmer {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}

/* Message Item Card */
.skeleton-message-card {
  background-color: #f4f5f7;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
}

/* Avatar with Online Status Dot Layout */
.skeleton-avatar-container {
  position: relative;
  width: 50px;
  height: 50px;
  flex-shrink: 0;
}

.skeleton-avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.skeleton-online-dot {
  position: absolute;
  top: 0;
  right: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid #f4f5f7;
}

/* Text Content Area */
.skeleton-message-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.skeleton-name {
  height: 16px;
  border-radius: 4px;
}

.skeleton-preview {
  height: 14px;
  border-radius: 4px;
}

/* Width Variants for Natural Look */
.width-180 { width: 180px; }
.width-150 { width: 150px; }
.width-140 { width: 140px; }
.width-130 { width: 130px; }
.width-120 { width: 120px; }
.width-110 { width: 110px; }
.width-100 { width: 100px; }
.width-80  { width: 80px; }
.width-60  { width: 60px; }
            `}
            </style>
            {/* <!-- HTML Structure --> */}
            <div class="skeleton-inbox-container">
                {/* <!-- Message Item 1 --> */}
                <div class="skeleton-message-card">
                    <div class="skeleton-avatar-container">
                        <div class="skeleton-box skeleton-avatar"></div>
                        <div class="skeleton-box skeleton-online-dot"></div>
                    </div>
                    <div class="skeleton-message-content">
                        <div class="skeleton-box skeleton-name width-120"></div>
                        <div class="skeleton-box skeleton-preview width-60"></div>
                    </div>
                </div>

                {/* <!-- Message Item 2 --> */}
                <div class="skeleton-message-card">
                    <div class="skeleton-avatar-container">
                        <div class="skeleton-box skeleton-avatar"></div>
                        <div class="skeleton-box skeleton-online-dot"></div>
                    </div>
                    <div class="skeleton-message-content">
                        <div class="skeleton-box skeleton-name width-140"></div>
                        <div class="skeleton-box skeleton-preview width-180"></div>
                    </div>
                </div>

                {/* <!-- Message Item 3 --> */}
                <div class="skeleton-message-card">
                    <div class="skeleton-avatar-container">
                        <div class="skeleton-box skeleton-avatar"></div>
                        <div class="skeleton-box skeleton-online-dot"></div>
                    </div>
                    <div class="skeleton-message-content">
                        <div class="skeleton-box skeleton-name width-100"></div>
                        <div class="skeleton-box skeleton-preview width-100"></div>
                    </div>
                </div>

                {/* <!-- Message Item 4 --> */}
                <div class="skeleton-message-card">
                    <div class="skeleton-avatar-container">
                        <div class="skeleton-box skeleton-avatar"></div>
                        <div class="skeleton-box skeleton-online-dot"></div>
                    </div>
                    <div class="skeleton-message-content">
                        <div class="skeleton-box skeleton-name width-130"></div>
                        <div class="skeleton-box skeleton-preview width-150"></div>
                    </div>
                </div>

                {/* <!-- Message Item 5 --> */}
                <div class="skeleton-message-card">
                    <div class="skeleton-avatar-container">
                        <div class="skeleton-box skeleton-avatar"></div>
                        <div class="skeleton-box skeleton-online-dot"></div>
                    </div>
                    <div class="skeleton-message-content">
                        <div class="skeleton-box skeleton-name width-110"></div>
                        <div class="skeleton-box skeleton-preview width-80"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConversationAnimation