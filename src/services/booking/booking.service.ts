/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { CreateBookingDto } from "@/types/booking.interface";

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

export async function getAllBookings(queryString?: string) {
    try {
        const response = await serverFetch.get(`/bookings/${queryString ? `?${queryString}` : ""}`);
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

export const updateBooking = async (bookingId: string, newStatus: string) => {
    try {
        const response = await serverFetch.patch(`/bookings/${bookingId}`, {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus }),
        });

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.message || "Failed to update status");
        }

        return result;
    } catch (error: any) {
        console.error("Failed to update status:", error.message || error);
        return {
            success: false,
            message: error.message || "Something went wrong",
        };
    }
};

export async function deleteBooking(id: string) {
    try {
        const response = await serverFetch.delete(`/bookings/${id}`)
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