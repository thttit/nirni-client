import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

type OrderType = {
  fistname: string;
  lastname: string;
  total: string;
  status: string;
};
const UseOrder = (token: any) => {
  const { code } = useParams();
  const [refresh, setRefresh] = useState(0);
  const [orderDetails, setOrderDetails] = useState<OrderType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { data },
        } = await axios.get(
          `https://nirni-store.onrender.com/api/orders/${code}?populate=*`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrderDetails(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };
    if (code) {
      fetchData();
    }
  }, [token, refresh, code]);

  return { code, refresh, setRefresh, orderDetails };
};

export default UseOrder;
