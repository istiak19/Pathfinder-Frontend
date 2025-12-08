/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createPayment } from "@/services/payment/payment.services";
import { BookingPaymentDto } from "@/types/booking.interface";

interface CheckoutProps {
    bookingId: string;
}

const Checkout = ({ bookingId }: CheckoutProps) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        if (!bookingId) return;
        setLoading(true);

        try {
            const res = await createPayment({ bookingId } as BookingPaymentDto);

            if (res.success && res.data?.gateway_url) {
                toast.success(res.message || "Redirecting to payment..");
                window.location.href = res.data.gateway_url;
            } else {
                toast.error(res.message || "Failed to initiate payment");
            }

        } catch (err: any) {
            console.error(err);
            toast.error(err.message || "Payment request failed");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!bookingId) {
            toast.error("Booking ID is required");
            router.push("/tourist/dashboard/wishlist");
        }
    }, [bookingId, router]);

    return (
        <div className="max-w-xl mx-auto py-20 text-center space-y-6">
            <h1 className="text-2xl font-bold">Checkout</h1>

            <p className="text-gray-600 dark:text-gray-300">
                You are about to pay for booking ID: <strong>{bookingId}</strong>
            </p>

            <p className="text-sm text-muted-foreground">
                This payment is part of the Local Guide project. Once completed, your booking will be
                confirmed and your assigned guide will receive your details immediately.
            </p>

            <Button onClick={handlePayment}
                className="cursor-pointer"
                disabled={loading} size="lg">
                {loading ? "Processing..." : "Proceed to Payment"}
            </Button>
        </div>
    );
};

export default Checkout;