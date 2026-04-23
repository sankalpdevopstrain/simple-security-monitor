## Jenkins Setup & Introduction
- [Jenkins Setup \& Introduction](#jenkins-setup--introduction)
  - [What is Jenkins?](#what-is-jenkins)
  - [It helps developers:](#it-helps-developers)
- [Installing Jenkins (Using Docker)](#installing-jenkins-using-docker)
  - [Step 1: Pull Jenkins Image](#step-1-pull-jenkins-image)
  - [Step 2: Run Jenkins Container](#step-2-run-jenkins-container)
  - [Step 3: Access Jenkins](#step-3-access-jenkins)
  - [Step 4: Unlock Jenkins](#step-4-unlock-jenkins)
  - [Step 5: Creating a new admin user in Jenkins](#step-5-creating-a-new-admin-user-in-jenkins)
  - [Step 6: Installing Plugins](#step-6-installing-plugins)

---

### What is Jenkins?

Jenkins is an open-source automation server used for Continuous Integration (CI) and Continuous Delivery (CD).

### It helps developers:
* Automatically build applications
* Run tests
* Deploy applications
* Integrate with tools like GitHub and Docker

---

## Installing Jenkins (Using Docker)

Instead of installing Jenkins manually, we used Docker to run it as a container.

### Step 1: Pull Jenkins Image
```bash
docker pull jenkins/jenkins:lts
```
### Step 2: Run Jenkins Container
```bash
docker run -d \
  -p 8080:8080 \
  -p 50000:50000 \
  --name jenkins-server \
  jenkins/jenkins:lts
```
### Step 3: Access Jenkins

Open browser: `http://localhost:8080`

### Step 4: Unlock Jenkins
When Jenkins first starts:
1. Get admin password from container:
```bash
docker exec jenkins-server cat /var/jenkins_home/secrets/initialAdminPassword
```
2. Paste into Jenkins login screen

### Step 5: Creating a new admin user in Jenkins
* Username = `SankalpDevopsTrain`
* Password = `choice of your own`
* Confirm password = `choice of your own`
* Full name = `Sankalp Hiregoudar`
* E-mail address = `sankalpdevopstrain@gmail.com`

### Step 6: Installing Plugins
1. Just click on the suggested plugins
