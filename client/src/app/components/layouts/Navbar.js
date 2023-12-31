"use client";
import "@/app/styles/Navbar.scss";
import { IoHome } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { LuShoppingCart } from "react-icons/lu";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import CartContext from "@/app/context/CartContext";
import { handleGetAllItem } from "@/app/services/ItemService";
import { Button } from "react-bootstrap";
import Dropdown from "../auth/Dropdown";
import SignInDropDown from "../auth/Dropdown";

const Navbar = ({ allItem, setSearch, itemDisplay, setItemDisplay }) => {
  const router = useRouter();
  const { numberProduct, cart } = useContext(CartContext);
  const [user, setUser] = useState();
  const url = usePathname();

  useEffect(() => {
    const checkSignIn = JSON.parse(localStorage.getItem("user"));
    setUser(checkSignIn);
  }, []);
  const handleLogin = () => {
    localStorage.setItem("callbackURL", JSON.stringify(url));
    router.push("/login");
  };
  const handleSearchProduct = (e) => {
    setSearch(e);
  };
  return (
    <div className="Navbar-container">
      <div className="search-box-container">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm"
          onChange={(e) => handleSearchProduct(e.target.value)}
        />
        <button>Tìm kiếm</button>
      </div>
      <div className="navbar-choices">
        <button
          className="homepage"
          onClick={() => {
            if (url == "/") {
              router.refresh();
            } else {
              router.push("/");
            }
          }}
        >
          <IoHome className="icon" />
          Trang chủ
        </button>
        {user ? (
          <SignInDropDown className="sign-in" userName={user?.firstName} />
        ) : (
          <button onClick={() => handleLogin()}>
            <CiUser className="icon" />
            Đăng nhập
          </button>
        )}
        <div className="seperator" />
        <div className="cart" onClick={() => router.push("/cart")}>
          <LuShoppingCart className="shopping-cart" />
          <div className="cart-number">{numberProduct}</div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
