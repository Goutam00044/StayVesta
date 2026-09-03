require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const multer = require('multer');
const imagedownloader = require('image-downloader');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const Place = require('./models/place');
const Booking = require('./models/booking');
const Razorpay = require("razorpay");
const crypto = require("crypto");
const supabase = require('./config/supabase');

const app = express();

// Handle /api prefix when deployed on Vercel
app.use((req, res, next) => {
    if (req.url.startsWith('/api/')) {
        req.url = req.url.replace(/^\/api/, '');
    }
    next();
});

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET || 'dev-jwt-secret-change-me';
const src = path.join(__dirname, 'uploads')

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

function userDataFromReq(req) {
    return new Promise((resolve, reject) => {
        const token = req.cookies?.token;

        if (!token) {
            return reject(new Error("No token provided"));
        }

        jwt.verify(token, jwtSecret, {}, (err, userData) => {
            if (err) {
                return reject(err);
            }

            resolve(userData);
        });
    });
}

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));
app.use(cookieParser());
app.use(express.json());
app.use('/uploads', express.static(src));
console.log(src);
app.get("/test", (req, res) => {
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
app.post('/signup', async (req, res) => {
    const { fname, lname, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(422).json({ error: 'Email already exists' });
        }

        const userdoc = await User.create({
            fname,
            lname,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        });

        return res.json(userdoc);
    }
    catch (e) {
        if (e.code === 11000 && e.keyPattern?.email) {
            return res.status(422).json({ error: 'Email already exists' });
        }
        return res.status(422).json({ error: e.message || 'Registration failed' });
    }
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userdoc = await User.findOne({ email });
    if (userdoc) {
        const passok = bcrypt.compareSync(password, userdoc.password);
        if (passok) {
            jwt.sign({ email: userdoc.email, id: userdoc._id }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
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
        else {
            res.status(422).json({ error: 'Invalid password' });
        }
    }
    else {
        res.status(404).json({ error: 'User not found' });
    }
});

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) {
                return res.status(401).json(null);
            }
            const { fname, lname, email, _id, isHost} = await User.findById(userData.id);
            return res.json({fname, lname, email, _id, isHost});
        });
    }
    else {
        return res.json(null);
    }
});

