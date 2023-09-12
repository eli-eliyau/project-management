import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const navigate = useNavigate();

  const logOut = () => {
    const userName = localStorage.getItem("userName");

  return  axios
      .post("http://localhost:3001/logged-off", {
        name: userName,
      })
      .then((res) => {
        
         localStorage.removeItem("user");
         localStorage.removeItem("userName");
           navigate(0);
      })
      .catch((err) => console.log(err));
  };
  logOut()
  return <div>LogOut</div>;
};

export default LogOut;
