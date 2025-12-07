"use client";

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import ReusableManagementTable from "@/components/shared/ReusableManagementTable";
import { IListing } from "@/types/listing.interface";
import { deleteListing } from "@/services/listings/listingManagement";
import ListingFormDialog from "./ListingFormDialog";
import ListingViewDetailDialog from "./ListingViewDetailDialog";
import { listingsColumns } from "./ListingColumns";

interface ListingTableProps {
    listings: IListing[];
}

const ListingTable = ({ listings }: ListingTableProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [deletingListing, setDeletingListing] = useState<IListing | null>(null);
    const [viewingListing, setViewingListing] = useState<IListing | null>(null);
    const [editingListing, setEditingListing] = useState<IListing | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleView = (listing: IListing) => {
        setViewingListing(listing);
    };

    const handleEdit = (listing: IListing) => {
        setEditingListing(listing);
    };

    const handleDelete = (listing: IListing) => {
        setDeletingListing(listing);
    };

    const confirmDelete = async () => {
        if (!deletingListing) return;

        setIsDeleting(true);
        const result = await deleteListing(deletingListing.id!);
        setIsDeleting(false);

        if (result.success) {
            toast.success(result.message || "Doctor deleted successfully");
            setDeletingListing(null);
            handleRefresh();
        } else {
            toast.error(result.message || "Failed to delete doctor");
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
                emptyMessage="No doctors found"
            />
            {/* Edit Doctor Form Dialog */}
            <ListingFormDialog
                open={!!editingListing}
                onClose={() => setEditingListing(null)}
                listing={editingListing!}
                onSuccess={() => {
                    setEditingListing(null);
                    handleRefresh();
                }}
            />

            {/* View Doctor Detail Dialog */}
            <ListingViewDetailDialog
                open={!!viewingListing}
                onClose={() => setViewingListing(null)}
                listing={viewingListing}
            />

            {/* Delete Confirmation Dialog */}
            <DeleteConfirmationDialog
                open={!!deletingListing}
                onOpenChange={(open) => !open && setDeletingListing(null)}
                onConfirm={confirmDelete}
                title="Delete Listing"
                description={`Are you sure you want to delete ${deletingListing?.title}? This action cannot be undone.`}
                isDeleting={isDeleting}
            />
        </>
    );
};

export default ListingTable;