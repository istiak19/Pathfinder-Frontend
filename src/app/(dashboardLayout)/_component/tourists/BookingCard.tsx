"use client";

import { Booking } from "@/types/booking.interface";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface BookingCardProps {
    booking: Booking;
    onDelete?: (id: string) => Promise<void>;
}

export default function BookingCard({ booking, onDelete }: BookingCardProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    const borderColors: Record<string, string> = {
        PENDING: "border-yellow-400",
        ACCEPTED: "border-blue-500",
        REJECTED: "border-red-500",
        CONFIRMED: "border-green-500",
        COMPLETED: "border-emerald-500",
        CANCELLED: "border-gray-500",
    };

    const isPayEnabled = booking.status === "ACCEPTED";
    const canDelete = booking.status === "PENDING";

    const handleConfirmDelete = async () => {
        setIsDeleting(true);
        await onDelete?.(booking.id);

        // smooth slide-out animation
        setTimeout(() => setIsDeleting(false), 500);
    };

    return (
        <div
            className={cn(
                "border rounded-xl p-4 shadow-sm bg-white dark:bg-gray-900 transition-all duration-300",
                borderColors[booking.status],
                isDeleting ? "translate-x-10 opacity-0" : "opacity-100"
            )}
        >
            {/* Status & Date */}
            <div className="flex justify-between items-center">
                <span className="px-3 py-1 text-sm font-medium rounded-full border">
                    {booking.status}
                </span>

                <span className="text-gray-500 text-sm">
                    Departure: {format(new Date(booking.date), "dd MMM yyyy")}
                </span>
            </div>

            {/* Title */}
            <h2 className="font-semibold text-lg mt-2">
                {booking.listing.title}
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-sm">
                {booking.listing.description}
            </p>

            {/* Details */}
            <div className="grid grid-cols-2 gap-2 text-sm mt-3">
                <p><strong>City:</strong> {booking.listing.city}</p>
                <p><strong>Guests:</strong> {booking.guests}</p>
                <p><strong>Price:</strong> ${booking.listing.price}</p>
                <p><strong>Payment:</strong> {booking.paymentStatus}</p>
            </div>

            <p className="text-sm text-gray-600 mt-2">
                <strong>Meeting Point:</strong> {booking.listing.meetingPoint}
            </p>

            {/* Action Buttons */}
            <div className="flex items-center justify-between gap-2 mt-4">

                {/* Pay Button */}
                <Button
                    disabled={!isPayEnabled}
                    className={cn(
                        "flex-1 cursor-pointer",
                        isPayEnabled
                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                            : "bg-gray-300 text-gray-600 cursor-not-allowed"
                    )}
                    onClick={() => {
                        if (isPayEnabled) {
                            window.location.href =
                                `/tourist/dashboard/wishlist/payments/checkout/${booking.id}`;
                        }
                    }}
                >
                    {isPayEnabled ? "Pay Now" : "Payment Not Ready"}
                </Button>

                {/* Delete Button */}
                {canDelete && (
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="destructive"
                                className="flex-1 flex items-center justify-center gap-1 cursor-pointer"
                            >
                                <Trash2 className="h-4 w-4" />
                                Delete
                            </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Delete Booking?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. Are you sure you want to delete this booking?
                                </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter>
                                <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handleConfirmDelete}
                                    className="bg-red-600 hover:bg-red-700 cursor-pointer text-white"
                                >
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                )}
            </div>
        </div>
    );
}