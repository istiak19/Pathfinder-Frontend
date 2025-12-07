"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { useRef, useState } from "react";
import { toast } from "sonner";
import { IListing } from "@/types/listing.interface";
import { toggleStatus } from "@/services/listings/listingManagement";
import { ListingStatus } from "../../Guide/ListingsManagement/ListingColumns";

interface IListingStatusDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    listing?: IListing;
}

const ListingStatusDialog = ({
    open,
    onClose,
    onSuccess,
    listing,
}: IListingStatusDialogProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [pending, setPending] = useState(false);

    const [status, setStatus] = useState<ListingStatus>(listing?.status as ListingStatus);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!listing) return;

        setPending(true);

        try {
            const res = await toggleStatus(listing.id!, status);

            if (res.success) {
                toast.success(res.message || "Listing status updated");
                onSuccess();
                onClose();
            } else {
                toast.error(res.message || "Failed to update listing status");
            }
        } catch (err) {
            console.error("Error updating listing:", err);
            toast.error("Failed to update listing status");
        } finally {
            setPending(false);
        }
    };

    const handleClose = () => {
        formRef.current?.reset();
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>Change Listing Status</DialogTitle>
                </DialogHeader>

                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="flex flex-col flex-1 min-h-0"
                >
                    <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
                        <Field>
                            <FieldLabel>Status</FieldLabel>
                            <Select
                                value={status}
                                onValueChange={(value: ListingStatus) => setStatus(value)}
                                disabled={pending}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value={ListingStatus.Active}>Active</SelectItem>
                                    <SelectItem value={ListingStatus.Inactive}>Inactive</SelectItem>
                                </SelectContent>
                            </Select>

                        </Field>
                    </div>

                    <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50 dark:bg-black">
                        <Button
                            type="button"
                            className="cursor-pointer"
                            variant="outline"
                            onClick={handleClose}
                            disabled={pending}
                        >
                            Cancel
                        </Button>

                        <Button type="submit" className="cursor-pointer" disabled={pending}>
                            {pending ? "Updating..." : "Update Status"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ListingStatusDialog;