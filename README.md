# 🏥 Sheger Health Connect

A professional, full-stack healthcare management system designed for medical specialists and patients in Addis Ababa, Ethiopia. Built with a focus on role-based security, AI-assisted triage, and premium user experience.

## 🚀 Key Features

### 👤 User Roles
- **Admin**: Full control over user onboarding (Doctors/Patients), system monitoring, and financial tracking.
- **Doctor**: Personalized clinical workspace to manage appointments, view assigned patients, and communicate with administration.
- **Patient**: Secure portal to browse specialists, book consultations, and interact with the AI Triage Assistant.

### 🛠️ Core Modules
- **Doctor Management**: Integrated onboarding system with hashed credentials and specialization mapping.
- **AI Triage Assistant**: Intelligent health advisor (powered by GPT-4) with local fallback support for continuous availability.
- **System Logs**: Real-time monitoring of server health, database connectivity, and security events.
- **Payment Tracking**: Hospital revenue management system for tracking patient transactions.

## 💻 Tech Stack
- **Frontend**: React.js, Tailwind CSS, Framer Motion (Animations), Lucide React (Icons).
- **Backend**: Node.js, Express, Sequelize (ORM), Socket.io (Real-time).
- **Database**: MySQL.
- **Security**: JWT Authentication, bcrypt password hashing, Role-Based Access Control (RBAC).

## ⚙️ Setup & Installation

### 1. Prerequisites
- Node.js (v18+)
- MySQL Server

### 2. Backend Setup
```bash
cd backend
npm install
# Configure .env with your DB credentials and OpenAI Key
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 4. Seeding Admin
To create the initial system administrator, run:
```bash
cd backend
node seed-admin.js
```
**Default Admin**: `admin` / `Admin@2026`

## 📊 System Architecture
The application uses a modular MVC-style architecture on the backend with a clear separation of concerns between models, controllers, and routes. The frontend follows a component-based design with centralized state management via `AuthContext`.

---
© 2026 Sheger Health. Developed by Gemachis Tesfaye.
