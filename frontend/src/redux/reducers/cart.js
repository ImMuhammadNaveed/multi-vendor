export function setCartReducer(state, action) {
    state.cart = action.payload
}

export function addToCartReducer(state, action) {
    // console.log("addToCartRecuder:", action.payload.product)
    const { product, quantity } = action.payload;

    const existingProduct = state.cart.find(
        (item) => item.product._id === product._id
    );

    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        state.cart.push({
            product,
            quantity,
        });
    }
}

export function removeFromCartReducer(state, action) {
    state.cart = state.cart.filter((item) => item.product._id !== action.payload._id)
}