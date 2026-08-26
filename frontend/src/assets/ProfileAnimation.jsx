function ProfileAnimation() {
    return (
        <>
            <style>
                {`
            /* Base Layout */
.skeleton-profile-container {
  max-width: 900px;
  margin: 40px auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  box-sizing: border-box;
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

/* Avatar Skeleton */
.skeleton-avatar-wrapper {
  display: flex;
  justify-content: center;
}

.skeleton-avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}

/* Form Grid Layout */
.skeleton-form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px 32px;
  width: 100%;
}

.skeleton-field-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.skeleton-label {
  width: 110px;
  height: 18px;
}

.skeleton-input {
  width: 100%;
  height: 44px;
}

/* Button Skeleton */
.skeleton-button {
  width: 100%;
  height: 48px;
  border-radius: 8px;
}

/* Mobile Responsive */
@media (max-width: 600px) {
  .skeleton-form-grid {
    grid-template-columns: 1fr;
  }
}
            `}
            </style>
            {/* <!-- HTML Structure --> */}
            <div class="skeleton-profile-container">
                {/* <!-- Centered Avatar --> */}
                <div class="skeleton-avatar-wrapper">
                    <div class="skeleton-box skeleton-avatar"></div>
                </div>

                {/* <!-- Form Fields Grid --> */}
                <div class="skeleton-form-grid">
                    {/* <!-- Full Name Field --> */}
                    <div class="skeleton-field-group">
                        <div class="skeleton-box skeleton-label"></div>
                        <div class="skeleton-box skeleton-input"></div>
                    </div>

                    {/* <!-- Email Address Field --> */}
                    <div class="skeleton-field-group">
                        <div class="skeleton-box skeleton-label"></div>
                        <div class="skeleton-box skeleton-input"></div>
                    </div>

                    {/* <!-- Phone Number Field --> */}
                    <div class="skeleton-field-group">
                        <div class="skeleton-box skeleton-label"></div>
                        <div class="skeleton-box skeleton-input"></div>
                    </div>

                    {/* <!-- Password Field --> */}
                    <div class="skeleton-field-group">
                        <div class="skeleton-box skeleton-label"></div>
                        <div class="skeleton-box skeleton-input"></div>
                    </div>
                </div>

                {/* <!-- Full Width Button --> */}
                <div class="skeleton-box skeleton-button"></div>
            </div>
        </>
    )
}


export default ProfileAnimation