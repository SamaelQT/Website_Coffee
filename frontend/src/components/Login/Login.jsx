import React, {  useContext, useState } from "react";
import "./Login.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios"

const Login = ({ setShowLogin }) => {

  const {url,setToken} = useContext(StoreContext)

  const [currState, setCurrState] = useState("Đăng nhập");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChageHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
      event.preventDefault()
      let newUrl = url;
      if (currState==="Đăng nhập") {
        newUrl += '/api/user/login'
      }
      else{
        newUrl += "/api/user/register"
      }

      const response = await axios.post(newUrl,data);
       
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token",response.data.token);
        setShowLogin(false)
      }
      else{
        alert(response.data.message)
      }
  }

  return (
    <div className="login">
      <form onSubmit={onLogin} className="login-container">
        <div className="login-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-inputs">
          {currState === "Đăng nhập" ? (
            <></>
          ) : (
            <input
              name="name"
              onChange={onChageHandler}
              value={data.name}
              type="text"
              placeholder="Tên của bạn"
              required
            />
          )}

          <input
            name="email"
            onChange={onChageHandler}
            value={data.email}
            type="email"
            placeholder="Gmail của bạn"
            required
          />
          <input
            name="password"
            onChange={onChageHandler}
            value={data.password}
            type="password"
            placeholder="Mật khẩu"
            required
          />
        </div>
        <button type="submit" className="login-btn">
          {currState === "Đăng kí" ? "Tạo tài khoản" : "Đăng nhập"}
        </button>
        <div className="login-condition">
          <input type="checkbox" required />
          <p>Tôi đồng ý với điều khoản.</p>
        </div>
        {currState === "Đăng nhập" ? (
          <p>
            Tạo toàn khoản mới?{" "}
            <span onClick={() => setCurrState("Đăng kí")}>Tạo ngay</span>
          </p>
        ) : (
          <p>
            Đã có tài khoản?{" "}
            <span onClick={() => setCurrState("Đăng nhập")}>Đăng nhập</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
