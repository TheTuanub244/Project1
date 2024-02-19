"use client";

import { useRef, useState } from "react";
import Navbar from "./Navbar";
import "@/app/styles/ProfilePage.scss";
import { handleChangPass } from "@/app/services/UserService";
import { useRouter } from "next/navigation";
const ChangePass = () => {
  const [password, setPassword] = useState();
  const [repeatPassword, setRepeatPassword] = useState();
  const invalidRef = useRef();
  const router = useRouter();
  const handleChange = async () => {
    if (password != repeatPassword) {
      invalidRef.current.classList.add("error");
      invalidRef.current.classList.remove("hidden-div");
    } else {
      const userInfo = JSON.parse(localStorage.getItem("user"));
      await handleChangPass(userInfo.id, password);
      invalidRef.current.classList.remove("error");
      invalidRef.current.classList.add("hidden-div");
      router.push("/");
    }
  };
  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-container-header">
          <h3>Thay đổi mật khẩu</h3>
        </div>
        <div className="profile-container-body">
          <div className="profile-container-center">
            <h4>Mật khẩu mới</h4>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <h4>xác nhận mật khẩu mới</h4>
            <input
              type="password"
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
            <div className="hidden-div" ref={invalidRef}>
              Mật khẩu không khớp
            </div>

            <div className="btn-group">
              <button onClick={() => handleChange()}>Lưu thông tin</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ChangePass;
