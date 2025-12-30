# 🌍 WanderLust

WanderLust is a full-stack travel listing and destination exploration web application. It allows users to discover places, create and manage listings, upload images, view locations on interactive maps, and share experiences through reviews and ratings. The project is built with a focus on clean architecture, security, and scalability.

---

## 🚀 Live Demo

🔗 https://wanderlust-j31l.onrender.com/listings

---

## 📖 Project Overview

WanderLust provides a platform where users can explore travel destinations and share detailed listings. Each listing includes images, descriptions, pricing, location details, and user reviews. Authenticated users can create, edit, and delete their own listings, while visitors can browse and review destinations.

The application follows the MVC (Model-View-Controller) architecture to ensure better organization, maintainability, and scalability. Third-party services are integrated for cloud image storage and map visualization, along with secure authentication and authorization.

---

## ✨ Features

- 🔐 User Authentication (Signup, Login, Logout)
- 🧑‍💼 Role-based Authorization
- 🏠 Create, Edit, and Delete Listings
- 🖼️ Image Upload and Management using Cloud Storage
- ⭐ Review and Rating System
- 🗺️ Interactive Map Integration for Locations
- 🛡️ Secure Session Handling
- 📱 Responsive Design for All Screen Sizes

---

## 🛠️ Tech Stack

### Frontend
- HTML5  
- CSS3  
- Bootstrap  
- EJS (Embedded JavaScript Templates)

### Backend
- Node.js  
- Express.js  

### Database
- MongoDB (MongoDB Atlas)  
- Mongoose ODM  

### Tools & Services
- Cloudinary (Image Storage)
- Mapbox (Maps & Geolocation)
- Passport.js (Authentication)
- Express-Session & Connect-Flash
- Render (Deployment)

---

## 📁 Project Structure
WanderLust/
├── controllers/ # Application logic
├── models/ # Database schemas
├── routes/ # Express routes
├── views/ # EJS templates
├── public/ # Static files (CSS, JS, Images)
├── utils/ # Utility and helper functions
├── cloudConfig.js # Cloudinary configuration
├── app.js # Main application file
└── package.json

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and add the following variables:
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

MAP_TOKEN=your_mapbox_access_token
MONGO_URL=your_mongodb_connection_string
SESSION_SECRET=your_session_secret


---

## 🔐 Authentication & Security

- Passwords are hashed and stored securely
- Session-based authentication using Passport.js
- Protected routes with authorization middleware
- Only listing owners can update or delete their listings

---

## 🧪 Validation & Error Handling

- Server-side validation using Joi
- Centralized error handling
- Flash messages for user feedback

---

## 🌱 Future Enhancements

- Wishlist / Favorites feature
- Advanced search and filtering
- User profile pages
- Booking and reservation system
- Real-time notifications

---

## 🤝 Contributing

Contributions are welcome.  
Fork the repository, create a new branch, and submit a pull request.

---

## 📜 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Suraj Singh Rawat  
B.Tech Student | Full Stack Web Developer  

GitHub: https://github.com/Surajrawat7017/wanderlust.git

