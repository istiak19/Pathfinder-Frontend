import Checkout from "@/app/(dashboardLayout)/_component/checkout";
import { Suspense } from "react";

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