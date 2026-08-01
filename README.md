# ACADSTAT - Academic Management Platform


**ACADSTAT** is a role-based, mobile-first academic management platform designed for **Students, Teachers, and Administrators**.  
The application provides a centralized system for managing academic information, student performance, results, attendance, and institutional activities.

The UI is implemented based on the Figma design and is optimized for **web deployment and Web-to-APK conversion**.

---

## 🚀 AcadStat Features at the system

### 🔐 Authentication & Role-Based Access

- Secure user login system
- Role-based dashboard routing
- Separate interfaces for:
  - Students
  - Teachers
  - Administrators

### 👨‍🎓 Student Module

- Student dashboard
- Academic information access
- Course and semester details
- Exam information
- Results viewing
- Attendance tracking
- Assignment management
- Fee information
- Teacher information
- Doubt/support section
- Profile management

### 👨‍🏫 Teacher Module

- Teacher dashboard
- Student management
- Student record management
- Marks entry and update
- Performance analysis
- Academic monitoring
- Profile and security management

### 👨‍💼 Admin Module

- Admin dashboard
- User and role management
- Student management
- Teacher management
- Academic management
- Result approval
- System configuration
- Audit monitoring

---

# 📱 Application Screens

## Student Application

### Dashboard

Features:

- Personalized greeting
- Search functionality
- Academic module grid

Modules:

- Students
- Syllabus
- Exams
- Events
- Teachers
- Time Table
- Results
- Inbox
- Attendance
- Assignments
- Fees
- Ask Doubt


### Course Management

Available programs:

- BSc.CSIT
- IT
- MBA

Features:

- Program details
- Semester information
- Course overview


### Student Profile

Includes:

- Personal details
- Academic reports
- Academic details
- Result summary
- Security settings
- Logout


---

# Teacher Application

## Dashboard

Modules:

- Manage Students
- Enter Marks
- Performance Analysis


## Teacher Profile

Features:

- Student record management
- Marks management
- Performance analysis
- Account security

---

# Admin Application

## Dashboard Modules

- Students
- Syllabus
- Exams
- Events
- Teachers
- Time Table
- Results
- Inbox
- Attendance
- Assignments
- Fees
- Admin Call


## Admin Management

Includes:

- User & Role Management
- Academic Management
- Result Processing
- System Configuration
- Integrity & Audit Monitoring

---

# 🛠️ Technology Stack

## Frontend

- HTML5
- CSS3
- JavaScript
- Progressive Web App (PWA)

## Backend Integration Ready

Can be integrated with:

- Django REST Framework
- Node.js / Express
- PostgreSQL
- JWT Authentication

## Mobile Conversion

Supported using:

- Capacitor
- Bubblewrap
- PWA Builder

---

# 📂 Project Structure

```
Acadstat/

├── index.html          # Login + Student application
├── teacher.html        # Teacher application
├── admin.html          # Admin application

├── app.js              # Authentication & role mapping

├── script.js           # Student navigation
├── teacher.js          # Teacher navigation
├── admin.js            # Admin navigation

├── styles.css          # Common styling

├── manifest.json       # PWA configuration

└── README.md
```

---

# 🔑 Demo Credentials

| Role | Username | Password |
|------|----------|----------|
| Student | student | student123 |
| Teacher | teacher | teacher123 |
| Admin | admin | admin123 |

> Replace demo authentication with your production database authentication.

---

# 🔌 Backend API Integration

Replace the mock authentication in `app.js`:

```javascript
async login(emailOrUsername, password) {

  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: emailOrUsername,
      password: password
    })
  });

  const data = await response.json();

  if(data.success){
      this.currentUser = data.user;
      return {
        success:true,
        user:data.user
      };
  }

  return {
      success:false,
      message:data.message
  };
}
```

Expected API response:

```json
{
  "success": true,
  "user": {
    "name": "Ram Kumar Sharma",
    "role": "student",
    "username": "ramkumarsharma"
  }
}
```

---

# ▶️ Running Locally

Clone the repository:

```bash
git clone https://github.com/yourusername/acadstat.git
```

Navigate into the project:

```bash
cd acadstat
```

Run development server:

```bash
npx serve .
```

Open:

```
http://localhost:3000
```

---

# 📦 Web to APK Conversion

## Using PWA Builder

Visit:

```
https://www.pwabuilder.com
```

Steps:

1. Deploy application
2. Enter hosted URL
3. Generate Android package
4. Download APK


## Using Capacitor

Install:

```bash
npm install @capacitor/core @capacitor/cli
```

Initialize:

```bash
npx cap init
```

Add Android:

```bash
npx cap add android
```

Open Android Studio:

```bash
npx cap open android
```

---

# 🎨 Figma Design Reference

Figma Project:

```
https://www.figma.com/design/0un9YnjDdAx8UrGL8JNEYq/ACADSTAT
```

Design Nodes:

| Module | Node |
|--------|------|
| Student Home | 41-2 |
| Student Courses | 1-7265 |
| Teacher Dashboard | 138-169 |
| Admin Dashboard | 138-170 |

---

# 🚧 Future Improvements

- JWT authentication
- Real-time notifications
- AI-based student performance recommendations
- Attendance analytics
- Online assignment submission
- Payment integration
- Mobile push notifications
- Cloud deployment

---

# 👨‍💻 Contributors

- Samir Pokhrel
- Sajit
- Shree

---

# 📄 License

This project is developed for academic purposes.

---

## ⭐ ACADSTAT

**Smart Academic Management Platform for Students, Teachers, and Institutions.**
