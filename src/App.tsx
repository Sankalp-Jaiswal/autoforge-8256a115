import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import Booking from '@/components/sections/Booking';
import Contact from '@/components/sections/Contact';

function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main>
        <Hero />
        <Booking />
        <Contact />
      </main>
      <footer className="bg-slate-900 text-slate-400 py-8 text-center">
        <p>&copy; {new Date().getFullYear()} Dr. Smith Clinic. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;