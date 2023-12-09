"use client";

import { Stack } from "react-bootstrap";
import "@/app/styles/SignIn.scss";
import { useState } from "react";
import { handleSignIn } from "@/app/services/UserService";
import UserService from "@/app/services/UserService";
const SignIn = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const signIn = async () => {
    if (email && password) {
      await handleSignIn(email, password);
    }
  };
  return (
    <Stack className="login-dialog">
      <h3>Đăng nhập</h3>
      <p>Email</p>
      <input
        type="email"
        placeholder="Địa chỉ email"
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <p>Mật khẩu</p>
      <input
        type="password"
        placeholder="Mật khẩu"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="signin-btn">
        <button onClick={() => signIn()}>Đăng nhập</button>
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
