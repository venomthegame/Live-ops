const bodyParser = require("body-parser");
const express=require("express");
const mongoose=require("mongoose");
const SERVER_Port=process.env.Port || 8080
const app=express();
const userRouter=require("./routes/user");
const offerRoutes=require("./routes/offer")
mongoose.connect("mongodb://localhost:27017/user").then(()=>{
    console.log("sucessful connected to db");
}).catch(()=>{
    console.log("failed to connect to data base");
});
app.use(bodyParser.json());
app.listen(SERVER_Port,()=>{
    console.log("server started at" +""+ SERVER_Port)
});
app.use("/user",userRouter);
app.use("/offer",offerRoutes);