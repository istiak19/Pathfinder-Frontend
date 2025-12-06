"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { format } from "date-fns";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users } from "lucide-react";
import { CreateBookingDto } from "@/types/booking.interface";
import { createBooking } from "@/services/booking/booking.service";
import { toast } from "sonner";

export default function BookingPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const listingId = searchParams.get("listingId") ?? "";
    const dateParam = searchParams.get("date") ?? "";
    const guestsParam = searchParams.get("guests") ?? "1";

    // Initialize state
    const [date] = useState<Date | null>(() => {
        const parsed = dateParam ? new Date(dateParam) : null;
        return parsed && !isNaN(parsed.getTime()) ? parsed : null;
    });
    const guests = Math.max(parseInt(guestsParam, 10) || 1, 1); // minimum 1 guest

    const handleConfirmBooking = async () => {
        if (!date || !listingId) {
            toast.error("Invalid booking data!");
            return;
        }

        const payload: CreateBookingDto = {
            listingId,
            date: date.toISOString(),
            guests,
        };

        const res = await createBooking(payload);
        if (res?.success) {
            toast.success("Booking request submitted!");

            router.push(`/tourist/dashboard/wishlist?listingId=${listingId}`);
        } else {
            toast.error(res?.message || "Booking failed!");
        }
    };


    return (
        <div className="max-w-3xl mx-auto py-10 space-y-6">
            <h1 className="text-2xl font-bold text-center">Confirm Your Booking</h1>

            {/* Booking Details */}
            <Card>
                <CardHeader>
                    <CardTitle>Booking Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <span>
                            {date ? format(date, "EEEE, MMMM d, yyyy") : "No date selected"}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-muted-foreground" />
                        <span>{guests} guest{guests > 1 ? "s" : ""}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="font-semibold">Listing ID:</span>
                        <span>{listingId}</span>
                    </div>
                </CardContent>
            </Card>

            {/* Confirm Booking Button */}
            <div className="text-center">
                <Button size="lg" onClick={handleConfirmBooking} className="w-full cursor-pointer">
                    Confirm Booking
                </Button>
            </div>
        </div>
    );
}