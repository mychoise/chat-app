
---

````markdown
# 📬 Real-Time Chat App with Image Uploads

A full-stack **real-time chat application** built with **React**, **Express.js**, **Socket.IO**, **Multer**, and **Cloudinary**.  
Users can send messages and images instantly with authentication and a modern, responsive UI.

---

## 🚀 Features

✅ JWT Authentication  
✅ Real-time messaging using Socket.IO  
✅ Image uploads with Multer + Cloudinary  
✅ Individual user message filtering  
✅ Toast notifications & loader states  
✅ RESTful API architecture  
✅ Clean, responsive UI  

---

## 🛠️ Tech Stack

**Frontend:** React, Zustand / Redux  
**Backend:** Node.js, Express.js  
**Realtime:** Socket.IO  
**Authentication:** JWT  
**Uploads:** Multer, Cloudinary  
**Database:** MongoDB  

---

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/chat-app.git
cd chat-app
````

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside `server`:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Run the backend:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd client
npm install
npm start
```

---

## 🔄 Socket.IO Events

| Event Name       | Description               |
| ---------------- | ------------------------- |
| `connect`        | Client connects to server |
| `disconnect`     | Client disconnects        |
| `sendMessage`    | Emit message to server    |
| `receiveMessage` | Listen for new message    |

---

## 📁 Folder Structure

```
chat-app/
├── client/                # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   └── utils/
│   └── package.json
│
├── server/                # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── sockets/
│   └── server.js
│
└── README.md
```

---

## 🧪 Testing

* **API Testing**: Postman
* **Realtime Testing**: Multiple browser tabs
* **Uploads**: Check Cloudinary dashboard

---

## 🤝 Contributing

Pull requests are welcome!
For major changes, please open an issue first to discuss what you’d like to change.

---

## 📄 License

This project is licensed under the **MIT License**.

---



---

**Made with ❤️ using MERN + Socket.IO**

```

---

Would you like me to include **badges (for Node, React, Socket.IO, etc.)** and **a screenshots section** next? That makes it look even more professional on GitHub.
```
