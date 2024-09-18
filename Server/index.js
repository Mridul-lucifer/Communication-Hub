const express = require('express');
const cors = require('cors');
const app = express();
const {readDatabase , writeDatabase} = require('./Database/ModulesToImport');
const persondetail = './Database/Userdetails.json'
const groups = './Database/Chats.json'
const jwt = require('jsonwebtoken') 
const bcrypt = require('bcryptjs')
const secret_key = "erthnjmrghuhdfg45678$%YHK(IUG%YUIOL{::L:LLPLPKPKKOPOUGFDrytf*&*&^%%$%45456454765"
app.use(express.json());
app.use(cors())

//middlewares 
const verification = function(req,res,next){
    const token = req.body.token ;
    if(token){
        try{
            req.user = jwt.verify(token,secret_key);
            next()
        }catch(error){
            return res.status(201).json({
                msg : "Invalid Token.."
            })
        }
    }else{
        return res.status(201).json({
            msg : "Not valid"
        })
    }
}

const Passwordrule1 = function(req,res,next){
    //password need to be more than 8 words 
    //contain num and spleacial symbol
    let s = req.body.Password
    if(s.length<8){
        return res.status(201).json({
            msg:"Enter minimium 8 letters Password"
        })
    }
    let num = false , alpha1 = false ,alpha2=false
    for(let i = 0 ; i < s.length ; i++){
        if(s[i]>='0'&&s[i]<='9'){
            num = true;
        }
        if(s[i]>='a'&&s[i]<='z'){
            alpha1 = true;
        }
        if(s[i]>='A'&&s[i]<='Z'){
            alpha2 = true;
        }
    }
    if(!alpha1 || !alpha2 || !num){
        return res.status(201).json({
            msg : "Enter password with numerical value and both upper and lower case Alphabets"
        })
    }
    next();
}



//End points 
app.post("/SignUp",Passwordrule1,(req,res)=>{
    const login_database = readDatabase(persondetail);
    let id ;
    if(login_database.length==0){
        id = 1 ;
    }else{
        id = login_database[login_database.length-1].UserId + 1 ;
        for(let i = 0  ; i < login_database.length ; i++){
            if(login_database[i].Name==req.body.Name){
                return res.status(201).json({
                    msg : "Name already Registered",

                })
            }
        }
    }
    const Crypted_Password = bcrypt.hashSync(req.body.Password,8);
    const newSignUp = {
        UserId : id,
        Name : req.body.Name,
        Password : Crypted_Password,
    }
    login_database.push(newSignUp);
    writeDatabase(persondetail,login_database);

    const token = jwt.sign({Name:req.body.Name},secret_key)
    return res.status(200).json({
        msg : "Login Successfull",
        token : token
    })
})

app.post("/Login",(req,res)=>{
    const login_database = readDatabase(persondetail);
    for(let i = 0 ; i < login_database.length ; i++ ){
        if(login_database[i].Name == req.body.Name ){
            if(bcrypt.compareSync(req.body.Password,login_database[i].Password)){
                const token = jwt.sign({Name:login_database[i].Name},secret_key)
                return res.status(200).json({
                    msg : "Login Successfull",
                    token : token
                })
            }else{
                return res.status(201).json({
                    msg : "Incorrect Password..."
                })
            }
        }
    }
    return res.status(401).json({
        msg : "Recheck Your Name "
    })
})

app.post("/createGroup",verification,(req,res)=>{
    const Groups = readDatabase(groups);
    for(let i = 0 ; i < Groups.length ;i++){
        console.log(Groups[i]);
        if(Groups[i].GroupName === req.body.GroupName){
            return res.status(200).json({
                msg : "Group Name is already used"
            })
        }
    }
    const newgroup = { 
        GroupName : req.body.GroupName,  
        Passcode : req.body.Passcode,
        Chats : [

        ],
    }  
    Groups.push(newgroup);
    writeDatabase(groups,Groups);
    return res.status(200).json({
        msg : "Created "+newgroup.GroupName
    })
})

app.post("/joinChat",verification,(req,res)=>{
    const Groups = readDatabase(groups)
    for(let i = 0 ; i < Groups.length ; i++ ){
        if(Groups[i].GroupName==req.body.GroupName && Groups[i].Passcode==req.body.Passcode){
            return res.status(200).json({
                msg : "Found Group",
                GroupNo : i
            })
        }
    }
    return res.status(201).json({
        msg : "Group Not Found",
        GroupNo:-1
    })
})

app.post("/AddChat",verification,(req,res)=>{
    const Groups = readDatabase(groups)
    if(req.body.GroupNo >=0 && req.body.GroupNo <= Groups.length ){
        const chat = {
            Name : req.user.Name,   
            msg : req.body.Chat
        }
        Groups[req.body.GroupNo].Chats.push(chat);
        writeDatabase(groups,Groups);
        return res.status(200).json({
            msg : "added Successfully"
        })
    }
    return res.status(201).json({
        msg : "Group Not Found"
    }) 
})

app.post('/getChat',verification,(req,res)=>{
    const Groups = readDatabase(groups)
    const val = req.body.GroupNo;
    return res.status(200).json({
        array : Groups[val].Chats,
        Name : req.user.Name,
        GroupName : Groups[val].GroupName
    })
})
 
app.post('/DeleteGroup',verification,(req,res)=>{
    const Groups = readDatabase(groups)
    for(let i = 0 ; i < Groups.length ; i++ ){
        if(Groups[i].GroupName==req.body.GroupName && Groups[i].Passcode==req.body.Passcode){
            Groups.splice(i,1);
            writeDatabase(groups,Groups);
            return res.status(200).json({
                msg : "Deleted Group",
            })
        }
    }
    return res.status(201).json({
        msg : "Group Not Found",
        GroupNo:-1
    })
})

app.post('/DeleteAccount',(req,res)=>{
    const login_database = readDatabase(persondetail);
    for(let i = 0 ; i < login_database.length;i++){
        if(login_database[i].Name==req.body.Name && bcrypt.compareSync(req.body.Password,login_database[i].Password)){
            login_database.splice(i,1);
            return res.status(200).json({
                msg : "Account Deleted Successfully"
            })
        }
    }
    return res.status(201).json({
        msg : "Account Details might be wrong"
    })
})

app.listen(5000,()=>{
    console.log("Server Running")
})