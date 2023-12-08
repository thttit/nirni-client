import axios from "axios";

export const createOrder = async (order: any) => {
  const { data } = await axios.post("http://localhost:1337/api/orders", order);
  return data;
};

export const getOrder = async (orderCode: any) => {
  const { data } = await axios.get(
    `http://localhost:1337/api/orders/${orderCode}`
  );
  return data;
};

export const patchOrder = async (orderCode: any) => {
  const { data } = await axios.patch(
    `http://localhost:1337/api/orders/${orderCode}`
  );
  return data;
};
