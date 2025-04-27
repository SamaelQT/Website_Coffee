import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount,url } =
    useContext(StoreContext);

  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Vật phẩm</p>
          <p>Tên</p>
          <p>Giá</p>
          <p>Số lượng</p>
          <p>Tổng</p>
          <p>Huỷ</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index} className="cart-items-title cart-items-item">
                <img src={url+"/images/"+item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>{item.price * cartItems[item._id]}</p>
                <p onClick={() => removeFromCart(item._id)}>X</p>
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
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
              <p>{getTotalCartAmount()===0?0:20}.000 VNĐ</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <b>Tổng</b>
              <b>{getTotalCartAmount()===0?0:getTotalCartAmount()+20000}</b>
            </div>
          </div>
          <button onClick={()=>navigate('/order')}>ĐẶT HÀNG</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>Nhập mã giảm giá ở đây.</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="mã giảm giá" />
              <button>Gửi</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