// Added here Become a host Feature 
//Route for Host here
app.patch('/user/become-host', async (req, res) => {
    try {

        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({
                error: "Not authenticated"
            });
        }

        jwt.verify(token, jwtSecret, async (err, userData) => {

            if (err) {
                return res.status(401).json({
                    error: "Invalid token"
                });
            }

            const user = await User.findById(userData.id);

            if (!user) {
                return res.status(404).json({
                    error: "User not found"
                });
            }


            user.isHost = true;

            await user.save();


            res.json({
                message: "You are now a host",
                user:{
                    _id: user._id,
                    fname: user.fname,
                    lname: user.lname,
                    email: user.email,
                    isHost: user.isHost,
                }
            });

        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
})

// app.post('/upload-link', async (req, res) => {
//     const { link } = req.body;
//     const newname = 'photo' + Date.now() + '.jpg';
//     const dest = path.join(__dirname, 'uploads', newname);

//     try {
//         await imagedownloader.image({
//             url: link,
//             dest,
//         });
//         res.json(newname);
//     } catch (e) {
//         res.status(400).json({ error: 'Image download failed', details: e.message });
//     }
// });

// Uploading Multiple Photos from React to NodeJs Server but into our local uploads folder
// const photosmiddleware = multer({ dest: path.join(__dirname, 'uploads') });
// app.post('/upload', photosmiddleware.array('photos', 30), (req, res) => {
//     const uploadedfiles = [];
//     for (let i = 0; i < req.files.length; i++) {
//         const { path: filePath, originalname } = req.files[i];
//         // Extracting the 'file name' with '.extension'
//         const parts = originalname.split('.');
//         const ext = parts[parts.length - 1];
//         // Set fileName with '.extension'
//         const newPath = filePath + '.' + ext;
//         console.log(newPath);
//         fs.renameSync(filePath, newPath);
//         // Always return only the base filename (no directories or 'uploads' prefix)
//         uploadedfiles.push(path.basename(newPath));
//     }
//     res.json(uploadedfiles);
// })

// Upload by link to Supabase Storage S3 bucket instead of local uploads folder
app.post('/upload-link', async (req, res) => {
    try {
        const { link } = req.body;

        if (!link) {
            return res.status(400).json({
                error: 'Image link is required'
            });
        }

        // Download image into memory
        const response = await fetch(link);

        if (!response.ok) {
            return res.status(400).json({
                error: 'Failed to download image'
            });
        }

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Get image type
        const contentType =
            response.headers.get('content-type') || 'image/jpeg';

        const extensionMap = {
            'image/jpeg': '.jpg',
            'image/png': '.png',
            'image/webp': '.webp'
        };

        const fileExt = extensionMap[contentType] || '.jpg';

        // Generate unique filename
        const fileName =
            `${Date.now()}-${crypto.randomBytes(8).toString('hex')}${fileExt}`;

        // Upload directly to Supabase
        const { error } = await supabase.storage
            .from(process.env.SUPABASE_BUCKET)
            .upload(fileName, buffer, {
                contentType,
                upsert: false
            });

        if (error) {
            console.error('Supabase upload error:', error);

            return res.status(500).json({
                error: 'Image upload failed',
                details: error.message
            });
        }

        // Get public URL
        const { data: publicUrlData } = supabase.storage
            .from(process.env.SUPABASE_BUCKET)
            .getPublicUrl(fileName);

        res.json({
            url: publicUrlData.publicUrl
        });

    } catch (error) {
        console.error('Upload link error:', error);

        res.status(500).json({
            error: 'Image upload failed',
            details: error.message
        });
    }
});

// Delete individual property image from Supabase
app.delete('/delete-photo', async (req, res) => {
    try {
        const userData = await userDataFromReq(req);
        const { placeId, photoUrl } = req.body;

        if (!photoUrl) {
            return res.status(400).json({
                error: "Photo URL is required.",
            });
        }

        // Check if this is a Supabase image
        if (!photoUrl.includes('/storage/v1/object/public/')) {
            return res.status(400).json({
                error: "This is not a Supabase image.",
            });
        }

        // Extract bucket + file path from URL
        const storagePart = photoUrl.split('/storage/v1/object/public/')[1];

        const parts = storagePart.split('/');

        const bucketName = parts.shift();
        const filePath = parts.join('/');

        // Make sure the image belongs to our bucket
        if (bucketName !== process.env.SUPABASE_BUCKET) {
            return res.status(403).json({
                error: "Invalid storage bucket.",
            });
        }

        if (!filePath) {
            return res.status(400).json({
                error: "Invalid image path.",
            });
        }

        // Existing property
        if (placeId) {

            const place = await Place.findOne({
                _id: placeId,
                owner: userData.id,
            });

            if (!place) {
                return res.status(404).json({
                    error: "Place not found.",
                });
            }

            if (!place.photos.includes(photoUrl)) {
                return res.status(404).json({
                    error: "Photo not found in this property.",
                });
            }
        }

        // Delete image from Supabase
        const { error } = await supabase.storage
            .from(process.env.SUPABASE_BUCKET)
            .remove([filePath]);

        if (error) {
            console.error('Supabase image deletion error:', error);

            return res.status(500).json({
                error: "Failed to delete image.",
                details: error.message,
            });
        }

        res.json({
            success: true,
            message: "Image deleted successfully.",
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            error: "Failed to delete image.",
        });
    }
});

// S3 Bucket Uploading with Supabase Storage
const photosmiddleware = multer({
    storage: multer.memoryStorage()
});

app.post('/upload', photosmiddleware.array('photos', 30), async (req, res) => {
    try {
        const uploadedfiles = [];

        for (const file of req.files) {
            const fileExt = path.extname(file.originalname).toLowerCase();

            const fileName =
                `${Date.now()}-${crypto.randomBytes(8).toString('hex')}${fileExt}`;

            const { error } = await supabase.storage
                .from(process.env.SUPABASE_BUCKET)
                .upload(fileName, file.buffer, {
                    contentType: file.mimetype,
                    upsert: false,
                });

            if (error) {
                console.error('Supabase upload error:', error);

                return res.status(500).json({
                    error: 'Image upload failed',
                    details: error.message,
                });
            }

            const { data: publicUrlData } = supabase.storage
                .from(process.env.SUPABASE_BUCKET)
                .getPublicUrl(fileName);

            uploadedfiles.push(publicUrlData.publicUrl);
        }

        res.json(uploadedfiles);

    } catch (error) {
        console.error('Upload error:', error);

        res.status(500).json({
            error: 'Image upload failed',
            details: error.message,
        });
    }
});

// Saving this Places data from React to MonogoDb model 
app.post('/places', (req, res) => {
    // We are store the places data but specific to user so using token
    const { token } = req.cookies;
    const { title, address, photos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price } = req.body;

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) {
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

app.get('/user-places', (req, res) => {
    const { token } = req.cookies;
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

app.put('/places', (req, res) => {
    const { token } = req.cookies;
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
        if (userData.id === (placeDoc.owner.toString())) {
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

// Delete Property Safely with proper authentication 
// Delete Property Safely with proper authentication
app.delete('/places/:id', async (req, res) => {
    try {
        const userData = await userDataFromReq(req);
        const { id } = req.params;

        // Verify ownership
        const place = await Place.findOne({
            _id: id,
            owner: userData.id,
        });

        if (!place) {
            return res.status(404).json({
                error: "Place not found",
            });
        }

        // Check for confirmed bookings
        const confirmedBooking = await Booking.findOne({
            place: id,
            bookingStatus: "Confirmed",
        });

        if (confirmedBooking) {
            return res.status(400).json({
                error: "This property has confirmed bookings and cannot be deleted.",
            });
        }

        // Delete images from Supabase
        if (place.photos?.length > 0) {
            const filePaths = place.photos
                .filter(photo => photo.includes('/storage/v1/object/public/'))
                .map(photo =>
                    photo.split('/storage/v1/object/public/')[1]
                        .split('/')
                        .slice(1)
                        .join('/')
                );

            if (filePaths.length > 0) {
                const { error } = await supabase.storage
                    .from(process.env.SUPABASE_BUCKET)
                    .remove(filePaths);

                if (error) {
                    console.error('Supabase image deletion error:', error);
                }
            }
        }

        // Delete property from MongoDB
        await Place.findByIdAndDelete(id);

        res.json({
            success: true,
            message: "Property deleted successfully.",
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Failed to delete property.",
        });
    }
});

// Get Places Data & Also Search Support from MongoDB
app.get('/places', async (req, res) => {

    const { destination, guests, checkIn, checkOut } = req.query;

    let filter = {};

    // Destination filter
    if (destination && destination.trim() !== "") {
        filter.$or = [
            {
                title: {
                    $regex: destination,
                    $options: "i",
                },
            },
            {
                address: {
                    $regex: destination,
                    $options: "i",
                },
            },
        ];
    }

    // Guest filter
    if (guests) {
        filter.maxGuests = {
            $gte: Number(guests),
        };
    }
    // Places based on listing Status
    // This means:
    // new places (true) 
    // old places (field missing) 
    // unlisted (false)
    const places = await Place.find({
        ...filter,
        $and:[{
            $or: [
                { isListed: true },
                { isListed: { $exists: false } },
            ],
        }]
    });

    const confirmedBookings = await Booking.find({
        bookingStatus: "Confirmed",
    });
    console.log(confirmedBookings);
    let availablePlaces = places;

    if (checkIn && checkOut) {
        availablePlaces = places.filter(place => {
            const hasConflict = confirmedBookings.some(booking => {
                return (
                    booking.place.toString() === place._id.toString() &&
                    new Date(booking.checkIn) < new Date(checkOut) &&
                    new Date(booking.checkOut) > new Date(checkIn)
                );
            });
            return !hasConflict;
        });
    }
    res.json(availablePlaces);
    // This checks every place.
    // For each place it asks:
    // "Does this place have any confirmed booking that overlaps the requested dates?"
    // If yes, remove it.
    // If no, keep it.
});

// Now /booking cannot create a booking without a user.
app.post('/booking', async (req, res) => {
    try {
        const userData = await userDataFromReq(req);

        if (!userData?.id) {
            return res.status(401).json({
                error: 'Unauthorized'
            });
        }

        const {
            place,
            checkIn,
            checkOut,
            numberGuest,
            name,
            phone,
            price,
            paymentStatus,
            razorpayOrderId,
            razorpayPaymentId,
        } = req.body;

        const booking = await Booking.create({
            place,
            checkIn,
            checkOut,
            numberGuest,
            name,
            phone,
            price,
            user: userData.id,
            paymentStatus,
            razorpayOrderId,
            razorpayPaymentId,
        });

        res.json(booking);

    } catch (err) {
        console.error(err);

        res.status(500).json({
            error: 'Failed to create booking'
        });
    }
});

app.get('/bookings', async (req, res) => {
    try {
        const userData = await userDataFromReq(req);
        if (!userData?.id) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const bookings = await Booking.find({ user: userData.id }).populate('place');
        res.json(bookings);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message || 'Failed to fetch bookings' });
    }
})
// Create Razorpay Order API which only creates order is User is logged in.
app.post('/create-order', async (req, res) => {
    try {

        const userData = await userDataFromReq(req);

        if (!userData?.id) {
            return res.status(401).json({
                error: 'Unauthorized'
            });
        }

        const {
            place,
            checkIn,
            checkOut,
            numberGuest,
            name,
            phone,
            price
        } = req.body;

        const options = {
            amount: price * 100,
            currency: "INR",
        };

        const order = await razorpay.orders.create(options);

        res.json(order);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Unable to create order"
        });
    }
});

// Verify Razorpay Payment API which only verifies payment is User is logged in.
app.post('/verify-payment', async (req, res) => {

    try {

        const userData = await userDataFromReq(req);

        if (!userData?.id) {
            return res.status(401).json({
                error: 'Unauthorized'
            });
        }

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        const generatedSignature = crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_KEY_SECRET
            )
            .update(
                razorpay_order_id + "|" + razorpay_payment_id
            )
            .digest("hex");

        if (generatedSignature === razorpay_signature) {

            res.json({
                success: true
            });

        } else {

            res.status(400).json({
                success: false
            });

        }

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            error: "Payment verification failed"
        });
    }
}); 

app.get('/bookings/:id', async (req, res) => {
    try {
        const userData = await userDataFromReq(req);
        const { id } = req.params;

        const booking = await Booking.findOne({
            _id: id,
            user: userData.id,
        }).populate('place');

        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        res.json(booking);

    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message });
    }
});

app.patch('/bookings/:id/cancel', async (req, res) => {
    try {
        const userData = await userDataFromReq(req);
        const { id } = req.params;
        const booking = await Booking.findOneAndUpdate(
            {
                _id: id,
                user: userData.id,
            },
            {
                bookingStatus: "Cancelled",
            },
            {
                new: true,
            }
        ).populate("place");
        if (!booking) {
            return res.status(404).json({
                error: "Booking not found",
            });
        }
        res.json(booking);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message,
        });
    }
});

//Create Toggle Listing API
app.patch('/places/:id/toggle-listing', async (req, res) => { 
    try { const userData = await userDataFromReq(req); 
        const { id } = req.params; 
        const place = await Place.findOne({ _id: id, owner: userData.id, }); 
        if (!place) {
             return res.status(404).json({ error: "Place not found" });
             } 
        place.isListed = !place.isListed;
        await place.save(); res.json(place); 
    } 
    catch (err) {
    console.error(err);
    res.status(500).json(err);
}
});

module.exports = app;