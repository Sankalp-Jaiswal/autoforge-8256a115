# Doctor Booking SPA

A modern, full-stack single-page application for a doctor's profile and appointment booking system.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, ShadCN UI (simplified), Framer Motion, React Hook Form, Zod
- **Backend**: Node.js, Express, Prisma (SQLite), Zod, Express Rate Limit

## Setup Instructions

### 1. Backend Setup
Navigate to the `backend` directory (if separated) or run from the root if combined:
```bash
# Install backend dependencies
npm install

# Initialize the SQLite database and push schema
npx prisma db push

# Start the development server (runs on port 5000)
npm run dev
```

### 2. Frontend Setup
Navigate to the `frontend` directory:
```bash
# Install frontend dependencies
npm install

# Start the Vite development server (proxy configured to forward /api to localhost:5000)
npm run dev
```

### 3. Usage
- Open your browser to `http://localhost:5173` (or the port Vite provides).
- Scroll through the landing page.
- Use the booking section to select a date. It will fetch available slots from the backend.
- Submit a booking or contact form to see the full flow in action.

### Database Management
You can view the SQLite database using Prisma Studio:
```bash
npx prisma studio
```