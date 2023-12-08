import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import { userData } from "../components/navbar/auth/User";
import { Skeleton } from "@mui/material";
import NavBar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import Login from "../components/navbar/auth/Login";
import Logout from "../components/navbar/auth/Logout";
import Register from "../components/navbar/auth/Register";
import UseCart from "../components/cart/UseCart";
import UseCheckout from "src/components/checkout/UseCheckout";
import Protector from "../components/navbar/auth/User";
import LoginRedirect from "src/components/navbar/auth/LoginRedirect";
import Tops from "src/pages/shop/categories/Tops";

const Home = lazy(() => import("../pages/home/Home"));
const Shop = lazy(() => import("../pages/shop/Shop"));
const ProductDetail = lazy(() => import("../pages/shop/ProductDetail"));
const Collection = lazy(() => import("../pages/collection/Collection"));
const Contact = lazy(() => import("../pages/contact/Contact"));
const Cart = lazy(() => import("../pages/cart/Cart"));
const Checkout = lazy(() => import("../pages/checkout/Checkout"));
const OrderFromAccount = lazy(() => import("../components/account/Orders"));

const Temp = () => {
  const { jwt } = userData();
  const isLoggedIn = !!jwt;
  const { addToOrder, orders } = UseCheckout(jwt);
  const { cart, addToCart, removeFromCart, updateCartItem } = UseCart(jwt);

  const Router = createBrowserRouter([
    {
      path: "/",
      element: <NavBar cartItem={cart.length} isLoggedIn={isLoggedIn} />,
      children: [
        {
          index: true,
          element: (
            <Suspense
              fallback={<Skeleton animation="wave" variant="rectangular" />}
            >
              <Home />
            </Suspense>
          ),
        },
        {
          path: "register",
          element: (
            <Suspense fallback={<Skeleton variant="rectangular" />}>
              <Register />
            </Suspense>
          ),
        },
        {
          path: "login",
          element: (
            <Suspense fallback={<Skeleton variant="rectangular" />}>
              <Login />
            </Suspense>
          ),
        },
        {
          path: "connect/google/redirect",
          element: (
            <Suspense fallback={<Skeleton variant="rectangular" />}>
              <LoginRedirect />
            </Suspense>
          ),
        },
        {
          path: "logout",
          element: (
            <Suspense fallback={<Skeleton variant="text" />}>
              <Logout />
            </Suspense>
          ),
        },
        {
          path: "shop",
          element: (
            <Suspense fallback={<Skeleton variant="rectangular" />}>
              <Shop />
              <Footer />
            </Suspense>
          ),
        },
        // {
        //   path: "collection/tops",
        //   element: (
        //     <Suspense fallback={<Skeleton variant="rectangular" />}>
        //       <Tops />
        //       <Footer />
        //     </Suspense>
        //   ),
        // },
        {
          path: "product/:id",
          element: (
            <Suspense fallback={<Skeleton variant="rectangular" />}>
              <ProductDetail addToCart={addToCart} />
              <Footer />
            </Suspense>
          ),
        },
        {
          path: "cart",
          element: (
            <Suspense fallback={<Skeleton variant="text" />}>
              <Cart
                cart={cart}
                removeFromCart={removeFromCart}
                updateCartItem={updateCartItem}
              />
              <Footer />
            </Suspense>
          ),
        },
        {
          path: "checkout",
          element: (
            <Suspense fallback={<Skeleton variant="text" />}>
              <Protector
                Component={
                  <Checkout
                    token={jwt}
                    orders={orders}
                    addToOrder={addToOrder}
                    cart={cart}
                    removeFromCart={removeFromCart}
                  />
                }
              />
            </Suspense>
          ),
        },
        {
          path: "orders",
          element: (
            <Suspense fallback={<Skeleton variant="text" />}>
              <Protector Component={<OrderFromAccount orders={orders} />} />
            </Suspense>
          ),
        },
        {
          path: "collection",
          element: (
            <Suspense fallback={<Skeleton variant="rectangular" />}>
              <Collection />
              <Footer />
            </Suspense>
          ),
        },
        {
          path: "contact",
          element: (
            <Suspense fallback={<Skeleton variant="text" />}>
              <Contact />
              <Footer />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return { Router };
};

export default Temp;
