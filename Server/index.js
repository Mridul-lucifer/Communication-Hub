const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const secret_key = "erthnjmrghuhdfg45678$%YHK(IUG%YUIOL{::L:LLPLPKPKKOPOUGFDrytf*&*&^%%$%45456454765";

app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://mridul4332:QNNDMvzlMraGJ9qI@cluster0.sr67g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Mongoose models
const userSchema = new mongoose.Schema({
    UserId: Number,
    Name: { type: String, unique: true },
    Password: String,
});

const groupSchema = new mongoose.Schema({
    GroupName: { type: String, unique: true },
    Passcode: String,
    Chats: Array,
});

const User = mongoose.model('User', userSchema);
const Group = mongoose.model('Group', groupSchema);

// Middleware for verification
const verification = function(req, res, next) {
    const token = req.body.token;
    if (token) {
        try {
            req.user = jwt.verify(token, secret_key);
            next();
        } catch (error) {
            return res.status(401).json({ msg: "Invalid Token.." });
        }
    } else {
        return res.status(401).json({ msg: "Not valid" });
    }
};

const Passwordrule1 = function(req, res, next) {
    let s = req.body.Password;
    if (s.length < 8) {
        return res.status(400).json({ msg: "Enter minimum 8 letters Password" });
    }
    let num = false, alpha1 = false, alpha2 = false;
    for (let i = 0; i < s.length; i++) {
        if (s[i] >= '0' && s[i] <= '9') num = true;
        if (s[i] >= 'a' && s[i] <= 'z') alpha1 = true;
        if (s[i] >= 'A' && s[i] <= 'Z') alpha2 = true;
    }
    if (!alpha1 || !alpha2 || !num) {
        return res.status(400).json({ msg: "Enter password with numerical value and both upper and lower case Alphabets" });
    }
    next();
};

// Endpoints
app.post("/SignUp", Passwordrule1, async (req, res) => {
    try {
        const existingUser = await User.findOne({ Name: req.body.Name });
        if (existingUser) {
            return res.status(400).json({ msg: "Name already Registered" });
        }

        const Crypted_Password = bcrypt.hashSync(req.body.Password, 8);
        const newUser = new User({
            Name: req.body.Name,
            Password: Crypted_Password,
        });
        await newUser.save();

        const token = jwt.sign({ Name: req.body.Name }, secret_key);
        return res.status(200).json({ msg: "Login Successful", token });
    } catch (error) {
        return res.status(500).json({ msg: "Error signing up", error });
    }
});

app.post("/Login", async (req, res) => {
    const user = await User.findOne({ Name: req.body.Name });
    if (!user || !bcrypt.compareSync(req.body.Password, user.Password)) {
        return res.status(401).json({ msg: "Incorrect Name or Password" });
    }
    
    const token = jwt.sign({ Name: user.Name }, secret_key);
    return res.status(200).json({ msg: "Login Successful", token });
});

app.post("/createGroup", verification, async (req, res) => {
    const existingGroup = await Group.findOne({ GroupName: req.body.GroupName });
    if (existingGroup) {
        return res.status(201).json({ msg: "Group Name is already used" });
    }

    const newGroup = new Group({
        GroupName: req.body.GroupName,
        Passcode: req.body.Passcode,
        Chats: [],
    });
    await newGroup.save();
    const group = await Group.findOne({ GroupName: req.body.GroupName, Passcode: req.body.Passcode });
    return res.status(200).json({ msg: "Created " + newGroup.GroupName ,  GroupNo: group._id });
});

app.post("/joinChat", verification, async (req, res) => {
    const group = await Group.findOne({ GroupName: req.body.GroupName, Passcode: req.body.Passcode });
    if (group) {
        return res.status(200).json({ msg: "Found Group", GroupNo: group._id });
    }
    return res.status(404).json({ msg: "Group Not Found" });
});

app.post("/AddChat", verification, async (req, res) => {
    const group = await Group.findById(req.body.GroupNo);
    if (group) {
        const chat = {
            Name: req.user.Name,
            msg: req.body.Chat
        };
        group.Chats.push(chat);
        await group.save();
        return res.status(200).json({ msg: "added Successfully" });
    }
    return res.status(404).json({ msg: "Group Not Found" });
});

app.post('/getChat', verification, async (req, res) => {
    const group = await Group.findById(req.body.GroupNo);
    if (group) {
        return res.status(200).json({
            array: group.Chats,
            Name: req.user.Name,
            GroupName: group.GroupName
        });
    }
    return res.status(404).json({ msg: "Group Not Found" });
});

app.post('/DeleteGroup', verification, async (req, res) => {
    const group = await Group.findOne({ GroupName: req.body.GroupName, Passcode: req.body.Passcode });
    if (group) {
        await Group.deleteOne({ _id: group._id });
        return res.status(200).json({ msg: "Deleted Group" });
    }
    return res.status(404).json({ msg: "Group Not Found" });
});

app.post('/DeleteAccount', verification, async (req, res) => {
    const user = await User.findOne({ Name: req.body.Name });
    if (user && bcrypt.compareSync(req.body.Password, user.Password)) {
        await User.deleteOne({ _id: user._id });
        return res.status(200).json({ msg: "Account Deleted Successfully" });
    }
    return res.status(201).json({ msg: "Account Details might be wrong" });
});

app.listen(5000, () => {
    console.log("Server Running");
});
