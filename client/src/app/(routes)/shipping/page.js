import CartContext from "@/app/context/CartContext";
import { useContext } from "react";

const { default: Shipping } = require("@/app/components/layouts/Shipping");

const page = () => {
  return <Shipping />;
};
export default page;
