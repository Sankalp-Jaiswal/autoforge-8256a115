import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="pt-32 pb-16 md:pt-40 md:pb-24 px-4">
      <div className="container mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
            Compassionate Care,<br />
            <span className="text-primary">Exceptional Results.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Dr. Smith provides comprehensive medical services tailored to your unique needs. Experience healthcare that puts you first.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto gap-2" asChild>
              <a href="#booking">
                <Calendar className="w-4 h-4" /> Book Appointment
              </a>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2" asChild>
              <a href="#services">
                Our Services <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}