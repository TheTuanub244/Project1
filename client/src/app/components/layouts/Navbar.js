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
import { useRef } from "react";

const Navbar = ({ allItem, setSearch, itemDisplay, setItemDisplay }) => {
  const router = useRouter();
  const { numberProduct, cart } = useContext(CartContext);
  const [user, setUser] = useState();
  const [open, setOpen] = useState(false);
  const url = usePathname();
  const dropdownRef = useRef();
  useEffect(() => {
    const checkSignIn = JSON.parse(localStorage.getItem("user"));
    setUser(checkSignIn);
    console.log(numberProduct);
  }, []);
  const handleLogin = () => {
    localStorage.setItem("callbackURL", JSON.stringify(url));
    router.push("/login");
  };
  const handleSearchProduct = (e) => {
    setSearch(e);
  };
  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("productCart");
    localStorage.removeItem("checkoutInfo");
    window.location.reload();
  };
  const handleDropDown = () => {
    setOpen(!open);
    if (open) {
      dropdownRef.current.classList.add("dropdown-list");
      dropdownRef.current.classList.remove("none");
    } else {
      dropdownRef.current.classList.add("none");
      dropdownRef.current.classList.remove("dropdown-list");
    }
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
          <div className="dropdown-toggle">
            <button className="sign-in" onClick={() => handleDropDown()}>
              <img src={user?.avatar} width={35} height={35} />
              {user?.firstName}
            </button>
            {user?.isAdmin ? (
              <ul className="none" ref={dropdownRef}>
                <li onClick={() => router.push("/me/account/profile")}>
                  Thông tin cá nhân
                </li>
                <li onClick={() => router.push("/me/order")}>
                  Dơn hàng của tôi
                </li>
                <li onClick={() => router.push("/admin/OrderManagement")}>
                  Quản lý đơn hàng
                </li>
                <li onClick={() => router.push("/admin/ProductManagement")}>
                  Quản lý mặt hàng
                </li>
                <li onClick={() => router.push("/admin/ProductManagement")}>
                  Đổi mật khẩu
                </li>
                <li onClick={() => handleSignOut()}>Đăng xuất</li>
              </ul>
            ) : (
              <ul className="none" ref={dropdownRef}>
                <li>Thông tin cá nhân</li>
                <li onClick={() => router.push("/me/order")}>
                  Dơn hàng của tôi
                </li>
                <li onClick={() => router.push("/admin/ProductManagement")}>
                  Đổi mật khẩu
                </li>
                <li onClick={() => handleSignOut()}>Đăng xuất</li>
              </ul>
            )}
          </div>
        ) : (
          <button onClick={() => handleLogin()}>
            <CiUser className="icon" />
            Đăng nhập
          </button>
        )}
        <div className="seperator" />
        <div className="cart" onClick={() => router.push("/cart")}>
          <LuShoppingCart className="shopping-cart" />
          {typeof numberProduct === "number" && (
            <div className="cart-number">{numberProduct}</div>
          )}
          <div className="cart-number">{numberProduct}</div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
