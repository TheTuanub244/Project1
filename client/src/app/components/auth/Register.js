"use client";

import { Stack } from "react-bootstrap";
import Navbar from "../layouts/Navbar";
import "@/app/styles/SignIn.scss";
import { useEffect, useRef, useState } from "react";
import { handleRegister } from "@/app/services/UserService";
import { last, round } from "lodash";
import { useRouter } from "next/navigation";
const Register = () => {
  const [lastName, setLastName] = useState();
  const [firstName, setFirstName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [repeatPassword, setRepeatPassword] = useState();
  const [userInfo, setUserInfo] = useState();
  const [errorCode, setErrorCode] = useState();
  const [respone, setRespone] = useState();
  const emailRef = useRef();
  const lastRef = useRef();
  const firstRef = useRef();
  const passwordRef = useRef();
  const repeatPasswordRef = useRef();
  const route = useRouter();
  useEffect(() => {
    setUserInfo({
      lastName,
      firstName,
      email,
      password,
      repeatPassword,
    });
  }, [lastName, firstName, email, password, repeatPassword]);
  const register = async () => {
    let respone;
    respone = await handleRegister(userInfo);
    setErrorCode(respone?.data?.respone);
    firstRef.current.classList.add("error");
    firstRef.current.classList.remove("hidden-div");
    firstRef.current.innerText = respone?.data?.respone?.EM2;
    lastRef.current.classList.add("error");
    lastRef.current.classList.remove("hidden-div");
    lastRef.current.innerText = respone?.data?.respone?.EM1;
    passwordRef.current.classList.add("error");
    passwordRef.current.classList.remove("hidden-div");
    passwordRef.current.innerText = respone?.data?.respone?.EM4;

    if (respone?.data?.respone?.EC == 6) {
      emailRef.current.classList.add("error");
      emailRef.current.classList.remove("hidden-div");
      emailRef.current.innerText = respone?.data?.respone?.EM6;
    } else {
      emailRef.current.classList.add("error");
      emailRef.current.classList.remove("hidden-div");
      emailRef.current.innerText = respone?.data?.respone?.EM3;
    }
    if (respone?.data?.respone.EC == 7) {
      repeatPasswordRef.current.classList.add("error");
      repeatPasswordRef.current.classList.remove("hidden-div");
      repeatPasswordRef.current.innerText = respone?.data?.respone?.EM7;
    } else {
      repeatPasswordRef.current.classList.add("error");
      repeatPasswordRef.current.classList.remove("hidden-div");
      repeatPasswordRef.current.innerText = respone?.data?.respone?.EM5;
    }
    if (respone?.data?.respone?.EC == 0) {
      route.push("/login");
    }
  };
  return (
    <>
      <Navbar />
      <Stack className="register-dialog">
        <h3>Đăng ký</h3>
        <div className="last-name">
          <p>Họ</p>
          <input
            type="text"
            className={lastName == "" ? "invalid-input" : ""}
            placeholder="Nhập họ tên..."
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div ref={lastRef} className={lastName == "" ? "error" : "hidden-div"}>
          {lastName == "" ? errorCode?.EM1 : ""}
        </div>
        <div className="last-name">
          <p>Tên</p>
          <input
            type="text"
            className={firstName == "" ? "invalid-input" : ""}
            placeholder="Nhập họ tên..."
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div
          ref={firstRef}
          className={firstName == "" ? "error" : "hidden-div"}
        >
          {firstName == "" ? errorCode?.EM2 : ""}
        </div>
        <div className="email">
          <p>Email</p>
          <input
            type="email"
            placeholder="Nhập địa chỉ email..."
            onChange={(e) => setEmail(e.target.value)}
            className={email == "" ? "invalid-input" : ""}
          />
        </div>
        <div ref={emailRef} className="hidden-div">
          {email == "" ? errorCode?.EM3 : ""}
        </div>
        <div className="password">
          <p>Mật khẩu</p>
          <input
            type="password"
            className={password == "" ? "invalid-input" : ""}
            placeholder="Nhập mật khẩu..."
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div ref={passwordRef} className="hidden-div">
          {password == "" ? errorCode?.EM4 : ""}
        </div>
        <div className="repeat-password">
          <p>Nhập lại mật khẩu</p>
          <input
            type="password"
            placeholder="Nhập lại mật khẩu..."
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>
        <div ref={repeatPasswordRef} className="hidden-div"></div>
        <div className="btn-container">
          <button onClick={() => register()}>Đăng ký</button>
        </div>
      </Stack>
    </>
  );
};
export default Register;
