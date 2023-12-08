import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { UseProducts } from "./UseProducts";

export type ProductType = {
  attributes: {
    name: string[];
    price: number[];
    description: string[];
    images: {
      data: any;
    };
    colour: string[];
    sizes: {
      [size: string]: {
        name: string;
      };
    };
    quantity: string[];
  };
};
export const getQuery = (key: any, search: any) => {
  const querys = search?.replace("?", "")?.split("&");
  const query = querys.find((query: any) => query.includes(key));
  const queryValue = query?.replace(`${key}=`, "");
  return queryValue;
};
export const UseProductDetail = () => {
  const { products } = UseProducts();
  const { search } = useLocation();
  const { id: productId } = useParams();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [sortedProducts, setSortedProducts] = useState<ProductType[]>(products);

  const handleSort = (order: "asc" | "desc") => {
    const sorted = [...products].sort((a: any, b: any) =>
      order === "asc"
        ? a.attributes.price - b.attributes.price
        : b.attributes.price - a.attributes.price
    );
    setSortedProducts(sorted);
  };
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedQuantity(Number(event.target.value));
  };

  const getImage = () => {
    if (product !== null) {
      const { attributes }: ProductType = product;

      if (attributes) {
        const image = attributes.images.data[0];

        return image.attributes.url || "";
      }
    }
  };

  useEffect(() => {
    if (product && product.attributes) {
      const { attributes } = product;
      setSelectedSize(getQuery("size", search) || attributes.sizes[0].name);
    }
  }, [product, search, setSelectedColor, setSelectedSize]);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const {
          data: { data },
        } = await axios.get(
          `http://localhost:1337/api/products/${productId}?populate=*`
        );
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (productId) {
      fetchProductDetail();
    }
  }, [productId]);

  return {
    product,
    sortedProducts,
    handleSort,
    getImage,
    selectedSize,
    selectedColor,
    selectedQuantity,
    setSelectedSize,
    setSelectedColor,
    handleQuantityChange,
  };
};

export default UseProductDetail;
