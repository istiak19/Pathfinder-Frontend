"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface PaymentStatusModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    title: string;
    description?: string | null;
    details?: Record<string, string>;
    type?: "success" | "fail" | "cancel";
    buttonText?: string;
    onButtonClick: () => void;
}

const icons: Record<
    "success" | "fail" | "cancel",
    { color: string; bg: string; svg: ReactNode }
> = {
    success: {
        color: "text-emerald-600",
        bg: "bg-emerald-100/60",
        svg: <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />,
    },
    fail: {
        color: "text-red-600",
        bg: "bg-red-100/60",
        svg: <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />,
    },
    cancel: {
        color: "text-yellow-600",
        bg: "bg-yellow-100/60",
        svg: (
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
        ),
    },
};

export const ReusablePaymentStatusModal = ({
    open,
    setOpen,
    title,
    description,
    details = {},
    type = "success",
    buttonText = "Okay",
    onButtonClick,
}: PaymentStatusModalProps) => {
    const icon = icons[type];

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent
                // enhanced styling: rounded, soft shadow, glass effect, subtle entry animation
                className="max-w-md rounded-2xl p-0 overflow-hidden ring-1 ring-black/10 shadow-2xl backdrop-blur-md bg-white/30 dark:bg-black/40 border border-white/20 dark:border-black/30 transform transition-all duration-300"
            >
                <div className="p-6">
                    <DialogHeader className="text-center">
                        <DialogTitle className={`text-xl font-semibold ${icon.color}`}>
                            {title}
                        </DialogTitle>

                        <DialogDescription className="mt-2 text-sm text-muted-foreground">
                            {description}
                        </DialogDescription>
                    </DialogHeader>

                    {/* Icon */}
                    <div className="flex justify-center my-4">
                        <div
                            className={`w-20 h-20 ${icon.bg} rounded-full flex items-center justify-center ring-1 ring-black/8`}
                            style={{ backdropFilter: "saturate(120%) blur(6px)" }}
                        >
                            <svg
                                className={`w-12 h-12 ${icon.color}`}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                aria-hidden
                            >
                                {icon.svg}
                            </svg>
                        </div>
                    </div>

                    {/* Details */}
                    {details && Object.keys(details).length > 0 && (
                        <div className="bg-white/40 dark:bg-black/30 p-4 rounded-lg text-sm space-y-2 border border-white/20 dark:border-black/25">
                            {Object.entries(details).map(([key, value]) => (
                                <p key={key} className="text-sm text-muted-foreground">
                                    <span className="font-medium text-foreground mr-2">{key}:</span>
                                    <span>{value}</span>
                                </p>
                            ))}
                        </div>
                    )}

                    <DialogFooter className="mt-6">
                        <Button
                            onClick={onButtonClick}
                            className={`w-full cursor-pointer ${type === "success"
                                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                                : type === "fail"
                                    ? "bg-rose-600 hover:bg-rose-700 text-white"
                                    : "bg-yellow-600 hover:bg-yellow-700 text-white"}  rounded-lg py-3 font-semibold`}
                        >
                            {buttonText}
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
};