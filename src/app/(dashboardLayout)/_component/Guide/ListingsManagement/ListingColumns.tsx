"use client";

import { Column } from "@/components/shared/ReusableManagementTable";
import { Badge } from "@/components/ui/badge";
import { IListing, } from "@/types/listing.interface";
import { useState } from "react";
import { toggleStatus } from "@/services/listings/listingManagement";
import { toast } from "sonner";

export enum ListingStatus {
    Active = "Active",
    Inactive = "Inactive",
}


// StatusBadge component
function StatusBadge({ listing }: { listing: IListing }) {
    const [status, setStatus] = useState<ListingStatus>(listing.status as ListingStatus);
    const [loading, setLoading] = useState(false);

    const handleToggle = async () => {
        const newStatus = status === ListingStatus.Active ? ListingStatus.Inactive : ListingStatus.Active;
        setStatus(newStatus); 
        setLoading(true);

        try {
            const res = await toggleStatus(listing.id!, newStatus);

            if (res.success) {
                toast.success(res.message || "Listing status updated");
            } else {
                setStatus(status);
                toast.error(res.message || "Failed to update listing status");
            }
        } catch (err) {
            setStatus(status);
            console.error("Error updating listing:", err);
            toast.error("Failed to update listing status");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Badge
            variant={status === ListingStatus.Active ? "default" : "destructive"}
            className={`
                cursor-pointer 
                select-none
                px-3 py-1
                rounded-lg
                transition-all
                duration-200
                hover:scale-105
                ${loading ? "opacity-50 pointer-events-none" : ""}
            `}
            onClick={handleToggle}
            title="Click to toggle status"
        >
            {status}
        </Badge>
    );
}

// Table columns
export const listingsColumns: Column<IListing>[] = [
    {
        header: "Title",
        accessor: (listing) => <span className="font-medium">{listing.title}</span>,
        sortKey: "title",
    },
    {
        header: "Category",
        accessor: (listing) => (
            <Badge variant="secondary" className="text-xs">
                {listing.category}
            </Badge>
        ),
        sortKey: "category",
    },
    {
        header: "City",
        accessor: (listing) => <span className="text-sm">{listing.city}</span>,
        sortKey: "city",
    },
    {
        header: "Price",
        accessor: (listing) => (
            <span className="text-sm font-semibold text-green-600">${listing.price}</span>
        ),
        sortKey: "price",
    },
    {
        header: "Duration",
        accessor: (listing) => <span className="text-sm">{listing.duration}</span>,
        sortKey: "duration",
    },
    {
        header: "Group Size",
        accessor: (listing) => <span className="text-sm">{listing.maxGroupSize}</span>,
        sortKey: "maxGroupSize",
    },
    {
        header: "Guide",
        accessor: (listing) => <span className="text-sm">{listing.guide?.name}</span>,
        sortKey: "guide.name",
    },
    {
        header: "Status",
        accessor: (listing) => <StatusBadge listing={listing} />,
        sortKey: "status",
    },
];