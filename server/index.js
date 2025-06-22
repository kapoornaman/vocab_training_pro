const express=require("express");
const cors=require("cors");
const dotenv=require("dotenv");
const vocabRoutes = require("./routes/vocab");   // ⬅️ import the router


dotenv.config();

const app=express();
const PORT=process.env.PORT||5000;

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("It's running");
});
app.use("/api/vocab", vocabRoutes);              // ⬅️ all routes start with /api/vocab

app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`);
});
