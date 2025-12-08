import PaymentPageClient from "@/app/(dashboardLayout)/_component/tourists/Payment/SuccessModalClient";
export const dynamic = "force-dynamic";


const SuccessPage = () => {
    return (
        <PaymentPageClient
            type="success"
            title="Payment Successful!"
        />
    );
};

export default SuccessPage;