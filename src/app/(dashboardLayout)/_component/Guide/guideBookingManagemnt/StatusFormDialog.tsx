"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IBooking } from "@/types/booking.interface";
import { updateBooking } from "@/services/booking/booking.service";

export const bookingStatuses = [
    "PENDING",
    "ACCEPTED",
    "REJECTED",
    "CONFIRMED",
    "COMPLETED",
    "CANCELLED",
] as const;

export type BookingStatus = (typeof bookingStatuses)[number];

interface IStatusFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    booking?: IBooking;
}

const StatusFormDialog = ({ open, onClose, onSuccess, booking }: IStatusFormDialogProps) => {
    const [status, setStatus] = useState<BookingStatus>(booking?.status as BookingStatus);
    const [pending, setPending] = useState(false);

    if (!booking) return null;

    // Frontend validation: allowed statuses
    const getAllowedStatuses = (currentStatus: BookingStatus) => {
        if (currentStatus === "REJECTED" || currentStatus === "CANCELLED") return [];
        if (currentStatus === "CONFIRMED") return ["CONFIRMED", "COMPLETED"];
        if (currentStatus === "ACCEPTED") return ["ACCEPTED", "CONFIRMED", "COMPLETED"];
        return bookingStatuses;
    };

    const allowedStatuses = getAllowedStatuses(booking.status as BookingStatus);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!allowedStatuses.includes(status)) {
            toast.error(`Cannot change status from '${booking.status}' to '${status}'`);
            return;
        }

        setPending(true);
        try {
            const res = await updateBooking(booking.id!, status);
            if (res.success) {
                toast.success(res.message || "Booking updated");
                onSuccess();
                onClose();
            } else {
                toast.error(res.message || "Failed to update booking");
            }
        } catch (err) {
            console.error("Error updating booking:", err);
            toast.error("Error updating booking");
        } finally {
            setPending(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-h-[90vh] flex flex-col p-0 dark:bg-gray-900 dark:text-gray-100">
                <DialogHeader className="px-6 pt-6 pb-4 shrink-0">
                    <DialogTitle className="dark:text-white">Update Booking Status</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
                    <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
                        <Field>
                            <FieldLabel htmlFor="status" className="dark:text-gray-200">Status</FieldLabel>
                            <Select value={status} onValueChange={(value) => setStatus(value as BookingStatus)}>
                                <SelectTrigger className="dark:bg-gray-800 dark:text-gray-100">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent className="dark:bg-gray-800 dark:text-gray-100">
                                    {bookingStatuses.map((s) => (
                                        <SelectItem
                                            key={s}
                                            value={s}
                                            disabled={!allowedStatuses.includes(s)}
                                        >
                                            {s}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {allowedStatuses.length === 0 && (
                                <p className="text-sm text-red-500 mt-1">
                                    Status cannot be changed from `{booking.status}`
                                </p>
                            )}
                        </Field>
                    </div>

                    <div className="flex justify-end gap-2 px-6 py-4 border-t shrink-0 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                        <Button type="button" variant="outline" onClick={onClose} disabled={pending}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={pending || allowedStatuses.length === 0}>
                            {pending ? "Saving..." : "Update Status"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default StatusFormDialog;