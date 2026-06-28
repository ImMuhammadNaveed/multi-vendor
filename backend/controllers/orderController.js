const { orderModel } = require("../database/orderModel")
const { productModel } = require("../database/productModel")

async function createOrder(req, res) {
    try {
        const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body
        console.log("re.body at create order controller: ", req.body)
        const shopMap = new Map()
        cart.forEach(item => {
            // console.log(item.product.shop._id)
            const shopId = item.product.shop._id
            if (!shopMap.has(shopId)) {
                shopMap.set(shopId, [])
            }
            shopMap.get(shopId).push(item)
        });
        for (const [shopId, items] of shopMap) {
            const orderData = {
                cart: items,
                shippingAddress,
                user,
                totalPrice,
                paymentInfo
            };
            await orderModel.create(orderData)
        }
        return res.status(200).json({ success: true, message: "orders successfully placed" })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

async function getUserOrders(req, res) {
    try {
        const userId = req.userId
        const userOrders = await orderModel.find({ "user._id": userId })
        if (userOrders.length === 0) {
            return res.status(400).json({ success: false, message: "user orders not found!" })
        }
        res.status(200).json({ success: true, data: userOrders })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

async function orderDetails(req, res) {
    try {
        const orderId = req.params.id
        const orderDetails = await orderModel.findById(orderId)
        if (!orderDetails) {
            return res.status(500).json({ success: false, message: "user order not found!" })
        }
        res.status(200).json({ success: true, data: orderDetails })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

async function getUserOrders(req, res) {
    try {
        const userId = req.userId
        const userOrders = await orderModel.find({ "user._id": userId })
        if (userOrders.length === 0) {
            return res.status(400).json({ success: false, message: "user orders not found!" })
        }
        res.status(200).json({ success: true, data: userOrders })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

async function getSellerOrders(req, res) {
    try {
        const sellerId = req.shopId
        const sellerOrders = await orderModel.find({ "cart.product.shop._id": sellerId })
        if (sellerOrders.length === 0) {
            return res.status(400).json({ success: false, message: "seller orders not found!" })
        }
        res.status(200).json({ success: true, data: sellerOrders })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

async function updateOrderStatus(req, res) {
    try {
        const id = req.params.id;

        const order = await orderModel.findById(id);

        if (!order) {
            return res.status(400).json({
                success: false,
                message: "order not found!"
            });
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
        }

        await order.save();
        async function updateStatus(quantity, id) {
            const product = await productModel.findById(id)
            product.soldOut += quantity
            product.stock -= quantity
            await product.save()
        }
        return res.status(200).json({
            success: true,
            message: "Order status updated!"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function refund(req, res) {
    try {
        const order = await orderModel.findById(req.params.id)
        if (!order) {
            return res.status(400).json({
                success: false,
                message: "order not found!"
            });
        }
        order.status = "Processing refund"
        await order.save()
        return res.status(200).json({
            success: true,
            message: "Order status updated!"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function refundSuccess(req, res) {
    try {
        const { status } = req.body
        // console.log(status)
        const order = await orderModel.findById(req.params.id)
        if (!order) {
            return res.status(400).json({
                success: false,
                message: "order not found!"
            });
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
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
module.exports = {
    createOrder,
    getUserOrders,
    orderDetails,
    getSellerOrders,
    updateOrderStatus,
    refund,
    refundSuccess
}