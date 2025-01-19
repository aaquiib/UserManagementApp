const express = require('express');
const path = require('path');
const userModel=require('./models/user');
const user = require('./models/user');

const app = express();

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res)=>{
    res.render("index.ejs");
})

app.get('/read',async (req,res)=>{
    let allusers= await userModel.find();
    res.render("read.ejs",{users:allusers});
})

app.post('/create',async (req,res)=>{
    let createdUser = await userModel.create({
        name: req.body.name,
        email: req.body.email,
        image: req.body.image
    })
    res.redirect("/read");
})

app.get('/delete/:id', async (req,res)=>{
    let user = await userModel.findOneAndDelete({_id:req.params.id});
    res.redirect("/read");
})

app.get('/edit/:id',async (req,res)=>{
    let user=await userModel.findOne({_id: req.params.id});
    res.render("update.ejs",{user});
})

app.post('/update/:id',async (req,res)=>{
    let {name,email,image}=req.body;
    let user=await userModel.findOneAndUpdate({_id: req.params.id},{name,email,image},{new:true});
    res.redirect("/read");
})

app.listen(3000);