"use client";

import CartContext, { CartProvider } from "./context/CartContext";

export const GlobalProvider = ({ children }) => {
  return (
    <>
      <CartProvider>{children}</CartProvider>
    </>
  );
};
