import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

type Orders = {
  id: number;
  attributes: {
    firstname: string;
    lastname: string;
    phone: string;
    address: string;
    total: string;
    country: string;
    city: string;
    postal_code: string;
    code: string;
    status: string;
    orders: string[];
  };
};
const UseCheckout = (token: any) => {
  const [orders, setOrders] = useState<Orders[]>([]);

  useEffect(() => {
    const getOrderData = async () => {
      try {
        if (!!token) {
          await axios
            .get(`http://localhost:1337/api/orders`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then(({ data }: any) => {
              setOrders(data.data);
            });
        }
      } catch (error) {
        console.log({ error });
      }
    };
    if (!!token) {
      getOrderData();
    }
  }, [token]);

  const addToOrder = async ({
    id,
    attributes: {
      firstname,
      lastname,
      phone,
      address,
      total,
      country,
      city,
      postal_code,
      code,
      status,
      orders,
    },
  }: Orders) => {
    try {
      if (!!token) {
        const response = await axios.post(
          "http://localhost:1337/api/orders",
          {
            data: {
              firstname,
              lastname,
              phone,
              address,
              country,
              city,
              postal_code,
              total,
              code,
              status,
              orders,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response;
      } else {
        setOrders((orders: any) => [
          ...orders,
          {
            firstname,
            lastname,
            phone,
            address,
            country,
            city,
            postal_code,
            total,
            code,
            status,
            orders,
          },
        ]);
      }
      toast.success("Order placed! You will receive an email confirmation", {
        position: toast.POSITION.TOP_LEFT,
        hideProgressBar: true,
      });
    } catch (error) {
      toast.error("Order failed!", {
        position: toast.POSITION.TOP_LEFT,
        hideProgressBar: true,
      });
    }
  };
  return {
    orders,
    addToOrder,
  };
};

export default UseCheckout;
