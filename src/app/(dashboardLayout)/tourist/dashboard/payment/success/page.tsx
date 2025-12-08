import PaymentPageClient from "@/app/(dashboardLayout)/_component/tourists/Payment/SuccessModalClient";
import { Metadata } from "next";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Payment Successful – Pathfinder",
    description:
        "Your payment was completed successfully! View your booking details, trip information, and confirmation on Pathfinder.",
    keywords: [
        "Pathfinder",
        "payment success",
        "payment confirmation",
        "booking payment",
        "trip payment",
        "tour booking",
        "success page",
        "travel booking confirmation",
    ],
};

const SuccessPage = () => {
    return (
        <PaymentPageClient
            type="success"
            title="Payment Successful!"
        />
    );
};

export default SuccessPage;