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
        color: "text-green-600",
        bg: "bg-green-100",
        svg: <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />,
    },
    fail: {
        color: "text-red-600",
        bg: "bg-red-100",
        svg: (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        ),
    },
    cancel: {
        color: "text-yellow-600",
        bg: "bg-yellow-100",
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
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className={`${icon.color} text-center text-xl`}>
                        {title}
                    </DialogTitle>

                    <DialogDescription className="text-center text-gray-600">
                        {description}
                    </DialogDescription>
                </DialogHeader>

                {/* Icon */}
                <div className="flex justify-center my-4">
                    <div
                        className={`w-20 h-20 ${icon.bg} rounded-full flex items-center justify-center`}
                    >
                        <svg
                            className={`w-12 h-12 ${icon.color}`}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            {icon.svg}
                        </svg>
                    </div>
                </div>

                {/* Details */}
                {details && Object.keys(details).length > 0 && (
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-sm space-y-2">
                        {Object.entries(details).map(([key, value]) => (
                            <p key={key}>
                                <strong>{key}:</strong> {value}
                            </p>
                        ))}
                    </div>
                )}

                <DialogFooter className="mt-6">
                    <Button
                        onClick={onButtonClick}
                        className={`w-full cursor-pointer text-black dark:text-white ${type === "success"
                            ? "bg-green-600 hover:bg-green-700"
                            : type === "fail"
                                ? "bg-red-600 hover:bg-red-700"
                                : "bg-yellow-600 hover:bg-yellow-700"
                            }`}
                    >
                        {buttonText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};