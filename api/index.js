require('dotenv').config();
const express = require('express');
const cors= require('cors');
const mongoose= require('mongoose');
const User = require('./models/user');
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret='cglica2i3ascdvdy';
const imagedownloader = require('image-downloader');

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));
app.use(cookieParser());
app.use(express.json());

app.get("/test",(req,res)=>{
    res.json('test okay')
})

// MongoDB Connection with error handling
const mongoUri = process.env.MONGODB_URI;
mongoose.connect(mongoUri)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err.message));
app.post('/register', async(req,res)=>{
    const {name,email,password}=req.body;

    try{
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(422).json({ error: 'Email already exists' });
        }

        const userdoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        });

        return res.json(userdoc);
    }
    catch(e){
        if (e.code === 11000 && e.keyPattern?.email) {
            return res.status(422).json({ error: 'Email already exists' });
        }
        return res.status(422).json({ error: e.message || 'Registration failed' });
    }
})

app.post('/login', async(req, res) => {
    const { email, password } = req.body;
    const userdoc = await User.findOne({email});
    if (userdoc) {
        const passok = bcrypt.compareSync(password,userdoc.password);
        if(passok){
            jwt.sign({email:userdoc.email,id:userdoc._id}, jwtSecret, {}, (err,token)=>{
                if(err) throw err;
                const isProduction = process.env.NODE_ENV === 'production';
                // During local development setting SameSite=None requires Secure=true (HTTPS),
                // which breaks localhost. Use 'lax' for dev so the browser will accept the cookie.
                res.cookie('token', token, {
                    httpOnly: true,
                    sameSite: isProduction ? 'none' : 'lax',
                    secure: isProduction,
                }).json(userdoc);
            })
        }
        else{
            res.status(422).json({ error: 'Invalid password' });
        }
    }
    else{
        res.status(404).json({ error: 'User not found' });
    }
});

app.get('/profile', (req,res)=>{
    const {token}= req.cookies;
    if(token){
        jwt.verify(token, jwtSecret, {}, async(err, userData) => {
            if(err){
                return res.status(401).json(null);
            } 
            const {name,email,_id} = await User.findById(userData.id);
            return res.json({name,email,_id});
        });
    }
    else{
        return res.json(null);
    }
});

app.post('/logout',(req,res)=>{
    res.cookie('token','').json(true);
})

app.post('/upload-link', async (req, res) => {
    const { link } = req.body;
    const newname = 'photo' + Date.now() + '.jpg';
    const dest = path.join(__dirname, 'uploads', newname);

    try {
        await imagedownloader.image({
            url: link,
            dest,
        });
        res.json(newname);
    } catch (e) {
        res.status(400).json({ error: 'Image download failed', details: e.message });
    }
});

app.listen(4000, () => {
    console.log('Server Started on port no 4000');
});