const { couponModel } = require("../database/couponModel")
const { orderModel } = require("../database/orderModel")
const { productModel } = require("../database/productModel")
const { shopModel } = require("../database/shopModel")
const catchAsyncError = require("../middlewares/catchAsyncErrors")
const ErrorHandler = require("../utils/ErrorHandler")

const createOrder = catchAsyncError(async (req, res) => {
        const { cart, shippingAddress, user, couponCode, paymentInfo } = req.body
        console.log(req.body)
        const shopMap = new Map()
        cart.forEach(item => {
            const shopId = item.product.shop._id
            if (!shopMap.has(shopId)) {
                shopMap.set(shopId, [])
            }
            shopMap.get(shopId).push(item)
        });
        for (const [shopId, items] of shopMap) {
            let shopTotal = 0
            let productsOfShopOriginalPrice = 0
            for (const item of items) {
                shopTotal += item.product.price * item.quantity
                console.log("shop total without shipping: ", shopTotal)
            }
            if (couponCode !== null && couponCode !== '') {
                const coupon = await couponModel.findOne({ name: couponCode })
                productsOfShopOriginalPrice = shopTotal
                if (coupon) {
                    shopTotal -= (shopTotal / 100) * coupon.value
                    console.log("shop total with discount: ", shopTotal)
                }
            }

            //add shipping price
            shopTotal += (productsOfShopOriginalPrice / 100) * 10
            console.log("shop total with shipping: ", shopTotal)
            const orderData = {
                cart: items,
                shippingAddress,
                user,
                totalPrice: shopTotal.toFixed(1),
                paymentInfo
            };
            await orderModel.create(orderData)
        }
        return res.status(200).json({ success: true, message: "orders successfully placed" })
})

const orderDetails = catchAsyncError(async (req, res) => {
        const orderId = req.params.id
        const orderDetails = await orderModel.findById(orderId)
        if (!orderDetails) {
            throw new ErrorHandler("user order not found!", 500)
        }
        res.status(200).json({ success: true, data: orderDetails })
})

const getUserOrders = catchAsyncError(async (req, res) => {
        const userId = req.userId
        const userOrders = await orderModel.find({ "user._id": userId })
        if (userOrders.length === 0) {
            throw new ErrorHandler("user orders not found!", 400)
        }
        res.status(200).json({ success: true, data: userOrders })
})

const getSellerOrders = catchAsyncError(async (req, res) => {
        const sellerId = req.shopId
        const sellerOrders = await orderModel.find({ "cart.product.shop._id": sellerId })
        if (sellerOrders.length === 0) {
            throw new ErrorHandler("seller orders not found!", 400)
        }
        res.status(200).json({ success: true, data: sellerOrders })
})

const updateOrderStatus = catchAsyncError(async (req, res) => {
        const id = req.params.id;

        const order = await orderModel.findById(id);

        if (!order) {
            throw new ErrorHandler("order not found!", 400);
        }

        order.status = req.body.status;

        if (req.body.status === 'Transferred to delivery partner') {
            for (const item of order.cart) {
                await updateStatus(item.quantity, item.product._id);
            }
        }

        if (req.body.status === 'Delivered') {
            order.deliveredAt = Date.now();
            order.paymentInfo.status = "succeeded";
            const serviceCharges = order.totalPrice * 0.1
            await updateSeller(order.totalPrice - serviceCharges)
        }

        await order.save();
        async function updateStatus(quantity, id) {
            const product = await productModel.findById(id)
            product.soldOut += quantity
            product.stock -= quantity
            await product.save()
        }
        async function updateSeller(amount) {
            const seller = await shopModel.findById(req.shopId)
            seller.availableBalance = seller.availableBalance + amount
            await seller.save()
        }
        return res.status(200).json({
            success: true,
            orderData: order
        });
})

const refund = catchAsyncError(async (req, res) => {
        const order = await orderModel.findById(req.params.id)
        if (!order) {
            throw new ErrorHandler("order not found!", 400)
        }
        order.status = "Processing refund"
        await order.save()
        return res.status(200).json({
            success: true,
            message: "Order status updated!"
        });
})

const refundSuccess = catchAsyncError(async (req, res) => {
        const { status } = req.body
        // console.log(status)
        const order = await orderModel.findById(req.params.id)
        if (!order) {
            throw new ErrorHandler("order not found!", 400)
        }
        if (status === 'Refund success') {
            for (const item of order.cart) {
                // console.log(item.quantity, item.product._id)
                await updateProductStock(item.quantity, item.product._id)
            }
        }
        async function updateProductStock(quantity, id) {
            const product = await productModel.findById(id)
            if (product) {
                product.soldOut -= quantity
                product.stock += quantity
                await product.save()
            }
        }
        order.status = status
        await order.save()
        return res.status(200).json({
            success: true,
            message: "Order status updated!"
        });
})

const getAllOrders = catchAsyncError(async (req, res) => {
        const allOrders = await orderModel.find()
        if (!allOrders || allOrders.length === 0) {
            throw new ErrorHandler("orders not found!", 400)
        }
        return res.status(200).json({ success: true, orders: allOrders })
})
module.exports = {
    createOrder,
    getUserOrders,
    orderDetails,
    getSellerOrders,
    updateOrderStatus,
    refund,
    refundSuccess,
    getAllOrders
}
