# 🚀 CI/CD Pipeline – SIEM Project

## Overview
This project demonstrates a full CI/CD pipeline using Jenkins, Docker, and GitHub.

---

## 🔧 Technologies Used
- Jenkins (CI/CD automation)
- Docker (containerisation)
- GitHub (version control)
- Node.js (SIEM application)

---

## ⚙️ Pipeline Architecture

GitHub → Jenkins → Docker Build → Docker Tag → Deployment

---

## 🧩 Jenkins Jobs

### 🟢 Job1 – Build Stage
- Pulls code from GitHub
- Builds Docker image: `docker build -t simple-siem `.


---

### 🟡 Job2 – Promotion Stage
- Verifies Docker image exists
- Tags image as: `simple-siem:promoted`


---

### 🔵 Job3 – Deployment Stage
- Stops existing container
- Runs promoted image:`docker run -d -p 3000:3000 --name simple-siem simple-siem:promoted`


---

## 📊 Application Access
- Dashboard: http://localhost:3000
- API Endpoints:
- POST /event
- GET /events
- GET /alerts

