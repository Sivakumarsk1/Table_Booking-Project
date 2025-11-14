# 🪑 Table Booking System

A complete web-based Table Booking system built using **Node.js**, **MySQL**, and **React**.  
Users can book tables, view offers, manage reservations, while admins can add/update/delete bookings and manage table statuses.

---

## 📸 Screenshots

(Add your screenshot here after upload)
![Screenshot](./s1.png)
![Screenshot](./s2.png)
![Screenshot](./s3.png)
![Screenshot](./s4.png)
![Screenshot](./s5.png)
![Screenshot](./s6.png)



---

## 🚀 Features

### ⭐ User Features
- Book a table with date & time
- View personalized offers after login
- Google Sign-In & Email/Password authentication
- View booking history
- Responsive UI for all devices

### ⭐ Admin Features
- Add, edit, delete reservations
- Pagination & filtering for admin dashboard
- Manage table statuses  
  - Available  
  - Reserved  
  - Occupied  
  - Maintenance  
- Add offers for specific users

---

## 🧰 Tech Stack

### **Frontend**
- React.js
- Tailwind / CSS
- Axios

### **Backend**
- Node.js
- Express.js
- JWT Authentication
- MySQL Database
- Nodemailer (Emails)
- Google OAuth 2.0 (Sign-In)

---

## 🗄️ Database Structure (MySQL)

### **Users Table**
| Field | Type | Description |
|-------|------|-------------|
| id | INT | Primary Key |
| name | VARCHAR | User name |
| email | VARCHAR | Login email |
| password | VARCHAR | Hashed password |
| login_count | INT | Used for offers |

### **Reservations Table**
| Field | Type | Description |
|-------|------|-------------|
| id | INT | Primary Key |
| table_no | INT | Table chosen |
| date | DATE | Booking date |
| time | TIME | Booking time |
| email | VARCHAR | User email |
| status | VARCHAR | reserved/occupied/etc |

### **Offers Table**
| Field | Type | Description |
|-------|------|-------------|
| id | INT | Primary Key |
| email | VARCHAR | Offer for which user |
| title | VARCHAR | Offer title |
| description | TEXT | Offer details |

---

## ⚙️ Installation & Setup

### 🔧 Backend Setup

```bash
cd Backend
npm install
nodemon app.js


### 🔧 Frontend Setup

```bash
cd Frontend
npm install
npm run dev
