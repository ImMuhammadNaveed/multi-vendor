function OrderAnimation() {
    return (
        <>
            <style>
                {`
            /* Base Table Container */
.skeleton-table-wrapper {
  width: 100%;
  max-width: 1000px;
  margin: 20px auto;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.skeleton-table {
  width: 100%;
  border-collapse: collapse;
}

.skeleton-table th,
.skeleton-table td {
  padding: 16px 20px;
  text-align: left;
  border-bottom: 1px solid #f0f0f0;
}

.skeleton-table th {
  background-color: #fafafa;
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
  border-radius: 4px;
}

@keyframes skeleton-shimmer {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}

/* Skeleton Sizing */
.skeleton-header {
  height: 18px;
}

.skeleton-cell {
  height: 16px;
}

.skeleton-action {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-left: auto;
}

/* Variable Width Utilities */
.width-90 { width: 90%; }
.width-85 { width: 85%; }
.width-80 { width: 80%; }
.width-70 { width: 70%; }
.width-60 { width: 60%; }
.width-50 { width: 50%; }
.width-40 { width: 40%; }
.width-35 { width: 35%; }
.width-20 { width: 20%; }

/* Table Footer Pagination Layout */
.skeleton-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  padding: 16px 20px;
}

.skeleton-pagination-info {
  width: 150px;
  height: 16px;
}

.skeleton-pagination-controls {
  width: 80px;
  height: 16px;
}
            `}
            </style>
            {/* <!-- HTML Structure --> */}
            <div class="skeleton-table-wrapper">
                <table class="skeleton-table">
                    <thead>
                        <tr>
                            <th><div class="skeleton-box skeleton-header width-60"></div></th>
                            <th><div class="skeleton-box skeleton-header width-40"></div></th>
                            <th><div class="skeleton-box skeleton-header width-70"></div></th>
                            <th><div class="skeleton-box skeleton-header width-40"></div></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <!-- Row 1 --> */}
                        <tr>
                            <td><div class="skeleton-box skeleton-cell width-90"></div></td>
                            <td><div class="skeleton-box skeleton-cell width-60"></div></td>
                            <td><div class="skeleton-box skeleton-cell width-20"></div></td>
                            <td><div class="skeleton-box skeleton-cell width-35"></div></td>
                            <td><div class="skeleton-box skeleton-action"></div></td>
                        </tr>
                        {/* <!-- Row 2 --> */}
                        <tr>
                            <td><div class="skeleton-box skeleton-cell width-85"></div></td>
                            <td><div class="skeleton-box skeleton-cell width-60"></div></td>
                            <td><div class="skeleton-box skeleton-cell width-20"></div></td>
                            <td><div class="skeleton-box skeleton-cell width-35"></div></td>
                            <td><div class="skeleton-box skeleton-action"></div></td>
                        </tr>
                        {/* <!-- Row 3 --> */}
                        <tr>
                            <td><div class="skeleton-box skeleton-cell width-90"></div></td>
                            <td><div class="skeleton-box skeleton-cell width-50"></div></td>
                            <td><div class="skeleton-box skeleton-cell width-20"></div></td>
                            <td><div class="skeleton-box skeleton-cell width-35"></div></td>
                            <td><div class="skeleton-box skeleton-action"></div></td>
                        </tr>
                        {/* <!-- Row 4 --> */}
                        <tr>
                            <td><div class="skeleton-box skeleton-cell width-80"></div></td>
                            <td><div class="skeleton-box skeleton-cell width-60"></div></td>
                            <td><div class="skeleton-box skeleton-cell width-20"></div></td>
                            <td><div class="skeleton-box skeleton-cell width-35"></div></td>
                            <td><div class="skeleton-box skeleton-action"></div></td>
                        </tr>
                        {/* <!-- Row 5 --> */}
                        <tr>
                            <td><div class="skeleton-box skeleton-cell width-90"></div></td>
                            <td><div class="skeleton-box skeleton-cell width-50"></div></td>
                            <td><div class="skeleton-box skeleton-cell width-20"></div></td>
                            <td><div class="skeleton-box skeleton-cell width-35"></div></td>
                            <td><div class="skeleton-box skeleton-action"></div></td>
                        </tr>
                    </tbody>
                </table>

                {/* <!-- Footer Pagination Skeleton --> */}
                <div class="skeleton-footer">
                    <div class="skeleton-box skeleton-pagination-info"></div>
                    <div class="skeleton-box skeleton-pagination-controls"></div>
                </div>
            </div>
        </>
    )
}

export default OrderAnimation