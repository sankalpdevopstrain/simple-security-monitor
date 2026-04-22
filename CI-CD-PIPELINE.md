# CI/CD Pipeline – SIEM Project

- [CI/CD Pipeline – SIEM Project](#cicd-pipeline--siem-project)
  - [Overview](#overview)
  - [Diagram to represent the process:](#diagram-to-represent-the-process)
    - [What the diagram shows:](#what-the-diagram-shows)
  - [Tools Installed \& Why](#tools-installed--why)
    - [Docker](#docker)
    - [Jenkins (running via Docker container)](#jenkins-running-via-docker-container)
    - [Ngrok (Webhook exposure tool)](#ngrok-webhook-exposure-tool)
  - [Setting up Webhook](#setting-up-webhook)
    - [Payload URL:](#payload-url)
    - [Content type:](#content-type)
    - [Event trigger:](#event-trigger)
    - [⚠️ Issue encountered:](#️-issue-encountered)
  - [Jenkins Pipeline (3 Jobs Architecture)](#jenkins-pipeline-3-jobs-architecture)
    - [Job 1 – Build Stage (CI)](#job-1--build-stage-ci)
    - [Job 2 – Promotion Stage (CI/CD Bridge)](#job-2--promotion-stage-cicd-bridge)
    - [Job 3 – Deployment Stage (CD)](#job-3--deployment-stage-cd)

## Overview
This project demonstrates a full CI/CD pipeline using Jenkins, Docker, and GitHub.

---

## Diagram to represent the process:
![CI/CD pipeline](image-6.png)

### What the diagram shows:
1. GitHub push triggers Jenkins via webhook (Ngrok)
2. Job1 builds Docker image
3. Job2 promotes + tags image (Git Publisher stage)
4. Job3 deploys container
5. Final output = live SIEM dashboard

## Tools Installed & Why
### Docker

Used to:
* Build application images
* Run containers
* Promote versions between jobs

Key commands used:
```bash
docker build -t simple-siem .
docker run -d -p 3000:3000 simple-siem
```
### Jenkins (running via Docker container)

Installed using:
```bash
docker run -d -p 8080:8080 -p 50000:50000 --name jenkins-server jenkins/jenkins:lts
```
Used for:
* CI/CD job orchestration
* GitHub integration
* Triggering pipeline stages automatically

### Ngrok (Webhook exposure tool)

Installed locally (Windows executable):
```bash
./ngrok.exe http 8080
```
Used for:
* Exposing local Jenkins to GitHub
* Allowing GitHub webhooks to trigger Jenkins

Webhook URL generated: `https://previous-stinky-maturity.ngrok-free.dev/github-webhook/`

---
## Setting up Webhook
We configured:

Settings → Webhooks → Add webhook

### Payload URL:
```bash
https://<ngrok-url>/github-webhook/
```
### Content type:
```bash
application/json
```
### Event trigger:
```bash
Push events only
```
### ⚠️ Issue encountered:
* Webhook initially showed 404 error
* Fixed by ensuring:
  * Jenkins is running
  * Ngrok is active
  * Correct endpoint /github-webhook/

---

## Jenkins Pipeline (3 Jobs Architecture)
### Job 1 – Build Stage (CI)
**Purpose:**

Build Docker image from latest GitHub code

**Configuration:**
* Source Code: GitHub repo (main branch)
* Trigger: GitHub webhook (via ngrok)
* Build step: `docker build -t simple-siem .`

**Output:**
* Docker image created: `simple-siem:latest`
* Automatically triggers Job2

### Job 2 – Promotion Stage (CI/CD Bridge)
**Purpose:**
Validate and promote build artifact

**Key actions:**
* Confirms Docker image exists
* Tags image for release
```bash
docker tag simple-siem simple-siem:promoted
```
**Git Publisher (IMPORTANT PART):**

Used to:
* Push updated state back to GitHub if needed
* Maintain version tracking
**Output:**
* Promoted Docker image created
* Triggers Job3 automatically

### Job 3 – Deployment Stage (CD)
**Purpose:**
Deploy application container

**Actions:**
```bash
docker stop simple-siem || true
docker rm simple-siem || true

docker run -d -p 3000:3000 --name simple-siem simple-siem:promoted
```
**Output:**
Live SIEM dashboard running on:
`http://localhost:3000`
