"use client";

import { Column } from "@/components/shared/ReusableManagementTable";
import { Badge } from "@/components/ui/badge";
import { IListing, } from "@/types/listing.interface";
import { useState } from "react";
import { toggleStatus } from "@/services/guide/listingManagement";

export enum ListingStatus {
    Active = "Active",
    Inactive = "Inactive",
}


// StatusBadge component
function StatusBadge({ listing }: { listing: IListing }) {
    const [status, setStatus] = useState<ListingStatus>(listing.status as ListingStatus);
    const [loading, setLoading] = useState(false);

    const handleToggle = async () => {
        const newStatus =
            status === ListingStatus.Active ? ListingStatus.Inactive : ListingStatus.Active;

        // Optimistic UI update
        setStatus(newStatus);
        setLoading(true);

        try {
            const result = await toggleStatus(listing.id, status);
            if (!result.success) {
                setStatus(status);
            } else if (result.data?.status) {
                setStatus(result.data.status as ListingStatus); 
            }
        } catch (err) {
            setStatus(status);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Badge
            variant={status === ListingStatus.Active ? "default" : "destructive"}
            className={`cursor-pointer ${loading ? "opacity-50 pointer-events-none" : ""}`}
            onClick={handleToggle}
        >
            {status === ListingStatus.Active ? "Active" : "Inactive"}
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