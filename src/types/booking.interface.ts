import { IListing } from "./listing.interface";

export interface IBooking {
    id?: string;
    date: string; // ISO date string
    status: BookingStatus;
    guests: number;
    listingId: string;
    touristId: string;
    paymentStatus: "PAID" | "UNPAID";
    createdAt: string;
    updatedAt: string;
    listing: IListing;
    tourist: ITourist;
    payment: Payment;
    reviews: Review[];
}

export interface ITourist {
    id: string;
    name: string;
    email: string;
    password: string;
    role: "TOURIST" | string;
    profilePic: string;
    bio: string;
    isVerified: boolean;
    status: string;
    languages: string[];
    expertise: string[];
    dailyRate: number | null;
    travelPreferences: string[];
    authProvider: string | null;
    providerId: string | null;
    createdAt: string;
    updatedAt: string;
}


export enum PaymentStatus {
    UNPAID = "UNPAID",
    PAID = "PAID",
    REFUNDED = "REFUNDED",
    FAILED = "FAILED",
}

export enum BookingStatus {
    PENDING = "PENDING",
    ACCEPTED = "ACCEPTED",
    REJECTED = "REJECTED",
    CONFIRMED = "CONFIRMED",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED",
}

// Payment Interface (nullable in your API)
export interface Payment {
    id?: string;
    amount?: number;
    method?: string;
    status?: PaymentStatus;
    createdAt?: string;
    updatedAt?: string;
}

// Review Interface
export interface Review {
    id: string;
    rating: number;
    comment: string;
    createdAt: string;
    touristId: string;
    bookingId: string;
}

// Booking Interface
export interface Booking {
    id: string;
    date: string;
    status: BookingStatus;
    guests: number;
    listingId: string;
    touristId: string;
    paymentStatus: PaymentStatus;
    createdAt: string;
    updatedAt: string;
    listing: IListing;
    payment: Payment | null;
    reviews: Review[];
}

export interface CreateBookingDto {
    listingId: string;
    date: string | Date;
    guests: number;
}

export interface BookingPaymentDto {
    bookingId: string;
}