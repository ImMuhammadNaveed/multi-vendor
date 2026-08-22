import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import VerifyAccount from './pages/VerifyAccount'
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import BestSelling from './pages/BestSelling'
import Products from './pages/Products'
import ProductFullDetails from './pages/ProductFullDetails'
import Events from './pages/Events'
import FAQ from './pages/FAQ'
import { useLocation } from 'react-router-dom'
import Profile from './pages/Profile'
import ChangeProfile from './components/profile/ChangeProfile'
import Orders from './components/profile/Orders'
import Refunds from './components/profile/Refunds'
import TrackOrders from './components/profile/TrackOrders'
import ChangePassword from './components/profile/ChangePassword'
import Address from './components/profile/Address'
import UserInbox from './components/profile/UserInbox'
import CreateShop from './pages/CreateShop'
import LoginShop from './pages/LoginShop'
import VerifyShop from './pages/VerifyShop'
import ShopDashboard from './pages/ShopDashboard'
import Shop from './pages/Shop'
// components
import CreateProduct from './components/shop/CreateProduct'
import AllProducts from './components/shop/AllProducts'
import Shipping from './pages/Shipping'
import ShopOrderDetails from './pages/ShopOrderDetails'
import UserOrderDetails from './pages/UserOrderDetails'
import TrackOrder from './pages/TrackOrder'
// import UserInbox from './components/profile/UserInbox'
import UserConversation from './pages/UserConversation'
import Dashboard from './components/shop/Dashboard'
import AllConversations from './components/shop/ShopInbox'
import ShopOrders from './components/order/ShopOrders'
import CreateEvent from './components/shop/CreateEvent'
import AllEvents from './components/shop/AllEvents'
import WithdrawMoney from './components/shop/WithdrawMoney'
import CreateCoupon from './components/shop/CreateCoupon'
import ShopRefunds from './components/shop/ShopRefunds'
import Settings from './components/shop/Settings'
//admin
import AdminDashboard from './pages/AdminDashboard'
import AdminDashboardContent from './components/admin/AdminDashboardContent'
import AdminAllEvents from './components/admin/AdminAllEvents'
import AdminAllOrders from './components/admin/AdminAllOrders'
import AdminAllProducts from './components/admin/AdminAllProducts'
import AdminAllSellers from './components/admin/AdminAllSellers'
import AdminAllUsers from './components/admin/AdminAllUsers'
import AdminWithdrawRequest from './components/admin/AdminWithdrawRequest'


import { loadWishlistAction } from './redux/actions/wishlist'
import { setWishlist } from './redux/slices/wishlist'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadCartAction } from './redux/actions/cart'
import { setCart } from './redux/slices/cart'
import { getAllProductsAction } from './redux/actions/product'
import { getSellerConversationsAction, getSellerAction, getOnlineSellersAction, addOnlineSellersAction, getSellerUnreadMessage } from './redux/actions/shop'
import { updateSellerConversation } from './redux/slices/shop'
import { getUserAction, getUserConversationsAction, getOnlineUsersAction, addOnlineUsersAction, getUserUnreadMessage } from './redux/actions/user'
import { updateUserConversation } from './redux/slices/user'
import { getUserOrdersAction, getSellerOrdersAction } from './redux/actions/order'
import { getAllEventsAction } from './redux/actions/event'



import { AdminProtectedRoute, SellerProtectedRoute, UserProtectedRoute } from './routes/Auth'
import { socket } from './socket/Socket'




