"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { format } from "date-fns";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Info } from "lucide-react";
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
    const guests = Math.max(parseInt(guestsParam, 10) || 1, 1);

    const estimatedPrice = guests * 100

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

    const handleCancel = () => {
        router.push("/explore");
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat py-10 px-4"
            style={{ backgroundImage: "url('/images/booking.jpg')" }}
        >
            <div className="max-w-3xl mx-auto space-y-6 bg-black/60 backdrop-blur-lg p-6 rounded-xl">
                <h1 className="text-3xl font-bold text-center text-white mb-4">Confirm Your Booking</h1>

                {/* Booking Details */}
                <Card className="bg-white/90 dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-shadow duration-300">
                    <CardHeader>
                        <CardTitle>Booking Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-muted-foreground" />
                            <span>{date ? format(date, "EEEE, MMMM d, yyyy") : "No date selected"}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-muted-foreground" />
                            <span>{guests} guest{guests > 1 ? "s" : ""}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="font-semibold">Listing ID:</span>
                            <span>{listingId}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Info className="h-5 w-5 text-muted-foreground" />
                            <span>Estimated Price: ${estimatedPrice}</span>
                        </div>

                        <div className="text-sm text-muted-foreground">
                            Please confirm your booking. After confirming, the guide will be notified and may contact you for details.
                        </div>
                    </CardContent>
                </Card>

                {/* Buttons */}
                <div className="flex flex-col md:flex-row gap-4">
                    <Button size="lg" onClick={handleConfirmBooking} className="flex-1 cursor-pointer">
                        Confirm Booking
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        onClick={handleCancel}
                        className="flex-1 cursor-pointer"
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
}