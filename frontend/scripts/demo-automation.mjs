import { mkdir, rename, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const frontendDir = path.resolve(currentDir, "..");
const projectDir = path.resolve(frontendDir, "..");
const appUrl = process.env.APP_URL || "http://localhost:5173";
const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";
const password = process.env.DEMO_PASSWORD || "12345678";
const userOneEmail = process.env.DEMO_USER_ONE || "itsnaveed277@gmail.com";
const userTwoEmail = process.env.DEMO_USER_TWO || "proudtobepakistani777@gmail.com";
const shopOneEmail = process.env.DEMO_SHOP_ONE || "itsnaveed277@gmail.com";
const shopTwoEmail = process.env.DEMO_SHOP_TWO || "proudtobepakistani777@gmail.com";
const adminEmail = process.env.DEMO_ADMIN || "admin@gmail.com";
const runId = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);
const productName = `Automation Demo Product ${runId}`;
const eventName = `Automation Demo Event ${runId}`;
const couponCode = `DEMO${runId.slice(-5)}`;
const imagePath = path.join(projectDir, "backend", "uploads", "1788848137401-195028844-1778330249711-908847933-Adidas-Logo.png");
const recordingsDir = path.join(frontendDir, "demo-recordings");
const finalVideoPath = path.join(recordingsDir, "multi-vendor-project-demo.webm");
const results = [];

let browser;
let context;
let page;
let video;

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`${url} responded with ${response.status}`);
  }
  return response.json();
}

async function getAllProducts() {
  const data = await fetchJson(`${backendUrl}/api/product/all-products`);
  return data.products || [];
}

async function findDemoProduct() {
  const products = await getAllProducts();
  return products.find((product) => product.name === productName) || products[0];
}

async function showStep(title) {
  await page.evaluate((stepTitle) => {
    let badge = document.getElementById("automation-step");
    if (!badge) {
      badge = document.createElement("div");
      badge.id = "automation-step";
      badge.style.cssText = [
        "position:fixed",
        "top:16px",
        "right:16px",
        "z-index:2147483647",
        "max-width:420px",
        "padding:10px 14px",
        "border-radius:8px",
        "background:rgba(17,24,39,0.92)",
        "color:white",
        "font:bold 15px system-ui,sans-serif",
        "box-shadow:0 8px 24px rgba(0,0,0,0.25)"
      ].join(";");
      document.body.appendChild(badge);
    }
    badge.textContent = stepTitle;
  }, title);
}

