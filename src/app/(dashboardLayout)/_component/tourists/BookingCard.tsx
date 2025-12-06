"use client";

import { Booking } from "@/types/booking.interface";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface BookingCardProps {
    booking: Booking;
}

export default function BookingCard({ booking }: BookingCardProps) {
    const statusColors: Record<string, string> = {
        PENDING:
            "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700",
        ACCEPTED:
            "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700",
        REJECTED:
            "bg-red-100 text-red-800 border-red-300 dark:bg-red-900 dark:text-red-200 dark:border-red-700",
        CONFIRMED:
            "bg-green-100 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-200 dark:border-green-700",
        COMPLETED:
            "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-900 dark:text-emerald-200 dark:border-emerald-700",
        CANCELLED:
            "bg-gray-200 text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600",
    };

    const isPayEnabled = booking.status === "ACCEPTED";

    return (
        <div className="border rounded-xl p-4 shadow-sm bg-white dark:bg-gray-900 dark:border-neutral-700 space-y-3 transition">
            {/* Status Badge */}
            <div className="flex justify-between items-center">
                <span
                    className={cn(
                        "px-3 py-1 text-sm font-medium rounded-full border",
                        statusColors[booking.status] ||
                        "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    )}
                >
                    {booking.status}
                </span>

                <span className="text-gray-500 dark:text-gray-400 text-sm">
                    {format(new Date(booking.date), "dd MMM yyyy • hh:mm a")}
                </span>
            </div>

            {/* Title */}
            <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                {booking.listing.title}
            </h2>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 text-sm">
                {booking.listing.description}
            </p>

            {/* Info Row */}
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-300 pt-2">
                <p><strong>City:</strong> {booking.listing.city}</p>
                <p><strong>Guests:</strong> {booking.guests}</p>
                <p><strong>Price:</strong> ${booking.listing.price}</p>
                <p><strong>Payment:</strong> {booking.paymentStatus}</p>
            </div>

            {/* Meeting Point */}
            <div className="text-sm text-gray-600 dark:text-gray-400 pt-2">
                <strong>Meeting Point:</strong> {booking.listing.meetingPoint}
            </div>

            {/* Payment Button */}
            <div className="pt-3">
                <Button
                    disabled={!isPayEnabled}
                    className={cn(
                        "w-full cursor-pointer",
                        isPayEnabled
                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                            : "bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed"
                    )}
                    onClick={() => {
                        if (isPayEnabled) {
                            // Redirect to Checkout page with bookingId
                            window.location.href = `/tourist/dashboard/wishlist/payments/checkout/${booking.id}`;
                        }
                    }}
                >
                    {isPayEnabled ? "Pay Now" : "Payment Not Available"}
                </Button>
            </div>
        </div>
    );
}