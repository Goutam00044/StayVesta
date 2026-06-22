# StayVesta
Stay Vesta is a homestay booking platform built as a production-grade full-stack project using the MERN stack, featuring secure JWT authentication, Redux Toolkit, Redis caching, AWS Integration. 

The platform allows hosts to list and manage their properties, while guests can search, explore, and book stays with a seamless checkout experience. Built from the ground up as a production-grade web application using the MERN stack, it covers real-world concerns like secure authentication, concurrent booking prevention, image storage, and automated email communication.

---
 
## ✨ Features
 
### For Guests
- 🔍 **Smart search** — find stays by location, check-in/check-out dates, and number of guests
- 🗺️ **Map view** — explore stays pinned on an interactive map (Leaflet.js)
- 📸 **Rich listing pages** — photo galleries, amenities, host info, and guest reviews
- 📅 **Live availability calendar** — blocked dates shown in real-time, no surprise "unavailable" messages at checkout
- 💳 **Secure checkout** — Stripe-powered payment with instant booking confirmation
- ❤️ **Wishlist** — save favourite properties across sessions
- 📬 **Booking confirmation email** — automatic receipt sent via AWS SES
- 📋 **My bookings dashboard** — track upcoming, ongoing, and past stays
### For Hosts
- 🏠 **Property management** — create, edit, and delete listings with full details
- 🖼️ **Multi-image upload** — upload up to 10 photos per listing (stored on AWS S3)
- 📊 **Host dashboard** — see all bookings on your properties at a glance
- 💬 **Guest messaging** — real-time chat with booked guests via Socket.io
- ⭐ **Reply to reviews** — respond publicly to guest feedback
### Platform-wide
- 🔐 **JWT authentication** — secure login with HTTP-only cookie refresh tokens and multi-device support
- 🔒 **Concurrent booking protection** — Redis-based date locking prevents two users booking the same dates simultaneously
- ⚡ **Fast search** — popular search results cached in Redis, reducing database load
- 📧 **Email notifications** — booking confirmations, cancellations, and reminders via AWS SES
- 📱 **Fully responsive** — works on mobile, tablet, and desktop
---
 
## 🛠️ Tech Stack
 
| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | React.js (Vite) | Component-based UI |
| **State Management** | Redux Toolkit + RTK Query | Global state + server data fetching |
| **Routing** | React Router v6 | Client-side routing with protected routes |
| **Styling** | Tailwind CSS | Utility-first responsive design |
| **Backend** | Node.js + Express.js | REST API server |
| **Database** | MongoDB + Mongoose | Primary data store with schema validation |
| **Authentication** | JWT + bcrypt | Stateless auth with refresh token rotation |
| **Caching** | Redis (Upstash) | Search cache + booking date locks |
| **File Storage** | AWS S3 + CloudFront | Property image upload and delivery |
| **Email** | AWS SES | Transactional booking emails |
| **Real-time** | Socket.io | Host–guest messaging |
| **Payments** | Stripe | Secure property booking payments |
| **Deployment** | Render | Backend + Frontend hosting |
| **CI/CD** | GitHub Actions | Auto-deploy on push to main |
 
---
## Project Status

🚧 Currently under active development.

---
 
## 🗂️ Project Structure
 


---
 
## ⚙️ Getting Started
 
### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free tier)
- Redis — [Upstash](https://upstash.com) free tier recommended
- AWS account (free tier) — S3 + SES
- Stripe account
  
### 1. Clone the repository
```bash
git clone https://github.com/yourusername/stay-vesta.git
cd stay-vesta
```
 
### 2. Backend setup
```bash
cd backend
npm install
```
 
### 3. Frontend setup
```bash
cd frontend
npm install
```

Start the frontend:
```bash
npm run dev
```
 
App runs at `http://localhost:5173`
 
---

---
 
## 👤 Author
 
**Goutam Wanga**
- GitHub: [@Goutam00044](https://github.com/Goutam00044)
- LinkedIn: [linkedin.com/in/goutamwanga/](https://linkedin.com/in/goutamwanga/)
- Email: wanga.goutam@gmail.com
---
