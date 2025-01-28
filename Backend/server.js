import express from 'express'
import cors from 'cors'
import Mongodb from './lib/dataBase.js'
import dotenv from 'dotenv'
import UserAuth from './Router/auth.Route.js'
import ProductRoute from './Router/product.router.js'
import cookieParser from 'cookie-parser';
import cartRouter from './Router/cart.router.js'
import Coupons from './Router/Coupons.router.js'
import path from "path";

const app=express();

app.use(express.json({limit: "10mb"}))

import PaymentRouter from './Router/payMent.route.js'
dotenv.config()
const __dirname = path.resolve();

app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
app.use('/api/auth',UserAuth)
app.use('/api/product',ProductRoute)
app.use('/api/cart',cartRouter)
app.use('/api/coupons',Coupons)
app.use('/api/Payment',PaymentRouter)

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/client/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
	});
}
app.listen(5000 ,()=>{
      Mongodb()
     console.log("the server is connected to port 5000" )
})