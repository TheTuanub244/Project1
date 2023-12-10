"use client";
import "@/app/styles/Navbar.scss";
import { IoHome } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { LuShoppingCart } from "react-icons/lu";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import CartContext from "@/app/context/CartContext";
const Navbar = () => {
  const router = useRouter();
  const { numberProduct } = useContext(CartContext);
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
  return (
    <div className="Navbar-container">
      <div className="search-box-container">
        <input type="text" placeholder="Tìm kiếm sản phẩm" />
        <button>Tìm kiếm</button>
      </div>
      <div className="navbar-choices">
        <button className="homepage" onClick={() => router.push("/")}>
          <IoHome className="icon" />
          Trang chủ
        </button>
        {user ? (
          <button className="sign-in">
            <CiUser className="icon" />
            {user?.firstName} {user?.lastName}
          </button>
        ) : (
          <button className="sign-in" onClick={() => handleLogin()}>
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
