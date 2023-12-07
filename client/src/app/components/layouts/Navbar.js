"use client";
import "@/app/styles/Navbar.scss";
import { IoHome } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { LuShoppingCart } from "react-icons/lu";
const Navbar = ({ cart }) => {
  return (
    <div className="Navbar-container">
      <div className="search-box-container">
        <input type="text" placeholder="Tìm kiếm sản phẩm" />
        <button>Tìm kiếm</button>
      </div>
      <div className="navbar-choices">
        <button className="homepage">
          <IoHome className="icon" />
          Trang chủ
        </button>
        <button className="sign-in">
          <CiUser className="icon" />
          Đăng nhập
        </button>
        <div className="seperator" />
        <div className="cart">
          <LuShoppingCart className="shopping-cart" />
          <div className="cart-number">0</div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
