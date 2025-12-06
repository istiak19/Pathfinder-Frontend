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

            if (res.success && res.data?.paymentUrl) {
                toast.success(res.message || "Redirecting to payment...");
                window.location.href = res.data.paymentUrl;
            } else {
                toast.error(res.message || "Failed to initiate payment");
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            <Button onClick={handlePayment} disabled={loading} size="lg">
                {loading ? "Processing..." : "Proceed to Payment"}
            </Button>
        </div>
    );
};

export default Checkout;