const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

app.listen(PORT,()=>console.log(`listening to port ${PORT}`));
mongoose.connect("mongodb+srv://user:13841384@cluster0.zmxjift.mongodb.net/db3").then(()=>console.log("connected to DB"));

const dataSchema = mongoose.Schema({
    id:{type:Number,default:1},
    data:{type:Number,default:0}
});
const database = mongoose.model("counter",dataSchema);


app.get('/add',async(req,res)=>{
    const data = await database.findOne({"id":1});
    data.data+=1;
    await data.save();
    res.sendStatus(200);
})

app.get('/reset',async(req,res)=>{
    const data = await database.findOne({"id":1});
    data.data=0;
    await data.save();
    res.sendStatus(200);
})

app.get('/get',async(req,res)=>{
    const data = await database.findOne({"id":1});
    res.send(`data: ${data.data}`);
})
