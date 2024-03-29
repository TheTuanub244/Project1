"use client";

const { createContext, useState, useEffect, use } = require("react");
import _, { get } from "lodash";
const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [numberProduct, setNumberProduct] = useState(0);
  const [totalCart, setTotalCart] = useState([]);
  const [checkoutInfo, setCheckoutInfo] = useState();
  const [order, setOrder] = useState();
  const uniqueProduct = _.uniqBy(cart, "id");
  const countUniqueProduct = _.countBy(cart, "id");
  const handleAddToCart = (product) => {
    if (cart == null) {
      setCart([product]);
    } else {
      setCart([...cart, product]);
    }
    localStorage.setItem("productCart", JSON.stringify(cart));
  };
  const addCart = (item) => {
    const getItem = JSON.parse(localStorage.getItem("productCart"));
    getItem.push(item);
    setNumberProduct(getItem?.length);
    setCart(getItem);
    localStorage.setItem("productCart", JSON.stringify(getItem));
  };
  const minusCart = (item) => {
    const getItem = JSON.parse(localStorage.getItem("productCart"));
    const getIndex = getItem.findIndex((obj) => obj.id === item?.id);
    getItem.splice(getIndex, 1);
    localStorage.setItem("productCart", JSON.stringify(getItem));
    setCart(getItem);
  };
  useEffect(() => {
    const getItem = JSON.parse(localStorage.getItem("productCart"));
    setCart(getItem);
  }, []);
  useEffect(() => {
    const getItem = JSON.parse(localStorage.getItem("productCart"));
    setNumberProduct(getItem?.length);
    const totalUniqueProduct = uniqueProduct?.map((index) => ({
      data: index,
      count: countUniqueProduct[index.id],
      totalPrice: !index.newPrice
        ? index.oldPrice * countUniqueProduct[index.id]
        : index.newPrice * countUniqueProduct[index.id],
    }));
    setTotalCart(totalUniqueProduct);
  }, [cart]);
  const handleRemoveProduct = (id) => {
    const getItem = JSON.parse(localStorage.getItem("productCart"));
    const itemToKeep = getItem.filter((item) => item?.id !== id);
    setCart(itemToKeep);
    localStorage.setItem("productCart", JSON.stringify(itemToKeep));
    setNumberProduct(itemToKeep?.length);
  };
  return (
    <CartContext.Provider
      value={{
        cart,
        handleAddToCart,
        numberProduct,
        totalCart,
        addCart,
        minusCart,
        handleRemoveProduct,
        checkoutInfo,
        setCheckoutInfo,
        order,
        setOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export default CartContext;
