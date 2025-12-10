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

    // Redirect route based on payment result
    const redirectRoute = useMemo(() => {
        if (type === "success") return "/tourist/dashboard/trips";
        if (type === "fail") return "/tourist/dashboard/wishlist";
        if (type === "cancel") return "/explore";
        return "/";
    }, [type]);

    return (
        <div
            className="
                min-h-screen 
                flex items-center justify-center 
                bg-cover bg-center bg-no-repeat 
                relative
                animate-fadeIn
            "
            style={{
                backgroundImage:
                    "url('/images/pay.jpg')",
            }}
        >

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

            {/* Modal Container */}
            <div className="relative z-10 w-full flex justify-center px-4">
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
            </div>

            {/* Re-open button when modal is closed */}
            {!open && (
                <div className="absolute bottom-10 z-10">
                    <button
                        className="
                            px-5 py-2 
                            bg-white/20 backdrop-blur-md 
                            text-white 
                            rounded-full 
                            shadow-lg 
                            cursor-pointer
                            border border-white/30
                            hover:bg-white/30 
                            transition-all
                        "
                        onClick={() => setOpen(true)}
                    >
                        Show Payment Status
                    </button>
                </div>
            )}
        </div>
    );
};

export default PaymentPageClient;