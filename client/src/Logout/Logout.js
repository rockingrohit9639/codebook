import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, setAuth } from "../redux/userRedux";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
    dispatch(setAuth(false));
    dispatch(logout());
    navigate("/login");
  });

  return <div></div>;
}

export default Logout;
