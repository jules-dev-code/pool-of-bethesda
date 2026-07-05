import type {
  Appointment,
  Service,
  Testimonial,
  Faq,
  GalleryImage,
  AppointmentStatus,
  PaymentMethod,
} from "@prisma/client";

export type { Appointment, Service, Testimonial, Faq, GalleryImage, AppointmentStatus, PaymentMethod };

export type Locale = "fr" | "en";

export interface BookingFormData {
  serviceId: string;
  date: string; // ISO date
  time: string; // "09:30"
  patientName: string;
  phone: string;
  email: string;
  comments?: string;
  paymentMethod: PaymentMethod;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface ActionResult<T = undefined> {
  success: boolean;
  message: string;
  data?: T;
}

export interface DashboardStats {
  todayCount: number;
  weekCount: number;
  monthCount: number;
  pendingCount: number;
  confirmedCount: number;
  cancelledCount: number;
  totalPatients: number;
}
