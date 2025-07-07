# Full Stack Web Application (Next.js + Express)

This is a full-stack web application built with **Next.js** (TypeScript) for the frontend and **Express.js** (Node.js) for the backend.

---

## 📁 Project Structure

```
.
├── client/             # Frontend (Next.js)
│   ├── public/         
│   ├── src/            # App source
│   ├── next.config.ts
│   ├── tsconfig.json
│   ├── package.json
│   └── ...
│
├── server/             # Backend (Express.js)
│   ├── src/            # API source code
│   ├── tsconfig.json
│   ├── package.json
│   └── ...
│
├── .gitignore
```

---

## ✨ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/mshahilt/lifesupport-hub
cd lifesupport-hub
```

---

### 2. Install Dependencies

#### Frontend (Client)

```bash
cd client
npm install
```

#### Backend (Server)

```bash
cd ../server
npm install
```

---

### 3. Running the App

#### Start the Backend Server

```bash
cd server
npm run dev  # or npm run start
```

Make sure `.env` file exists with necessary variables like:

```env
PORT=5050
DATABASE_URL=your_mongo_connection_string
CLOUDINARY_NAME=
CLOUDINARY_URL=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

#### Start the Frontend (Next.js)

```bash
cd client
npm run dev
```

Frontend should be available at: `http://localhost:3000`
Backend should be running on: `http://localhost:5050`

---

## 🛠 Technologies Used

* **Frontend**:

  * [Next.js](https://nextjs.org/)
  * TypeScript
  * TailwindCSS

* **Backend**:

  * [Express.js](https://expressjs.com/)
  * TypeScript
  * MongoDb
  * dotenv

---

## 🛆 Build for Production

### Frontend:

```bash
cd client
npm run build
```

### Backend:

```bash
cd server
npm run build
```
