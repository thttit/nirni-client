import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { getQuery } from "../shop/UseProductDetail";

type CartItem = {
  name: string;
  price: number;
  colour: string;
  size: string;
  sizes: string[];
  image: any;
  description: string;
  productId: string;
  category: string;
  attributes: string[];
};
type attributes = {
  id: string;
  size: string;
  image: any;
  quantity: number;
  attributes: {
    name: string;
    sizes: string[];
    colour: string;
    price: number;
    description: string;
    quantity: {
      quantities: number;
    };
    category: {
      data: {
        id: string;
      };
    };
  };
};
const UseCart = (token: any) => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const [cart, setCart] = useState<CartItem[]>([]);
  const [updateCart, setUpdateCart] = useState(false);
  const { search } = window.location;
  console.log(backendUrl);

  useEffect(() => {
    if (!!token) {
      if (getQuery("success", search) === "true") {
        const deleteCart = async () => {
          try {
            await axios.delete(
              `https://nirni-store.onrender.com/api/carts/fakeId`,
              {
                headers: {
                  Authorization: `bearer ${token}`,
                },
              }
            );
            toast.success(
              "Order placed! You will receive an email confirmation.",
              {
                hideProgressBar: true,
              }
            );
          } catch (error) {
            console.log({ error });
          }
        };
        deleteCart();
        // setIsNewOrdersAdded(true);
      }
    }
    if (!token) {
      if (getQuery("success", search) === "true") {
        toast.success("Order placed! You will receive an email confirmation.", {
          hideProgressBar: true,
        });
        setCart([]);
      }
    }
    if (getQuery("cancel", search) === "true") {
      toast.error("Payment is canceled!", {
        hideProgressBar: true,
      });
    }
  }, [search, token]);

  useEffect(() => {
    const getBasketData = async () => {
      try {
        const {
          data: { data },
        } = await axios.get(`https://nirni-store.onrender.com/api/carts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUpdateCart(false);
        setCart(data);
      } catch (error) {
        console.log({ error });
      }
    };
    if (!!token) {
      getBasketData();
    }
  }, [token, updateCart]);

  const addToCart = async ({
    id,
    size,
    image,
    quantity,
    attributes: {
      name,
      sizes,
      price,
      colour,
      category,
      description,
      quantity: quantities,
    },
  }: attributes) => {
    const isSameProductExistinCart = cart.filter(
      (product) =>
        Number(product.productId) === Number(id) &&
        product.size === size &&
        product.colour === colour
    );
    if (!isSameProductExistinCart.length) {
      try {
        if (!!token) {
          await axios.post(
            "https://nirni-store.onrender.com/api/carts",
            {
              data: {
                name,
                price,
                colour,
                size,
                sizes,
                image,
                quantities,
                description,
                productId: id,
                quantity: Number(quantity),
                categoryId: category.data.id,
              },
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUpdateCart(true);
        } else {
          setCart((cart: any) => [
            ...cart,
            {
              name,
              price,
              colour,
              size,
              sizes,
              image,
              quantities,
              description,
              productId: id,
              quantity: Number(quantity),
              categoryId: category.data.id,
            },
          ]);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      toast.error("Same product added to the basket already!", {
        position: toast.POSITION.TOP_LEFT,
        hideProgressBar: true,
      });
    }
  };

  const updateCartItem = async ({
    colour,
    size,
    index,
    image,
    quantity,
    productId,
    cartItemId,
  }: any) => {
    try {
      if (!!token) {
        if (!!token) {
          await axios.put(
            `https://nirni-store.onrender.com/api/carts/${cartItemId}`,
            {
              data: {
                colour,
                size,
                image,
                quantity: Number(quantity),
              },
              headers: {
                Authorization: `bearer ${token}`,
              },
            }
          );
          setUpdateCart(true);
        } else {
          const updatedCart = cart.map((item: any, idx: any) => {
            if (index === idx && productId === item.productId) {
              return {
                ...item,
                colour,
                size,
                image,
                quantity: Number(quantity),
              };
            }
            return item;
          });
          setCart(updatedCart);
        }
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const removeFromCart = async ({ index, productId, cartItemId }: any) => {
    try {
      if (!!token) {
        await axios.delete(
          `https://nirni-store.onrender.com/api/carts/${cartItemId}`,
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
        );
        setUpdateCart(true);
      } else {
        const cartAfterRemovedItem = cart.filter(
          (item: any, idx: any) =>
            (item.productId !== productId && index !== idx) ||
            (item.productId === productId && index !== idx)
        );
        setCart(cartAfterRemovedItem);
      }
    } catch (error) {}
  };
  const clearCart = () => {
    return setCart([]);
  };
  return { cart, addToCart, removeFromCart, updateCartItem, clearCart };
};

export default UseCart;
