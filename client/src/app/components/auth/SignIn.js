"use client";

import { Stack } from "react-bootstrap";
import "@/app/styles/SignIn.scss";
const SignIn = () => {
  return (
    <Stack className="login-dialog">
      <h3>Đăng nhập</h3>
      <p>Email</p>
      <input type="email" placeholder="Địa chỉ email"></input>
      <p>Mật khẩu</p>
      <input type="password" placeholder="Mật khẩu" />
      <div className="signin-btn">
        <button>Đăng nhập</button>
      </div>
      <div className="seperator" />
      <div className="register-container">
        <p>Chưa có tài khoản? </p>
        <p className="register-btn">Đăng ký</p>
      </div>
    </Stack>
  );
};
export default SignIn;
