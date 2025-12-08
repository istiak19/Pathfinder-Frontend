"use client";

import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ReusablePaymentStatusModal } from "@/app/(dashboardLayout)/_component/ReusablePaymentStatusModal";

interface Props {
    type: "success" | "fail" | "cancel";
    title: string;
    description?: string;
}

const PaymentPageClient = ({ type, title, description }: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [open, setOpen] = useState(true);

    const data = {
        TransactionID: searchParams.get("transactionId") || "",
        Amount: `${searchParams.get("amount") || ""} BDT`,
        Status: searchParams.get("status") || "",
    };

    // ✅ Decide redirect route based on payment result
    const redirectRoute = useMemo(() => {
        if (type === "success") return "/tourist/dashboard/trips";
        if (type === "fail") return "/tourist/dashboard/wishlist";
        if (type === "cancel") return "/explore";
        return "/";
    }, [type]);

    return (
        <>
            <ReusablePaymentStatusModal
                open={open}
                setOpen={setOpen}
                type={type}
                title={title}
                description={description || searchParams.get("message") || ""}
                details={data}
                buttonText="Continue"
                onButtonClick={() => router.push(redirectRoute)}
            />

            {!open && (
                <button
                    className="mt-4 p-2 bg-blue-600 cursor-pointer text-white rounded"
                    onClick={() => setOpen(true)}
                >
                    Show Payment Status
                </button>
            )}
        </>
    );
};

export default PaymentPageClient;