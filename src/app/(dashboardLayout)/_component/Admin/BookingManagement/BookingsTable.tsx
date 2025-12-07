"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import ReusableManagementTable from "@/components/shared/ReusableManagementTable";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { toast } from "sonner";
import { IBooking } from "@/types/booking.interface";
import { BookingsColumns } from "./BookingsColumns";
import BookingViewDetailDialog from "../../Guide/guideBookingManagement/BookingViewDetailDialog";
import { deleteBooking } from "@/services/booking/booking.service";

interface BookingsTableProps {
    bookings: IBooking[];
}

const BookingsTable = ({ bookings }: BookingsTableProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();

    const [viewingBooking, setViewingBooking] = useState<IBooking | null>(null);
    const [deletingBooking, setDeletingBooking] = useState<IBooking | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleRefresh = () => {
        startTransition(() => router.refresh());
    };

    const handleView = (booking: IBooking) => setViewingBooking(booking);

    const handleDelete = (booking: IBooking) => {
        // Prevent deletion if booking is PENDING, ACCEPTED, or CONFIRMED
        if (["PENDING", "ACCEPTED", "CONFIRMED"].includes(booking.status)) {
            toast.error("Cannot delete booking with active or confirmed status.");
            return;
        }
        setDeletingBooking(booking);
    };

    const confirmDelete = async () => {
        if (!deletingBooking) return;

        setIsDeleting(true);
        const result = await deleteBooking(deletingBooking.id!);
        setIsDeleting(false);

        if (result.success) {
            toast.success("Booking deleted successfully");
            setDeletingBooking(null);
            handleRefresh();
        } else {
            toast.error(result.message || "Failed to delete booking");
        }
    };

    return (
        <>
            <ReusableManagementTable
                data={bookings}
                columns={BookingsColumns}
                onView={handleView}
                onDelete={handleDelete}
                getRowKey={(booking) => booking.id!}
                emptyMessage="No bookings found"
            />

            {/* View Booking */}
            <BookingViewDetailDialog
                open={!!viewingBooking}
                onClose={() => setViewingBooking(null)}
                booking={viewingBooking!}
            />

            {/* Delete Confirmation */}
            <DeleteConfirmationDialog
                open={!!deletingBooking}
                onOpenChange={(open) => !open && setDeletingBooking(null)}
                onConfirm={confirmDelete}
                title="Delete Booking"
                description={`Are you sure you want to delete the booking for "${deletingBooking?.listing?.title}" by ${deletingBooking?.tourist?.name}? This action cannot be undone.`}
                isDeleting={isDeleting}
            />
        </>
    );
};

export default BookingsTable;