import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { submitContact } from '@/lib/api';
import { contactSchema, type ContactFormData } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await submitContact(data);
      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      alert('Failed to send message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Contact Us</h2>
          <p className="text-slate-600">Have a question? We're here to help.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold mb-6">Clinic Information</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <h4 className="font-medium">Address</h4>
                  <p className="text-slate-600">123 Health Avenue, Suite 100<br/>Medical District, NY 10001</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <h4 className="font-medium">Phone</h4>
                  <p className="text-slate-600">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-slate-600">contact@drsmithclinic.com</p>
                </div>
              </div>
            </div>
          </div>

          <Card>
            <CardContent className="pt-6">
              {success ? (
                <div className="text-center py-8">
                  <p className="text-green-600 font-medium">Message sent successfully!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <Input placeholder="Your Name" {...register('name')} />
                    {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <Input type="email" placeholder="Your Email" {...register('email')} />
                    {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <Textarea placeholder="Your Message" className="min-h-[120px]" {...register('message')} />
                    {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>}
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}