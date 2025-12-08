import PaymentPageClient from "@/app/(dashboardLayout)/_component/tourists/Payment/SuccessModalClient";
import { Metadata } from "next";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Payment Cancelled – Pathfinder",
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

const CancelPage = () => {
    return (
        <PaymentPageClient
            type="cancel"
            title="Payment Cancelled"
        />
    );
};

export default CancelPage;