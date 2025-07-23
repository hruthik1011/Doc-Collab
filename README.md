# DocCollab - Real-time Document Collaboration Platform

## Overview
DocCollab is a web-based collaborative document editing platform that allows multiple users to create, edit, and share documents in real-time. Built with the MERN stack (MongoDB, Express.js, React, Node.js), it features real-time collaboration, user authentication, and document management.

## Features

### 1. Authentication
- User registration and login
- JWT-based authentication
- Protected routes
- Secure session management

### 2. Document Management
- Create new documents
- Edit existing documents
- Real-time content synchronization
- Auto-saving functionality

### 3. Real-time Collaboration
- Multiple users can edit simultaneously
- Live cursor tracking
- User presence indicators
- Conflict resolution

### 4. User Interface
- Clean, modern design with Tailwind CSS
- Responsive layout
- Rich text editor integration
- Intuitive navigation

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Socket.IO
- JWT Authentication

### Frontend
- React
- React Router
- Socket.IO Client
- Jodit Editor
- Tailwind CSS



## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
```

### Frontend Setup
```bash
cd frontend
npm install
```

## Running the Application

### Start Backend Server
```bash
cd backend
npx nodemon
```

### Start Frontend Development Server
```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:5173`

## API Endpoints

### Authentication
- POST `/users/signup` - Register new user
- POST `/users/login` - User login

### Documents
- GET `/documents` - Get all documents
- POST `/documents` - Create new document
- GET `/documents/:id` - Get specific document
- PUT `/documents/:id` - Update document
- DELETE `/documents/:id` - Delete document

## Environment Variables

### Backend

## Screenshots
**SignUp**
<img width="1919" height="971" alt="Screenshot 2025-07-22 072805" src="https://github.com/user-attachments/assets/5c932652-00bc-4392-975f-659b1454bd16" />
**Login**
<img width="1913" height="974" alt="Screenshot 2025-07-22 072752" src="https://github.com/user-attachments/assets/aa00cb06-9acf-4aad-9cd0-375781555d8c" />
**Home**
<img width="1914" height="971" alt="Screenshot 2025-07-22 072736" src="https://github.com/user-attachments/assets/79dfc626-52f9-4ff4-8946-fcfb4681d251" />
**Create Document**
<img width="1916" height="964" alt="Screenshot 2025-07-22 072640" src="https://github.com/user-attachments/assets/94d86113-02ab-4b35-b3f6-8ba18f0dcd58" />
<img width="1918" height="967" alt="Screenshot 2025-07-22 072603" src="https://github.com/user-attachments/assets/9505081f-e397-4953-9228-9487bfeaa9bf" />



