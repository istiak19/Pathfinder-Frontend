import Checkout from "@/app/(dashboardLayout)/_component/checkout";
import { Metadata } from "next";
import { Suspense } from "react";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Payment – Pathfinder",
    description:
        "View and manage your guide profile on Pathfinder. Update your personal information, tour offerings, availability, and showcase your expertise to travelers.",
    keywords: [
        "Pathfinder",
        "guide profile",
        "local guide dashboard",
        "profile management",
        "tour guide information",
        "update guide profile",
        "travel experiences",
        "tour offerings",
    ],
};

const CheckoutPage = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;
    const bookingId = id;

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Checkout bookingId={bookingId} />
        </Suspense>
    );
};

export default CheckoutPage;