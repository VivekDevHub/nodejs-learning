import React from "react";
import { axiosInstance } from "../config/axiosInstance";
import { useDispatch } from "react-redux";
import { removeUser } from "../features/authSlice";

const Home = () => {
  let dispatch = useDispatch();

  let handleLogout = async () => {
    await axiosInstance.get("/auth/logout");
    dispatch(removeUser());
    alert("user logged out");
  };

  return (
    <div>
      <h1 className="text-4xl">Thi i home page jo login ke baad dikhega</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;