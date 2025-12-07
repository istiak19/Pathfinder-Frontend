"use client";

// import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
// import { toast } from "sonner";
import ReusableManagementTable from "@/components/shared/ReusableManagementTable";
// import { deleteListing } from "@/services/guide/listingManagement";
import { BookingsColumns } from "./guideBookingColumns";
import { IBooking } from "@/types/booking.interface";
import BookingViewDetailDialog from "./BookingViewDetailDialog";
import StatusFormDialog from "./StatusFormDialog";

interface BookingTableProps {
    bookings: IBooking[];
}

const GuideBookingTable = ({ bookings }: BookingTableProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    // const [deletingListing, setDeletingListing] = useState<IBooking | null>(null);
    const [viewingBooking, setBooking] = useState<IBooking | null>(null);
    const [editingListing, setEditingListing] = useState<IBooking | null>(null);
    // const [isDeleting, setIsDeleting] = useState(false);

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleView = (booking: IBooking) => {
        setBooking(booking);
    };

    const handleEdit = (booking: IBooking) => {
        setEditingListing(booking);
    };

    // const handleDelete = (booking: IBooking) => {
    //     setDeletingListing(booking);
    // };

    // const confirmDelete = async () => {
    //     if (!deletingListing) return;

    //     setIsDeleting(true);
    //     const result = await deleteListing(deletingListing.id!);
    //     setIsDeleting(false);

    //     if (result.success) {
    //         toast.success(result.message || "Doctor deleted successfully");
    //         setDeletingListing(null);
    //         handleRefresh();
    //     } else {
    //         toast.error(result.message || "Failed to delete doctor");
    //     }
    // };

    return (
        <>
            <ReusableManagementTable
                data={bookings}
                columns={BookingsColumns}
                onView={handleView}
                onEdit={handleEdit}
                // onDelete={handleDelete}
                getRowKey={(booking) => booking.id!}
                emptyMessage="No doctors found"
            />
            {/* Edit Doctor Form Dialog */}
            <StatusFormDialog
                open={!!editingListing}
                onClose={() => setEditingListing(null)}
                booking={editingListing!}
                onSuccess={() => {
                    setEditingListing(null);
                    handleRefresh();
                }}
            />

            {/* View Doctor Detail Dialog */}
            <BookingViewDetailDialog
                open={!!viewingBooking}
                onClose={() => setBooking(null)}
                booking={viewingBooking}
            />

            {/* Delete Confirmation Dialog */}
            {/* <DeleteConfirmationDialog
                open={!!deletingListing}
                onOpenChange={(open) => !open && setDeletingListing(null)}
                onConfirm={confirmDelete}
                title="Delete Listing"
                description={`Are you sure you want to delete ${deletingListing?.title}? This action cannot be undone.`}
                isDeleting={isDeleting}
            /> */}
        </>
    );
};

export default GuideBookingTable;