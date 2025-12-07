"use client";

import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import InputFieldError from "@/components/shared/InputFieldError";
import { createListing, updateListing } from "@/services/guide/listingManagement";
import { IBooking } from "@/types/booking.interface";

interface IListingFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    booking?: IBooking;
}

export const bookingStatuses = [
    "PENDING",
    "ACCEPTED",
    "REJECTED",
    "CONFIRMED",
    "COMPLETED",
    "CANCELLED",
] as const;

export type BookingStatus = (typeof bookingStatuses)[number];

const StatusFormDialog = ({ open, onClose, onSuccess, booking }: IListingFormDialogProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    const isEdit = !!booking;

    const [state, formAction, pending] = useActionState(
        isEdit ? updateListing.bind(null, booking.id!) : createListing,
        null
    );

    useEffect(() => {
        if (state?.success) {
            toast.success(state.message || ("Booking updated"));
            formRef.current?.reset();
            onSuccess();
            onClose();
        } else if (state && !state.success) {
            toast.error(state.message);
        }
    }, [state, onSuccess, onClose, isEdit]);

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-h-[90vh] flex flex-col p-0 dark:bg-gray-900 dark:text-gray-100">

                {/* Header */}
                <DialogHeader className="px-6 pt-6 pb-4 shrink-0">
                    <DialogTitle className="dark:text-white">
                        {isEdit ? "Edit Listing" : "Create New Listing"}
                    </DialogTitle>
                </DialogHeader>

                {/* Scrollable Form */}
                <form ref={formRef} action={formAction} className="flex flex-col flex-1 overflow-hidden">
                    <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
                        {/* status */}
                        <Field>
                            <FieldLabel htmlFor="status" className="dark:text-gray-200">Status</FieldLabel>
                            <Input
                                id="status"
                                name="status"
                                placeholder="Sylhet Tea Garden Adventure Tour"
                                defaultValue={state?.formData?.title || booking?.status}
                                className="dark:bg-gray-800 dark:text-gray-100"
                            />
                            <InputFieldError state={state} field="title" />
                        </Field>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-2 px-6 py-4 border-t shrink-0 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                        <Button type="button" variant="outline" onClick={onClose} disabled={pending} className="dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={pending} className="dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white">
                            {pending ? "Saving..." : isEdit ? "Update Listing" : "Create Listing"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default StatusFormDialog;