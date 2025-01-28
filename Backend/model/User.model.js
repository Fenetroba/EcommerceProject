import mongoose from "mongoose";
import bcrypt from "bcrypt";
const UserFile = new mongoose.Schema(
  {
    Username: {
      type: String,
      required: [true, "the user name is required"],
    },
    email: {
      type: String,
      required: [true, "the email is required"],
      unique: true,
      lowercase: "true",
      trim: true,
    },
    password: {
      type: String,
      required: [true, "the passwored is reqired"],
      minlength: [6, "the password must be greter than 6 digits"],
    },

    cartItems: [
      {
        quantity: {
          type: Number,
          default: 1,
        },
        Product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
        },
      },
    ],

    role: {
      type: String,
      enum: ["custemer", "admin"],
      default: "custemer",
    },
  },
  { timestamps: true }
);
//pre hashing the password before saveing on the data base;
UserFile.pre("save",async function(next){
     if(!this.isModified("password"))return next();
     try {
          const salt=await bcrypt.genSalt(10);
     
     this.password=await bcrypt.hash(this.password,salt)
     next()

} catch (error) {
     next(error)
 }

 
})


UserFile.methods.comperPassword=async function(password){
     return  bcrypt.compare(password ,this.password)
}
const UsersData = mongoose.model("User_Data", UserFile);
export default UsersData;
