import { useState, useEffect } from "react";
import axios from "axios";

export const UseProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const {
        data: { data },
      } = await axios.get(
        `https://nirni-store.onrender.com/api/categories?populate=*`
      );
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchProducts = async () => {
    try {
      const {
        data: { data },
      } = await axios.get(
        `https://nirni-store.onrender.com/api/products?populate=*`
      );
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  return {
    products,
    categories,
  };
};