function App() {

  const userData = useSelector(state => state.user.user)
  const userLogin = useSelector(state => state.user.userLogin)
  const dispatch = useDispatch()
  const sellerData = useSelector(state => state.shop.seller)
  const sellerLogin = useSelector(state => state.shop.sellerLogin)

  useEffect(() => {
    if (userData) {
      dispatch(loadWishlistAction(userData));
      dispatch(loadCartAction(userData))
    } else {
      dispatch(setWishlist([]));
      dispatch(setCart([]))
    }
  }, [userData]);

  useEffect(() => {
    dispatch(getAllProductsAction())
  }, [])
  useEffect(() => {
    dispatch(getAllEventsAction())
  }, [dispatch])

  useEffect(() => {
    dispatch(getSellerAction())
  }, [sellerLogin])
  useEffect(() => {
    dispatch(getSellerOrdersAction())
  }, [sellerLogin])
  useEffect(() => {
    dispatch(addOnlineSellersAction(sellerData._id))
  }, [sellerData])
  useEffect(() => {
    dispatch(getSellerConversationsAction())
  }, [sellerLogin])
  useEffect(() => {
    const cleanup = dispatch(getOnlineSellersAction())
    return cleanup
  }, [])



  useEffect(() => {
    dispatch(getUserAction())
  }, [])
  useEffect(() => {
    if (userLogin) {
      dispatch(getUserConversationsAction())
    }
  }, [userLogin])
  useEffect(() => {
    if (userLogin) {
      dispatch(getUserOrdersAction())
    }
  }, [userLogin])
  useEffect(() => {
    dispatch(addOnlineUsersAction(userData._id))
  }, [userData])
  useEffect(() => {
    const cleanup = dispatch(getOnlineUsersAction())
    return cleanup
  }, [])

  useEffect(() => {
    function handleGetMessage(m) {
      // console.log("got msg", m, "userLogin=", userLogin, "sellerLogin=", sellerLogin)
      if (userLogin) {
        dispatch(getUserUnreadMessage(m.conversationId, userData._id))
        dispatch(updateUserConversation({ conversationId: m.conversationId, lastMessage: m.text, lastMessageId: m.sender }))
      }
      if (sellerLogin) {
        dispatch(getSellerUnreadMessage(m.conversationId, sellerData._id))
        dispatch(updateSellerConversation({ conversationId: m.conversationId, lastMessage: m.text, lastMessageId: m.sender }))
      }
    }
    socket.on("getMessage", handleGetMessage)
    return () => socket.off("getMessage", handleGetMessage)
  }, [userLogin, sellerLogin])







  const location = useLocation()
  const hideLayout =
    location.pathname === '/login' ||
    location.pathname === '/register' ||
    location.pathname === '/create-shop' ||
    location.pathname === '/login-shop' ||
    location.pathname === '/shop-dashboard' ||
    location.pathname.startsWith('/shop/') ||
    location.pathname === '/shop-dashboard/all-orders' ||
    location.pathname === '/shop-dashboard/all-products' ||
    location.pathname === '/shop-dashboard/create-product' ||
    location.pathname === '/shop-dashboard/all-events' ||
    location.pathname === '/shop-dashboard/create-event' ||
    location.pathname === '/shop-dashboard/withdraw-money' ||
    location.pathname === '/shop-dashboard/messages' ||
    location.pathname === '/shop-dashboard/coupons' ||
    location.pathname === '/shop-dashboard/refunds' ||
    location.pathname === '/shop-dashboard/settings' ||
    location.pathname.startsWith('/user/order/') ||
    location.pathname.startsWith('/conversation') ||
    location.pathname.startsWith('/admin-dashboard')
  return (
    <>
      {!hideLayout && <Header />}
      <Routes>
        {/* public routes */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/verify-account' element={<VerifyAccount />} />
        <Route path='/best-selling' element={<BestSelling />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:id' element={<ProductFullDetails />} />
        <Route path='/events' element={<Events />} />
        <Route path='/faq' element={<FAQ />} />
        {/* User routes */}
        <Route element={<UserProtectedRoute />}>
          <Route path='/profile' element={<Profile />} >
            <Route index element={<ChangeProfile />} />
            <Route path='orders' element={<Orders />} />
            <Route path='refunds' element={<Refunds />} />
            <Route path='inbox' element={<UserInbox />} />
            <Route path='track-orders' element={<TrackOrders />} />
            <Route path='change-password' element={<ChangePassword />} />
            <Route path='address' element={<Address />} />
          </Route>
          <Route path='/inbox' element={<UserInbox />} />
          <Route path='/conversation/:id' element={<UserConversation />} />
          <Route path='/shipping' element={<Shipping />} />
          <Route path='/user/order/:id' element={<UserOrderDetails />} />
          <Route path='/user/track/order/:id' element={<TrackOrder />} />
        </Route>
        {/* shop routes */}
        <Route path='/create-shop' element={<CreateShop />} />
        <Route path='/login-shop' element={<LoginShop />} />
        <Route path='/verify-shop' element={<VerifyShop />} />
        <Route path='/shop/:shopId' element={<Shop />} />
        {/* shop protected routes */}
        <Route element={<SellerProtectedRoute />}>
          <Route path='/shop/order/:id' element={<ShopOrderDetails />} />
          <Route path='/shop-dashboard' element={<ShopDashboard />}>
            <Route index element={<Dashboard />} />
            <Route path='all-orders' element={<ShopOrders />} />
            <Route path='all-products' element={<AllProducts />} />
            <Route path='create-product' element={<CreateProduct />} />
            <Route path='all-events' element={<AllEvents />} />
            <Route path='create-event' element={<CreateEvent />} />
            <Route path='withdraw-money' element={<WithdrawMoney />} />
            <Route path='messages' element={<AllConversations />} />
            <Route path='coupons' element={<CreateCoupon />} />
            <Route path='refunds' element={<ShopRefunds />} />
            <Route path='settings' element={<Settings />} />
          </Route>
        </Route>
        {/* admin routes */}
        <Route element={<AdminProtectedRoute />}>
          <Route path='/admin-dashboard' element={<AdminDashboard />}>
            <Route index element={<AdminDashboardContent />} />
            <Route path='all-orders' element={<AdminAllOrders />} />
            <Route path='all-sellers' element={<AdminAllSellers />} />
            <Route path='all-users' element={<AdminAllUsers />} />
            <Route path='all-products' element={<AdminAllProducts />} />
            <Route path='all-events' element={<AdminAllEvents />} />
            <Route path='withdraw-request' element={<AdminWithdrawRequest />} />
            {/* <Route path='settings' element={<Settings />} /> */}
          </Route>
        </Route>
      </Routes>
      <
        ToastContainer
        position='top-right'
        autoClose={3000}
        pauseOnHover
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
      />
      {!hideLayout && <Footer />}
      {/* <Footer/> */}
    </>
  )
}

export default App
