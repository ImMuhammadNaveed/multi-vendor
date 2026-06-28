import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
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
import AllConversations from './components/shop/AllMessages'
import ShopOrders from './components/order/ShopOrders'
import CreateEvent from './components/shop/CreateEvent'
import AllEvents from './components/shop/AllEvents'
import WithdrawMoney from './components/shop/WithdrawMoney'
import CreateCoupon from './components/shop/CreateCoupon'
import ShopRefunds from './components/shop/ShopRefunds'
import Settings from './components/shop/Settings'

function App() {
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
    location.pathname.startsWith('/conversation')
  return (
    <>
      {!hideLayout && <Header />}
      {/* <Header/> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/verify-account' element={<VerifyAccount />} />
        <Route path='/best-selling' element={<BestSelling />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:id' element={<ProductFullDetails />} />
        <Route path='/events' element={<Events />} />
        <Route path='/faq' element={<FAQ />} />
        <Route path='/profile' element={<Profile />} >
          <Route index element={<ChangeProfile/>}/>
          <Route path='orders' element={<Orders/>}/>
          <Route path='refunds' element={<Refunds/>}/>
          <Route path='inbox' element={<UserInbox/>}/>
          <Route path='track-orders' element={<TrackOrders/>}/>
          <Route path='change-password' element={<ChangePassword/>}/>
          <Route path='address' element={<Address/>}/>
        </Route>
        <Route path='/create-shop' element={<CreateShop />} />
        <Route path='/inbox' element={<UserInbox />} />
        <Route path='/conversation/:id' element={<UserConversation />} />
        <Route path='/login-shop' element={<LoginShop />} />
        <Route path='/verify-shop' element={ <VerifyShop />} />
        <Route path='/shop/:shopId' element={<Shop />} />
        <Route path='/shipping' element={<Shipping />} />
        <Route path='/shop/order/:id' element={<ShopOrderDetails />} />
        <Route path='/user/order/:id' element={<UserOrderDetails />} />
        <Route path='/user/track/order/:id' element={<TrackOrder/>} />
        <Route path='/shop-dashboard' element={<ShopDashboard />}>
          <Route index element={<Dashboard/>} />
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
      </Routes>
      {!hideLayout && <Footer />}
      {/* <Footer/> */}
    </>
  )
}

export default App
