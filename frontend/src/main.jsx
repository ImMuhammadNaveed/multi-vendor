import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GeneralContextProvider } from './context/Context.jsx'
import { ShopContextProvider } from './context/ShopContext.jsx'
import { ProductContextProvider } from './context/ProductContext.jsx'
import { UserContextProvider } from './context/UserContext.jsx'
import { CartContextProvider } from './context/CartContext.jsx'
import { WishlistContextProvider } from './context/WishlistContext.jsx'

createRoot(document.getElementById('root')).render(
  <GeneralContextProvider>
    <UserContextProvider>
      <WishlistContextProvider>
        <CartContextProvider>
          <ShopContextProvider>
            <ProductContextProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </ProductContextProvider>
          </ShopContextProvider>
        </CartContextProvider>
      </WishlistContextProvider>
    </UserContextProvider>
  </GeneralContextProvider>
)
