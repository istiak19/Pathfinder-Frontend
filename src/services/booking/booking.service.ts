/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { CreateBookingDto } from "@/types/booking.interface";
import { IReviewFormData } from "@/types/review.interface";

export async function getMeBooking() {
    try {
        const response = await serverFetch.get(`/bookings/me`);
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
};

export async function createBooking(data: CreateBookingDto) {
    try {
        const response = await serverFetch.post("/bookings", {
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Error creating review:", error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to create review",
        };
    }
};