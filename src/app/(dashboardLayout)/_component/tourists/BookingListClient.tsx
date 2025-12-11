/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import BookingCard from "./BookingCard";
import BookingCardSkeleton from "./BookingCardSkeleton";
import { deleteBooking } from "@/services/booking/booking.service";
import { Booking } from "@/types/booking.interface";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function BookingListClient({ bookings }: { bookings: Booking[] }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [currentBookings, setCurrentBookings] = useState(bookings);

    const handleDelete = async (id: string) => {
        setLoading(true);

        try {
            const res = await deleteBooking(id);

            if (res?.success) {
                toast.success("Booking has been successfully deleted!");

                setCurrentBookings(prev =>
                    prev.filter(b => b.id !== id)
                );

                setTimeout(() => router.refresh(), 400);
            } else {
                toast.error(res?.message || "Unable to delete booking.");
            }

        } catch (error: any) {
            toast.error(error.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (loading)
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <BookingCardSkeleton />
                <BookingCardSkeleton />
                <BookingCardSkeleton />
            </div>
        );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentBookings.map(b => (
                <BookingCard key={b.id} booking={b} onDelete={handleDelete} />
            ))}
        </div>
    );
}