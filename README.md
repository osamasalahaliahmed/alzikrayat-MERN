# alzikrayat-MERN
simple photo sharing app with React, Express and MongoDB. Upload photos, browse the gallery, add comments and delete your own photos.

Install Node.js and use local MongoDB or MongoDB Atlas.
```powershell
npm --prefix server install
npm --prefix client install
```

Create `server/.env`:
```dotenv
MONGODB_URI=mongodb://127.0.0.1:27017/alzikrayat
port=3000
SESSION_SECRET=replace_with_a_long_random_secret
```

Start the backend:
```powershell
npm --prefix server run dev
```

In another terminal, start the frontend:
```powershell
npm run dev
```

Run these commands from the project folder. Open http://localhost:5173. The frontend connects to the backend on port 3000.

Register, then log in to upload or comment. Photos are saved in `server/uploads/` and their data is saved in MongoDB.
