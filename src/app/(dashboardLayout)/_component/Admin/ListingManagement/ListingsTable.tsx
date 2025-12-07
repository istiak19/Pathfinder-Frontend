"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import ReusableManagementTable from "@/components/shared/ReusableManagementTable";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { toast } from "sonner";
import { IListing } from "@/types/listing.interface";
import { listingsColumns } from "./ListingsColumns";
import ListingViewDetailDialog from "./ListingViewDetailDialog";
import { deleteListing } from "@/services/listings/listingManagement";
import ListingStatusDialog from "./ListingStatusDialog";

interface ListingsTableProps {
    listings: IListing[];
}

const ListingsTable = ({ listings }: ListingsTableProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();

    const [viewingListing, setViewingListing] = useState<IListing | null>(null);
    const [editingListing, setEditingListing] = useState<IListing | null>(null);
    const [deletingListing, setDeletingListing] = useState<IListing | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleRefresh = () => {
        startTransition(() => router.refresh());
    };

    const handleView = (listing: IListing) => setViewingListing(listing);
    const handleEdit = (listing: IListing) => setEditingListing(listing);

    const handleDelete = (listing: IListing) => {
        const hasActiveBookings = listing.bookings?.some((b) =>
            ["PENDING", "ACCEPTED", "CONFIRMED"].includes(b.status)
        );

        if (hasActiveBookings) {
            toast.error("Cannot delete listing with active bookings.");
            return;
        }

        setDeletingListing(listing);
    };

    const confirmDelete = async () => {
        if (!deletingListing) return;

        setIsDeleting(true);

        const result = await deleteListing(deletingListing.id!);
        setIsDeleting(false);

        if (result.success) {
            toast.success("Listing deleted successfully");
            setDeletingListing(null);
            handleRefresh();
        } else {
            toast.error(result.message || "Failed to delete listing");
        }
    };

    return (
        <>
            <ReusableManagementTable
                data={listings}
                columns={listingsColumns}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                getRowKey={(listing) => listing.id!}
                emptyMessage="No listings found"
            />

            {/* View Listing */}
            <ListingViewDetailDialog
                open={!!viewingListing}
                onClose={() => setViewingListing(null)}
                listing={viewingListing!}
            />

            {/* Edit Listing */}
            <ListingStatusDialog
                open={!!editingListing}
                onClose={() => setEditingListing(null)}
                listing={editingListing!}
                onSuccess={handleRefresh}
            />

            {/* Delete Confirmation */}
            <DeleteConfirmationDialog
                open={!!deletingListing}
                onOpenChange={(open) => !open && setDeletingListing(null)}
                onConfirm={confirmDelete}
                title="Delete Listing"
                description={`Are you sure you want to delete "${deletingListing?.title}"? This action cannot be undone.`}
                isDeleting={isDeleting}
            />
        </>
    );
};

export default ListingsTable;