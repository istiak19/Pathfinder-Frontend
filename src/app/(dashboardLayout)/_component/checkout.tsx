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
                toast.success(res.message || "Redirecting to payment...");
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
        <div
            className="
                min-h-screen 
                flex items-center justify-center
                bg-cover bg-center bg-no-repeat
                relative
            "
            style={{
                backgroundImage:
                    "url('/images/payment.jpg')",
            }}
        >

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

            {/* Card */}
            <div
                className="
                    relative z-10 
                    max-w-md w-full mx-4 
                    bg-white/20 dark:bg-black/20 
                    backdrop-blur-xl 
                    border border-white/30 
                    shadow-2xl 
                    rounded-2xl 
                    p-8 
                    text-center 
                    space-y-6 
                    animate-fadeIn
                "
            >
                <h1 className="text-3xl font-bold text-white">Checkout</h1>

                <p className="text-gray-100 text-lg">
                    You are about to pay for:
                    <br />
                    <span className="font-semibold text-white text-xl mt-1 block">
                        Booking ID: {bookingId}
                    </span>
                </p>

                <p className="text-sm text-gray-200">
                    Once the payment is successful, your booking will be confirmed
                    automatically and the assigned guide will receive your details instantly.
                </p>

                <Button
                    onClick={handlePayment}
                    disabled={loading}
                    size="lg"
                    className="
                        cursor-pointer w-full 
                        bg-blue-600 hover:bg-blue-700
                        text-white font-semibold 
                        rounded-full transition-all
                    "
                >
                    {loading ? "Processing..." : "Proceed to Payment"}
                </Button>

                <p className="text-xs text-gray-300 mt-3">
                    Secure payment powered by SSLCOMMERZ
                </p>
            </div>
        </div>
    );
};

export default Checkout;