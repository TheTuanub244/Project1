"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "./layouts/Navbar";
import "@/app/styles/ProfilePage.scss";
import { handleUpdateInfo } from "../services/UserService";
const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const firstRef = useRef();
  const lastRef = useRef();
  const emailRef = useRef();
  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem("user")));
    setFirstName(JSON.parse(localStorage.getItem("user")).firstName);
    setLastName(JSON.parse(localStorage.getItem("user")).lastName);
    setEmail(JSON.parse(localStorage.getItem("user")).email);
  }, []);
  const handleChangeInfo = async () => {
    const respone = await handleUpdateInfo(
      userInfo.id,
      firstName,
      lastName,
      email
    );
    console.log(respone);
  };
  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-container-header">
          <h3>Hồ Sơ Của tôi</h3>
          <h4>Quản lý thông tin hồ sơ để bảo mật</h4>
        </div>
        <div className="profile-container-body">
          <div className="profile-container-left">
            <h4>Họ:</h4>
            <input
              type="text"
              value={firstName}
              ref={firstRef}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <h4>Tên:</h4>
            <input
              type="text"
              value={lastName}
              ref={lastRef}
              onChange={(e) => setLastName(e.target.value)}
            />
            <h4>Email: </h4>
            <input
              type="text"
              value={email}
              ref={emailRef}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="btn-group">
              <button onClick={() => handleChangeInfo()}>Lưu thông tin</button>
            </div>
          </div>
          <div className="profile-container-right">
            <img src={userInfo?.avatar} />
          </div>
        </div>
      </div>
    </>
  );
};
export default ProfilePage;
