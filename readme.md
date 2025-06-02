# 🎧 Tunezy Backend

This is the backend for **Tunezy**, a Spotify-like music streaming application. It uses **Google OAuth 2.0** for user authentication and provides RESTful APIs for managing users, music, playlists, and banners.

---

## ✨ Features

- 🔐 Google OAuth 2.0 login via GCP
- 📁 Upload & manage songs
- 🎵 Create & manage playlists
- 🖼️ Manage promotional banners
- 🔍 Music search and playback tracking
- 🔐 JWT-secured protected routes
- 🛡️ Input validation with middleware

---

## 🛠️ Tech Stack

- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **Passport.js** (Google OAuth)
- **dotenv** for environment configuration
- **express-session** for managing OAuth sessions
- **Joi** or similar for request validation

---

## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/sugam50/tunezy.git
cd tunezy-backend

# Install dependencies
npm install

# Copy and configure environment variables
cp .env.example .env

---

## 🐳 Running with Docker

Make sure you have Docker installed.

### 🔨 Build the Docker image

```bash
docker build -t tunezy .
docker run -p 3500:3500 --env-file .env tunezy-backend
