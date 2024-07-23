"use client";
import { useState } from "react";
import LoginModal from "@/components/LoginModal";

const Login = () => {
  const [showModal, setShowModal] = useState(true);
  const handleShowModal = () => {
    setShowModal(!showModal);
  };
  return (
    <div>{showModal && <LoginModal handleShowModal={handleShowModal} />}</div>
  );
};
export default Login;
console.log("Login Modal");
