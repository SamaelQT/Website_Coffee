import userModel from "../models/userModel.js";

// Thêm món vào giỏ hàng
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.userId);
    let cartData = userData.cartData;

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    await userModel.findByIdAndUpdate(req.userId, { cartData });
    res.json({ success: true, message: "Đã thêm vào giỏ hàng" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Lỗi khi thêm vào giỏ hàng" });
  }
};

// Xoá món khỏi giỏ hàng
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.userId);
    let cartData = userData.cartData;

    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }

    await userModel.findByIdAndUpdate(req.userId, { cartData });
    res.json({ success: true, message: "Đã xoá món khỏi giỏ hàng" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Lỗi khi xoá món" });
  }
};

// Lấy dữ liệu giỏ hàng
const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.userId);
    let cartData = userData.cartData;

    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Lỗi khi lấy dữ liệu giỏ hàng" });
  }
};

export { addToCart, removeFromCart, getCart };
