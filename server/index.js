const express=require("express");
const app=express();
const cors = require('cors');

require("dotenv").config();

// body parser
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' })); // Allow requests from the frontend origin


const allRoutes=require('./routes/allRoutes');
app.use("/api/v1", allRoutes);


const dbConnect=require('./config/database')
dbConnect();

app.get("/", (req, res)=>{
    res.send("<h1> This is get Request</h1>");
})

app.listen(process.env.PORT, ()=>{
    console.log(`App stareted successfully at port: ${process.env.PORT}`);
})