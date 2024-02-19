"use client";

import { Stack } from "react-bootstrap";
import "@/app/styles/SignIn.scss";
import { useEffect, useRef, useState } from "react";
import { handleSignIn } from "@/app/services/UserService";
import UserService from "@/app/services/UserService";
import { useRouter } from "next/navigation";
import Navbar from "../layouts/Navbar";
const SignIn = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();
  const emailRef = useRef();
  const passRef = useRef();
  const [respone, setRespone] = useState();
  const [signInFlag, setSignInFlag] = useState(false);
  const signIn = async () => {
    setSignInFlag(true);
    const getRespone = await handleSignIn(email, password);
    setRespone(getRespone?.data?.respone);
    if (getRespone?.data?.respone?.EC == 0) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: getRespone?.data?.respone?.DT?.id,
          lastName: getRespone?.data?.respone?.DT?.lastName,
          firstName: getRespone?.data?.respone?.DT?.firstName,
          email: getRespone?.data?.respone?.DT?.email,
          avatar: getRespone?.data?.respone?.DT?.avatar,
          isAdmin: getRespone?.data?.respone?.DT?.isAdmin,
        })
      );
      const getCallbackURL = JSON.parse(localStorage.getItem("callbackURL"));
      if (getCallbackURL) {
        router.push(`${getCallbackURL}`);
      }
    } else if (getRespone?.data?.respone?.EC == 1) {
      emailRef.current.classList.add("error");
      emailRef.current.classList.remove("hidden-div");
    } else if (getRespone?.data?.respone?.EC == 2) {
      passRef.current.classList.add("error");
      passRef.current.classList.remove("hidden-div");
    } else if (getRespone?.data?.respone?.EC == 3) {
      emailRef.current.classList.add("error");
      emailRef.current.classList.remove("hidden-div");
      passRef.current.classList.add("error");
      passRef.current.classList.remove("hidden-div");
    }
  };
  useEffect(() => {
    passRef.current.classList.add("hidden-div");
    emailRef.current.classList.add("hidden-div");
  }, []);
  return (
    <>
      <Navbar />
      <Stack className="login-dialog">
        <h3>Đăng nhập</h3>
        <p>Email</p>
        <input
          type="email"
          placeholder="Địa chỉ email"
          onChange={(e) => setEmail(e.target.value)}
          className={signInFlag ? (email ? "" : "invalid-input") : ""}
        ></input>
        <div
          ref={emailRef}
          className={
            signInFlag ? (email ? "hidden-div" : "error") : "hidden-div"
          }
        >
          {respone?.EC == 1 ? (
            <p>{respone?.EM}</p>
          ) : (
            respone?.EC == 3 && <p>{respone?.EM1}</p>
          )}
        </div>
        <p>Mật khẩu</p>
        <input
          type="password"
          placeholder="Mật khẩu"
          onChange={(e) => setPassword(e.target.value)}
          className={signInFlag ? (password ? "" : "invalid-input") : ""}
        />
        <div
          ref={passRef}
          className={
            signInFlag ? (password ? "hidden-div" : "error") : "hidden-div"
          }
        >
          {respone?.EC == 2 ? (
            <p>{respone?.EM}</p>
          ) : (
            respone?.EC == 3 && <p>{respone?.EM2}</p>
          )}
        </div>
        <div className="signin-btn">
          <button onClick={() => signIn()}>Đăng nhập</button>
        </div>
        <div className="seperator" />
        <div className="register-container">
          <p>Chưa có tài khoản? </p>
          <p className="register-btn" onClick={() => router.push("/register")}>
            Đăng ký
          </p>
        </div>
      </Stack>
    </>
  );
};
export default SignIn;
