"use client";

import { useState } from "react";
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

    return (
        <>
            <ReusablePaymentStatusModal
                open={open}
                setOpen={setOpen}
                type={type}
                title={title}
                description={description || searchParams.get("message") || ""}
                details={data}
                buttonText="Go to My Trips"
                onButtonClick={() => router.push("/tourist/dashboard/trips")}
            />

            {!open && (
                <button
                    className="mt-4 p-2 bg-blue-600 text-white rounded"
                    onClick={() => setOpen(true)}
                >
                    Show Payment Status
                </button>
            )}
        </>
    );
};

export default PaymentPageClient;