import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";

  try {
    const newOrder = new orderModel({
      userId: req.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.userId, { cartData: {} });


    const line_items = req.body.items.map((item) => ({
        price_data: {
          currency: "vnd",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price, 
        },
        quantity: item.quantity,
      }));
      
      // phí giao hàng
      line_items.push({
        price_data: {
          currency: "vnd", 
          product_data: {
            name: "Phí giao hàng",
          },
          unit_amount: 20000, 
        },
        quantity: 1,
      });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "LỖI" });
  }
};

const verifyOrder = async(req,res) =>{
  const {orderId,success} = req.body;
  try {
    if (success=="true") {
      await orderModel.findByIdAndUpdate(orderId,{payment:true});
      res.json({success:true,message:"Đã thanh toán"})
    }
    else{
      await orderModel.findByIdAndDelete(orderId);
      res.json({success:false,message:"Lỗi thanh toán"})
    }
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"LỖI"})
  }
}

//order của người dùng từ frontend
const userOrders = async (req,res) =>{
  try {
    const orders = await orderModel.find({userId:req.userId})
    res.json({success:true,data:orders})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Lỗi"})
  }
}

//order từ admin panel
const listOrders = async (req,res) => {
  try {
    const orders = await orderModel.find({});
    res.json({success:true,data:orders})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Loi!!!"})
  }
}

// api cho thay đổi của order
const updateStatus = async (req,res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
    res.json({success:true,message:"Đẫ thay đổi"})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Loi!!!"})
  }
}

export { placeOrder,verifyOrder, userOrders,listOrders,updateStatus };
