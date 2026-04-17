import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { getAvailability, createBooking } from '@/lib/api';
import { bookingSchema, type BookingFormData } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Booking() {
  const [date, setDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { date }
  });

  const selectedTime = watch('time');

  useEffect(() => {
    const fetchSlots = async () => {
      if (!date) return;
      setLoadingSlots(true);
      try {
        const res = await getAvailability(date);
        setSlots(res.available_slots);
        setValue('time', ''); // Reset time when date changes
        setValue('date', date);
      } catch (error) {
        console.error('Failed to fetch slots', error);
      } finally {
        setLoadingSlots(false);
      }
    };
    fetchSlots();
  }, [date, setValue]);

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      await createBooking(data);
      setSuccess(true);
      reset();
    } catch (error) {
      alert('Failed to book appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Book an Appointment</h2>
          <p className="text-slate-600">Select a date and time that works for you.</p>
        </div>

        {success ? (
          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-6 text-center">
              <h3 className="text-2xl font-semibold text-green-800 mb-2">Booking Confirmed!</h3>
              <p className="text-green-700 mb-6">We have received your appointment request. You will receive a confirmation email shortly.</p>
              <Button onClick={() => setSuccess(false)} variant="outline">Book Another</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Date & Time Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select Date & Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Date</label>
                  <Input 
                    type="date" 
                    min={format(new Date(), 'yyyy-MM-dd')} 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Available Slots</label>
                  {loadingSlots ? (
                    <p className="text-sm text-slate-500">Loading slots...</p>
                  ) : slots.length > 0 ? (
                    <div className="grid grid-cols-3 gap-2">
                      {slots.map((slot) => (
                        <Button
                          key={slot}
                          type="button"
                          variant={selectedTime === slot ? 'default' : 'outline'}
                          className="w-full"
                          onClick={() => setValue('time', slot, { shouldValidate: true })}
                        >
                          {slot}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-red-500">No slots available for this date.</p>
                  )}
                  {errors.time && <p className="text-sm text-red-500 mt-2">{errors.time.message}</p>}
                </div>
              </CardContent>
            </Card>

            {/* Patient Details Form */}
            <Card>
              <CardHeader>
                <CardTitle>Your Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <Input placeholder="Full Name" {...register('patientName')} />
                    {errors.patientName && <p className="text-sm text-red-500 mt-1">{errors.patientName.message}</p>}
                  </div>
                  <div>
                    <Input type="email" placeholder="Email Address" {...register('email')} />
                    {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <Input type="tel" placeholder="Phone Number" {...register('phone')} />
                    {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <Textarea placeholder="Reason for visit (Optional)" {...register('reason')} />
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting || !selectedTime}>
                    {isSubmitting ? 'Confirming...' : 'Confirm Appointment'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
}