function SellerMessagesAnimation() {
    return (
        <>
            <style>{`
        /* Container Layout - Stretched to Full Available Width */
.skeleton-chat-container {
  width: 100%;
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-sizing: border-box;
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

/* Chat Row Layouts spanning full container width */
.skeleton-chat-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
}

.skeleton-chat-row.left {
  justify-content: flex-start;
}

.skeleton-chat-row.right {
  justify-content: flex-end;
}

/* Avatar Styling */
.skeleton-chat-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  flex-shrink: 0;
}

/* Chat Content Block */
.skeleton-chat-content {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.skeleton-chat-row.right .skeleton-chat-content {
  align-items: flex-end;
}

.skeleton-chat-bubble {
  height: 42px;
  border-radius: 8px;
}

.skeleton-chat-timestamp {
  height: 12px;
  border-radius: 3px;
}

/* Variable Width Helpers */
.width-260 { width: 260px; }
.width-220 { width: 220px; }
.width-200 { width: 200px; }
.width-180 { width: 180px; }
.width-160 { width: 160px; }
.width-60  { width: 60px; }
        `}</style>
            {/* <!-- HTML Structure --> */}
            <div class="skeleton-chat-container">
                {/* <!-- Incoming Message (Left Side with Left Avatar) --> */}
                <div class="skeleton-chat-row left">
                    <div class="skeleton-box skeleton-chat-avatar"></div>
                    <div class="skeleton-chat-content">
                        <div class="skeleton-box skeleton-chat-bubble width-220"></div>
                        <div class="skeleton-box skeleton-chat-timestamp width-60"></div>
                    </div>
                </div>

                {/* <!-- Outgoing Message (Right Side with Right Avatar) --> */}
                <div class="skeleton-chat-row right">
                    <div class="skeleton-chat-content">
                        <div class="skeleton-box skeleton-chat-bubble width-180"></div>
                        <div class="skeleton-box skeleton-chat-timestamp width-60"></div>
                    </div>
                    <div class="skeleton-box skeleton-chat-avatar"></div>
                </div>

                {/* <!-- Incoming Message (Left Side with Left Avatar) --> */}
                <div class="skeleton-chat-row left">
                    <div class="skeleton-box skeleton-chat-avatar"></div>
                    <div class="skeleton-chat-content">
                        <div class="skeleton-box skeleton-chat-bubble width-260"></div>
                        <div class="skeleton-box skeleton-chat-timestamp width-60"></div>
                    </div>
                </div>

                {/* <!-- Outgoing Message (Right Side with Right Avatar) --> */}
                <div class="skeleton-chat-row right">
                    <div class="skeleton-chat-content">
                        <div class="skeleton-box skeleton-chat-bubble width-200"></div>
                        <div class="skeleton-box skeleton-chat-timestamp width-60"></div>
                    </div>
                    <div class="skeleton-box skeleton-chat-avatar"></div>
                </div>

                {/* <!-- Incoming Message (Left Side with Left Avatar) --> */}
                <div class="skeleton-chat-row left">
                    <div class="skeleton-box skeleton-chat-avatar"></div>
                    <div class="skeleton-chat-content">
                        <div class="skeleton-box skeleton-chat-bubble width-160"></div>
                        <div class="skeleton-box skeleton-chat-timestamp width-60"></div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default SellerMessagesAnimation