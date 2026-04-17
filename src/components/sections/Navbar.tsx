import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Stethoscope, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Book Appointment', href: '#booking' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={cn('fixed top-0 w-full z-50 transition-all duration-300', isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5')}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 text-primary font-bold text-xl">
          <Stethoscope className="w-6 h-6" />
          Dr. Smith
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">
              {link.name}
            </a>
          ))}
          <Button asChild size="sm">
            <a href="#booking">Book Now</a>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-slate-600" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 py-4 px-4 flex flex-col gap-4 shadow-lg">
          {links.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-sm font-medium text-slate-600 hover:text-primary">
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}