async function open(route, title) {
  await page.goto(`${appUrl}${route}`, { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle", { timeout: 8000 }).catch(() => {});
  await showStep(title);
  await page.waitForTimeout(700);
}

async function resetSession() {
  await context.clearCookies();
  await page.goto(`${appUrl}/login`, { waitUntil: "domcontentloaded" });
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle", { timeout: 8000 }).catch(() => {});
}

async function login(email, accountType, title) {
  await resetSession();
  const route = accountType === "shop" ? "/login-shop" : "/login";
  const heading = accountType === "shop" ? "Login to your Shop" : "Login to your account";
  await open(route, title);
  const form = page.locator("form").filter({ hasText: heading });
  await form.locator("input").nth(0).fill(email);
  await form.locator("input").nth(1).fill(password);
  await form.getByRole("button", { name: /submit/i }).click();
  await page.waitForURL((url) => !url.pathname.includes(route), { timeout: 20000 });
  await page.waitForLoadState("networkidle", { timeout: 8000 }).catch(() => {});
  await showStep(title);
  await page.waitForTimeout(800);
}

async function logout(title) {
  const isShopLogout = title.startsWith("Seller") || title.startsWith("Second shop");
  if (isShopLogout) {
    const seller = await page.evaluate(async (backend) => {
      const response = await fetch(`${backend}/api/shop/get-seller`, { credentials: "include" });
      const data = await response.json();
      return data.shopData;
    }, backendUrl);
    await open(`/shop/${seller._id}`, title);
    await page.getByRole("button", { name: "Log Out" }).click();
  } else {
    await open("/profile", title);
    await page.getByRole("button", { name: "Logout", exact: true }).click();
  }
  await page.waitForTimeout(1200);
}

async function step(title, action) {
  const startedAt = Date.now();
  try {
    await showStep(title);
    await action();
    results.push({ title, status: "passed", durationMs: Date.now() - startedAt });
    console.log(`PASS: ${title}`);
  } catch (error) {
    results.push({ title, status: "failed", durationMs: Date.now() - startedAt, error: error.message });
    console.error(`FAIL: ${title}`);
    console.error(error);
  }
}

async function fillLabeledInput(label, value) {
  await page.locator(`xpath=//p[normalize-space()="${label}"]/following-sibling::input[1]`).fill(value);
}

async function selectLabeledOption(label, optionLabel) {
  await page.locator(`xpath=//p[normalize-space()="${label}"]/following-sibling::select[1]`).selectOption({ label: optionLabel });
}

async function createProduct() {
  await open("/shop-dashboard/create-product", "Seller: Create product");
  const form = page.locator("form").filter({ hasText: "Create Product" });
  const textInputs = form.locator('input[type="text"]');
  await textInputs.nth(0).fill(productName);
  await form.locator("textarea").fill("This product was created by the automated project demo.");
  await textInputs.nth(1).fill("automation,demo,portfolio");
  await textInputs.nth(2).fill("120");
  await textInputs.nth(3).fill("89");
  await textInputs.nth(4).fill("20");
  await form.locator('input[type="file"]').setInputFiles(imagePath);
  await form.getByRole("button", { name: "Create" }).click();
  await page.waitForTimeout(2500);
}

async function createEvent() {
  await open("/shop-dashboard/create-event", "Seller: Create event");
  const form = page.locator("form").filter({ hasText: "Create Event" });
  const today = new Date();
  const endDate = new Date(today);
  endDate.setDate(endDate.getDate() + 7);
  await form.locator('input[type="text"]').nth(0).fill(eventName);
  await form.locator("textarea").fill("This event was created by the automated project demo.");
  await form.locator('input[type="text"]').nth(1).fill("automation,demo,event");
  await form.locator('input[type="number"]').nth(0).fill("150");
  await form.locator('input[type="number"]').nth(1).fill("99");
  await form.locator('input[type="number"]').nth(2).fill("15");
  await form.locator('input[type="date"]').nth(0).fill(today.toISOString().slice(0, 10));
  await form.locator('input[type="date"]').nth(1).fill(endDate.toISOString().slice(0, 10));
  await form.locator('input[type="file"]').setInputFiles(imagePath);
  await form.getByRole("button", { name: "Create" }).click();
  await page.waitForTimeout(2500);
}

async function createCoupon() {
  await open("/shop-dashboard/coupons", "Seller: Create coupon");
  await page.getByRole("button", { name: "Create new coupon" }).click();
  const form = page.locator("form").filter({ hasText: "Create Coupon" });
  await form.locator("input").nth(0).fill(couponCode);
  await form.locator("input").nth(1).fill("10");
  await form.locator("input").nth(2).fill("1");
  await form.locator("input").nth(3).fill("500");
  await form.locator("select").selectOption({ label: productName });
  await form.getByRole("button", { name: "Create", exact: true }).click();
  await page.waitForTimeout(2000);
}

async function updateSellerSettings() {
  await open("/shop-dashboard/settings", "Seller: Update shop settings");
  const form = page.locator("form");
  await form.locator('input[type="text"]').nth(0).fill("Naveed Store");
  await form.locator('input[type="text"]').nth(1).fill("Automated demo shop description");
  await form.locator('input[type="text"]').nth(2).fill("Lahore, Pakistan");
  await form.locator('input[type="text"]').nth(3).fill("+923001234567");
  await form.locator('input[type="text"]').nth(4).fill("54000");
  await form.locator('input[type="file"]').setInputFiles(imagePath);
  await form.getByRole("button", { name: "Update" }).click();
  await page.waitForTimeout(2000);
}

async function withdrawFlow() {
  await open("/shop-dashboard/withdraw-money", "Seller: Withdraw money");
  await page.getByRole("button", { name: "Withdraw" }).first().click();
  await page.waitForTimeout(500);
  if (await page.getByText("No Withdraw Method Available!").count()) {
    await page.getByRole("button", { name: "Add New" }).click();
    const form = page.locator("form");
    const inputs = form.locator("input");
    await inputs.nth(0).fill("Demo Bank");
    await inputs.nth(1).fill("Pakistan");
    await inputs.nth(2).fill("DEMOBANK");
    await inputs.nth(3).fill("1234567890");
    await inputs.nth(4).fill("Muhammad Naveed");
    await inputs.nth(5).fill("Lahore, Pakistan");
    await form.getByRole("button", { name: "Submit" }).click();
    await page.waitForTimeout(1500);
    await page.getByRole("button", { name: "Withdraw" }).first().click();
  }
  const balanceText = await page.locator("text=/Available Balance:\\s*\\$/").first().textContent();
  const balance = Number(balanceText.replace(/[^0-9.]/g, ""));
  if (Number.isFinite(balance) && balance >= 1) {
    await page.locator('input[type="number"]').fill("1");
    await page.locator("form").getByRole("button", { name: "Withdraw", exact: true }).click();
    await page.waitForTimeout(1500);
  }
}

async function updateProfile() {
  await open("/profile", "User: Update profile");
  await fillLabeledInput("Full Name", "Muhammad Naveed");
  await fillLabeledInput("Phone Number", "+923001234567");
  await fillLabeledInput("Email Address", userOneEmail);
  await fillLabeledInput("Password", password);
  await page.locator('input[type="file"]').setInputFiles(imagePath);
  await page.getByRole("button", { name: "Update" }).click();
  await page.waitForTimeout(2000);
}

async function addAddress() {
  await open("/profile/address", "User: Add address");
  await page.getByRole("button", { name: "Add New" }).click();
  await selectLabeledOption("Country", "Pakistan");
  await page.waitForTimeout(500);
  await selectLabeledOption("City", "Lahore");
  await fillLabeledInput("Address1", "Demo Street 1");
  await fillLabeledInput("Address2", "Automation Area");
  await fillLabeledInput("Zip Code", "54000");
  await selectLabeledOption("Address Type", "Office");
  await page.getByRole("button", { name: "Add", exact: true }).click();
  await page.waitForTimeout(2000);
}

async function changePassword() {
  await open("/profile/change-password", "User: Change password");
  const inputs = page.locator('input[type="password"]');
  await inputs.nth(0).fill(password);
  await inputs.nth(1).fill(password);
  await inputs.nth(2).fill(password);
  await page.getByRole("button", { name: "Update" }).click();
  await page.waitForTimeout(1500);
}

async function placeOrder(demoProduct) {
  await open(`/products/${demoProduct._id}`, "User: Product details, wishlist, and cart");
  await page.getByRole("button", { name: "+" }).click();
  await page.locator("svg.mb-2.cursor-pointer").first().click();
  await page.getByRole("button", { name: /add to cart/i }).click();
  await page.waitForTimeout(1000);
  await page.getByRole("button", { name: /send message/i }).click();
  await page.waitForURL(/\/conversation\//, { timeout: 15000 });
  await showStep("User: Real-time messaging");
  await page.getByPlaceholder("Enter your message...").fill("Hello! This is an automated demo message.");
  await page.getByPlaceholder("Enter your message...").press("Enter");
  await page.waitForTimeout(1500);

  await open("/shipping", "User: Shipping and coupon");
  await fillLabeledInput("Full Name", "Muhammad Naveed");
  await fillLabeledInput("Phone Number", "+923001234567");
  await fillLabeledInput("Email Address", userOneEmail);
  await fillLabeledInput("Address1", "Demo Street 1");
  await fillLabeledInput("Address2", "Automation Area");
  await fillLabeledInput("Zip Code", "54000");
  await selectLabeledOption("Country", "Pakistan");
  await page.waitForTimeout(500);
  await selectLabeledOption("City", "Lahore");
  await page.getByPlaceholder("coupon code").fill(couponCode);
  await page.getByRole("button", { name: /apply coupon/i }).click();
  await page.waitForTimeout(1500);
  await page.getByRole("button", { name: /go to payment/i }).click();
  await showStep("User: Cash on delivery order");
  await page.locator("label").filter({ hasText: "Cash on Delivery" }).locator("input").check();
  await page.getByRole("button", { name: "Proceed" }).click();
  await page.waitForTimeout(3000);
}

async function getLatestUserOrder(demoProduct) {
  return page.evaluate(async ({ backend, productId }) => {
    const response = await fetch(`${backend}/api/order/user-orders`, { credentials: "include" });
    const data = await response.json();
    const orders = data.data || [];
    return orders.find((order) => order.cart.some((item) => item.product?._id === productId)) || orders[0];
  }, { backend: backendUrl, productId: demoProduct._id });
}

async function updateOrderStatus(orderId, status, title) {
  await open(`/shop/order/${orderId}`, title);
  await page.locator("select").selectOption({ label: status });
  await page.getByRole("button", { name: /update status/i }).click();
  await page.waitForTimeout(2000);
}

async function addReview(orderId) {
  await open(`/user/order/${orderId}`, "User: Product review");
  await page.getByRole("button", { name: /write review/i }).first().click();
  const modal = page.locator("div.bg-black\\/20").filter({ hasText: "Give a Review" });
  await modal.locator("svg").nth(5).click();
  await modal.locator("textarea").fill("Excellent demo product! The automated workflow works end to end.");
  await modal.getByRole("button", { name: "Submit" }).click();
  await page.waitForTimeout(2000);
}

async function requestRefund(orderId) {
  await open(`/user/order/${orderId}`, "User: Request refund");
  await page.getByRole("button", { name: "Refund", exact: true }).click();
  await page.waitForTimeout(1000);
  await page.evaluate(async ({ backend, id }) => {
    await fetch(`${backend}/api/order/process-refund/${id}`, {
      method: "POST",
      credentials: "include"
    });
  }, { backend: backendUrl, id: orderId });
  await page.waitForTimeout(1000);
}

async function completeRefund(orderId) {
  await open(`/shop/order/${orderId}`, "Seller: Complete refund");
  await page.locator("select").selectOption({ label: "Refund success" });
  await page.getByRole("button", { name: /update status/i }).click();
  await page.waitForTimeout(2000);
}

async function main() {
  await rm(finalVideoPath, { force: true });
  await mkdir(recordingsDir, { recursive: true });
  browser = await chromium.launch({ channel: "chrome", headless: true });
  context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    recordVideo: { dir: recordingsDir, size: { width: 1440, height: 900 } }
  });
  page = await context.newPage();
  page.setDefaultTimeout(15000);
  video = page.video();

  await step("Public: Home page", async () => {
    await open("/", "Public: Home page");
  });
  await step("Public: Browse products", async () => {
    await open("/products", "Public: Browse products");
  });
  await step("Public: Browse events", async () => {
    await open("/events", "Public: Browse events");
  });
  await step("Public: FAQ", async () => {
    await open("/faq", "Public: FAQ");
  });

  await step("Seller: Login", async () => {
    await login(shopOneEmail, "shop", "Seller: Login");
  });
  await step("Seller: Dashboard overview", async () => {
    await open("/shop-dashboard", "Seller: Dashboard overview");
  });
  await step("Seller: Create product", createProduct);
  await step("Seller: Create event", createEvent);
  let demoProduct;
  await step("Seller: Find created product", async () => {
    demoProduct = await findDemoProduct();
    if (!demoProduct) throw new Error("No product is available for the demo");
  });
  await step("Seller: Create coupon", createCoupon);
  await step("Seller: View products", async () => {
    await open("/shop-dashboard/all-products", "Seller: View products");
  });
  await step("Seller: View events", async () => {
    await open("/shop-dashboard/all-events", "Seller: View events");
  });
  await step("Seller: View orders", async () => {
    await open("/shop-dashboard/all-orders", "Seller: View orders");
  });
  await step("Seller: View refunds", async () => {
    await open("/shop-dashboard/refunds", "Seller: View refunds");
  });
  await step("Seller: Messages", async () => {
    await open("/shop-dashboard/messages", "Seller: Messages");
  });
  await step("Seller: Update shop settings", updateSellerSettings);
  await step("Seller: Withdraw money", withdrawFlow);
  await step("Seller: Logout", async () => {
    await logout("Seller: Logout");
  });

  await step("User: Login", async () => {
    await login(userOneEmail, "user", "User: Login");
  });
  let orderId;
  await step("User: Order product", async () => {
    if (!demoProduct) throw new Error("Demo product was not created");
    await placeOrder(demoProduct);
    const order = await getLatestUserOrder(demoProduct);
    if (!order) throw new Error("Demo order was not created");
    orderId = order._id;
  });
  await step("User: Update profile", updateProfile);
  await step("User: Add address", addAddress);
  await step("User: View orders", async () => {
    await open("/profile/orders", "User: View orders");
  });
  await step("User: Refunds page", async () => {
    await open("/profile/refunds", "User: Refunds page");
  });
  await step("User: Inbox", async () => {
    await open("/profile/inbox", "User: Inbox");
  });
  await step("User: Change password", changePassword);
  await step("User: Logout", async () => {
    await logout("User: Logout");
  });

  await step("Seller: Update order status", async () => {
    if (!orderId) throw new Error("Demo order is unavailable");
    await login(shopOneEmail, "shop", "Seller: Update order status");
    await updateOrderStatus(orderId, "Delivered", "Seller: Mark order delivered");
  });
  await step("Seller: Logout after delivery", async () => {
    await logout("Seller: Logout after delivery");
  });

  await step("User: Review delivered order", async () => {
    if (!orderId) throw new Error("Demo order is unavailable");
    await login(userOneEmail, "user", "User: Review delivered order");
    await addReview(orderId);
  });
  await step("User: Request refund", async () => {
    await requestRefund(orderId);
  });
  await step("User: Track refunded order", async () => {
    await open(`/user/track/order/${orderId}`, "User: Track refunded order");
  });
  await step("User: Logout after refund request", async () => {
    await logout("User: Logout after refund request");
  });

  await step("Seller: Complete refund", async () => {
    if (!orderId) throw new Error("Demo order is unavailable");
    await login(shopOneEmail, "shop", "Seller: Complete refund");
    await completeRefund(orderId);
  });
  await step("Seller: Logout after refund", async () => {
    await logout("Seller: Logout after refund");
  });

  await step("Second user: Login and browse", async () => {
    await login(userTwoEmail, "user", "Second user: Login and browse");
    await open("/products", "Second user: Browse products");
  });
  await step("Second user: Logout", async () => {
    await logout("Second user: Logout");
  });

  await step("Second shop: Login and dashboard", async () => {
    await login(shopTwoEmail, "shop", "Second shop: Login and dashboard");
    await open("/shop-dashboard", "Second shop: Dashboard");
  });
  await step("Second shop: Logout", async () => {
    await logout("Second shop: Logout");
  });

  await step("Admin: Login", async () => {
    await login(adminEmail, "user", "Admin: Login");
  });
  const adminRoutes = [
    ["/admin-dashboard", "Admin: Dashboard"],
    ["/admin-dashboard/all-orders", "Admin: All orders"],
    ["/admin-dashboard/all-sellers", "Admin: All sellers"],
    ["/admin-dashboard/all-users", "Admin: All users"],
    ["/admin-dashboard/all-products", "Admin: All products"],
    ["/admin-dashboard/all-events", "Admin: All events"],
    ["/admin-dashboard/withdraw-request", "Admin: Withdraw requests"]
  ];
  for (const [route, title] of adminRoutes) {
    await step(title, async () => {
      await open(route, title);
    });
  }
  await step("Admin: Logout", async () => {
    await logout("Admin: Logout");
  });

  await showStep("Demo complete");
  await page.waitForTimeout(2000);
}

try {
  await main();
} finally {
  if (context) {
    await context.close();
  }
  if (video) {
    const temporaryVideoPath = await video.path();
    await rm(finalVideoPath, { force: true });
    await rename(temporaryVideoPath, finalVideoPath);
  }
  if (browser) {
    await browser.close();
  }
  const passed = results.filter((result) => result.status === "passed").length;
  const failed = results.filter((result) => result.status === "failed").length;
  console.log(`Demo steps passed: ${passed}`);
  console.log(`Demo steps failed: ${failed}`);
  console.log(`Video saved: ${finalVideoPath}`);
  if (failed > 0) {
    process.exitCode = 1;
  }
}
