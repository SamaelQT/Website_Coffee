import React from "react";
import "./Orders.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import axios from "axios"
import {assets} from "../../assets/assets"

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data.reverse());
      console.log(response.data.data);
    } else {
      toast.error("Error")
    }
  };

  const statusHandler = async(event,orderId) =>{
    const response = await axios.post(url+"/api/order/status",{
      orderId,
      status:event.target.value
    })
    if (response.data.success) {
      await fetchAllOrders();
    }
  }

  useEffect(() => {
    fetchAllOrders();
  },[])

  return <div className="order add"> 
<h3>Trang Đặt Hàng</h3>
<div className="order-list">
  {orders.map((order,index)=>(
    <div key={index} className="order-item">
      <img src={assets.parcel_icon} alt="" />
      <div>
        <p className="order-item-food">
          {order.items.map((item,index)=>{
            if (index===order.items.length-1) {
              return item.name + " x " + item.quantity
            }
            else{
              return item.name + " x " + item.quantity + " , "
            }
          })}
        </p>
        <p className="order-item=name">{order.address.lastName+" "+order.address.firstName}</p>
        <div className="order-item-address">
          <p>{order.address.street+","}</p>
          <p>{order.address.city+", "+order.address.state}</p>
        </div>
        <p className="order-item-phone">{order.address.phone}</p>
      </div>
      <p>Số món đặt : {order.items.length}</p>
      <p>{order.amount} VNĐ</p>
      <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
        <option value="Chế biến thực đơn">Chế biến thực đơn</option>
        <option value="Đang giao hàng">Đang giao hàng</option>
        <option value="Đã giao hàng">Đã giao hàng</option>
      </select>
    </div>
  ))}
</div>
  </div>;
};

export default Orders;
