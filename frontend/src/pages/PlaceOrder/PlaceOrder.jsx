import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 20000,
      userId: localStorage.getItem("userId"),
    };
    let response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    });

    console.log(response.data);

    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("LỖI");
    }
  };
  const navigate= useNavigate();

  useEffect(()=>{
    if (!token) {
      navigate('/cart')
    }
    else if (getTotalCartAmount()===0) 
      {
        navigate('/cart')
      }
    
  },[token])

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Thông tin vận chuyển</p>
        <div className="multi-fields">
          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="Họ"
          />
          <input
            required
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Tên"
          />
        </div>
        <input
          required
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="Gmail của bạn"
        />
        <input
          required
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Đường"
        />
        <div className="multi-fields">
          <input
            required
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="Thành phố"
          />
          <input
            required
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="Số nhà"
          />
        </div>
        <input
          required
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Điện thoại"
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Tổng</h2>
          <div>
            <div className="cart-total-detail">
              <p>Tổng cộng</p>
              <p>{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <p>Phí vận chuyển</p>
              <p>{getTotalCartAmount() === 0 ? 0 : 20}.000 VNĐ</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <b>Tổng</b>
              <b>
                {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 20000}
              </b>
            </div>
          </div>
          <button type="submit">THANH TOÁN</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
