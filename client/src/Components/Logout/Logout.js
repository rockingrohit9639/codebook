import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuth, setUser } from "../../redux/userRedux";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
    dispatch(setAuth(false));
    dispatch(setUser({}));
    navigate("/login");
  }, [dispatch, navigate]);

  return <div></div>;
}

export default Logout;
