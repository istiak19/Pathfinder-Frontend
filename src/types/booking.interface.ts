import { IListing } from "./listing.interface";

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