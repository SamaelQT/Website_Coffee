import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://samnguyen02112000:samnguyen123@cluster0.zeoaazs.mongodb.net/coffee"
    )
    .then(() => console.log("DB Connected"));
};
