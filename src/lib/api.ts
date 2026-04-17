import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export const getAvailability = async (date: string) => {
  const response = await api.get<{ date: string; available_slots: string[] }>(`/availability?date=${date}`);
  return response.data;
};

export const createBooking = async (data: any) => {
  const response = await api.post('/bookings', data);
  return response.data;
};

export const submitContact = async (data: any) => {
  const response = await api.post('/contact', data);
  return response.data;
};