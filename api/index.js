require('dotenv').config();
const express = require('express');
const cors= require('cors');
const mongoose= require('mongoose');
const User = require('./models/user');
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');
const path = require('path');
const multer  = require('multer');
const imagedownloader = require('image-downloader');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const Place = require('./models/place');
const Booking = require('./models/booking');

const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET || 'dev-jwt-secret-change-me';
const src = path.join(__dirname, 'uploads')


app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));
app.use(cookieParser());
app.use(express.json());
app.use('/uploads',express.static(src));
console.log(src);
app.get("/test",(req,res)=>{
    res.json('test okay')
})

// MongoDB Connection with error handling
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
    console.error('MONGODB_URI is not set. Add it to your .env file before starting the server.');
} else {
    mongoose.connect(mongoUri)
        .then(() => console.log('MongoDB connected successfully'))
        .catch(err => console.error('MongoDB connection error:', err.message));
}
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

const photosmiddleware = multer({ dest: path.join(__dirname, 'uploads') });
app.post('/upload', photosmiddleware.array('photos', 30), (req, res) => {
    const uploadedfiles =[];
    for (let i = 0; i < req.files.length; i++) {
        const { path: filePath, originalname } = req.files[i];
        // Extracting the 'file name' with '.extension'
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        // Set fileName with '.extension'
        const newPath = filePath + '.' + ext;
        console.log(newPath);
        fs.renameSync(filePath, newPath);
        // Always return only the base filename (no directories or 'uploads' prefix)
        uploadedfiles.push(path.basename(newPath));
    }
    res.json(uploadedfiles);

})

// Saving this Places data from React to MonogoDb model 
app.post('/places',(req,res)=>{
    // We are store the places data but specific to user so using token
    const {token}= req.cookies;
    const {title,address,photos,description,perks,extraInfo,checkIn,checkOut,maxGuests,price} = req.body;
    
    jwt.verify(token,jwtSecret,{},async(err, userData)=>{
        if(err){
            console.error(err);
        } 
        await Place.create({
            owner: userData.id,
            title,
            address,
            photos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price,
        })
    })
    res.json(true);
})

app.get('/user-places',(req,res)=>{
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) {
            console.error(err);
            return res.status(401).json({ error: 'Invalid token' });
        }
        const places = await Place.find({ owner: userData.id });
        res.json(places);
    });
});

app.get('/places/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const placeDoc = await Place.findById(id);
        if (!placeDoc) {
            return res.status(404).json({ error: 'Place not found' });
        }
        res.json(placeDoc);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.put('/places',(req,res)=>{
    const {token} = req.cookies;
    const {
            id,
            title,
            address,
            photos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price,
        } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) {
            console.error(err);
            return res.status(401).json({ error: 'Invalid token' });
        }
        const placeDoc = await Place.findById(id);
        if(userData.id=== (placeDoc.owner.toString())){
            placeDoc.set({
                title,
                address,
                photos,
                description,
                perks,
                extraInfo,
                checkIn,
                checkOut,
                maxGuests,
                price
            })
        }
        placeDoc.save();
        res.json('ok');
    });
})

app.get('/places',async(req,res)=>{
    res.json(await Place.find());
})

app.post('/booking',(req,res)=>{
    const { 
            place,
            checkIn,
            checkOut,
            numberGuest,
            name,
            phone, price,} = req.body;

            Booking.create({ 
            place,
            checkIn,
            checkOut,
            numberGuest,
            name,
            phone, price,}).then((doc)=>{
                res.json(doc)
            }).catch((err)=>{
                console.error(err);
            })

    
})

app.listen(4000, () => {
    console.log('Server Started on port no 4000');
});