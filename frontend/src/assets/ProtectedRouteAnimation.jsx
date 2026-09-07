function ProtectedRouteAnimation() {
    return (
        <div
            className="protected-route-skeleton"
            role="status"
            aria-label="Loading page"
            aria-busy="true"
        >
            <div className="protected-route-skeleton-header skeleton-shimmer" />
            <div className="protected-route-skeleton-body">
                <div className="protected-route-skeleton-sidebar">
                    <div className="skeleton-shimmer protected-route-skeleton-avatar" />
                    <div className="skeleton-shimmer protected-route-skeleton-item" />
                    <div className="skeleton-shimmer protected-route-skeleton-item" />
                    <div className="skeleton-shimmer protected-route-skeleton-item" />
                    <div className="skeleton-shimmer protected-route-skeleton-item" />
                </div>
                <div className="protected-route-skeleton-content">
                    <div className="skeleton-shimmer protected-route-skeleton-title" />
                    <div className="protected-route-skeleton-cards">
                        <div className="protected-route-skeleton-card">
                            <div className="skeleton-shimmer protected-route-skeleton-line" />
                            <div className="skeleton-shimmer protected-route-skeleton-line" />
                            <div className="skeleton-shimmer protected-route-skeleton-line short" />
                        </div>
                        <div className="protected-route-skeleton-card">
                            <div className="skeleton-shimmer protected-route-skeleton-line" />
                            <div className="skeleton-shimmer protected-route-skeleton-line" />
                            <div className="skeleton-shimmer protected-route-skeleton-line short" />
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .protected-route-skeleton {
                    min-height: 70vh;
                    width: 100%;
                    padding: 24px;
                    box-sizing: border-box;
                }

                .skeleton-shimmer {
                    background: linear-gradient(
                        90deg,
                        #e0e0e0 25%,
                        #f0f0f0 37%,
                        #e0e0e0 63%
                    );
                    background-size: 400% 100%;
                    animation: protected-route-shimmer 1.4s ease infinite;
                    border-radius: 8px;
                }

                @keyframes protected-route-shimmer {
                    0% { background-position: 100% 50%; }
                    100% { background-position: 0 50%; }
                }

                .protected-route-skeleton-header {
                    width: 100%;
                    height: 72px;
                    margin-bottom: 24px;
                }

                .protected-route-skeleton-body {
                    display: flex;
                    align-items: flex-start;
                    gap: 24px;
                }

                .protected-route-skeleton-sidebar {
                    display: none;
                    flex-direction: column;
                    align-items: center;
                    gap: 18px;
                    width: 260px;
                    flex-shrink: 0;
                    padding: 24px;
                    border: 1px solid #e0e0e0;
                    border-radius: 12px;
                    background: #ffffff;
                }

                .protected-route-skeleton-avatar {
                    width: 90px;
                    height: 90px;
                    border-radius: 50%;
                }

                .protected-route-skeleton-item {
                    width: 100%;
                    height: 44px;
                }

                .protected-route-skeleton-content {
                    flex: 1;
                    min-width: 0;
                }

                .protected-route-skeleton-title {
                    width: 240px;
                    height: 28px;
                    margin-bottom: 24px;
                }

                .protected-route-skeleton-cards {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 20px;
                }

                .protected-route-skeleton-card {
                    display: flex;
                    flex-direction: column;
                    gap: 14px;
                    padding: 24px;
                    border: 1px solid #e0e0e0;
                    border-radius: 12px;
                    background: #ffffff;
                }

                .protected-route-skeleton-line {
                    width: 100%;
                    height: 18px;
                }

                .protected-route-skeleton-line.short {
                    width: 55%;
                }

                @media (min-width: 900px) {
                    .protected-route-skeleton {
                        padding: 32px;
                    }

                    .protected-route-skeleton-sidebar {
                        display: flex;
                    }

                    .protected-route-skeleton-cards {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
            `}</style>
        </div>
    )
}

export default ProtectedRouteAnimation
