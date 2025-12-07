"use client";

import { DateCell } from "@/components/shared/cell/DateCell";
import { Column } from "@/components/shared/ReusableManagementTable";
import { IListing } from "@/types/listing.interface";

export const listingsColumns: Column<IListing>[] = [
    {
        header: "Listing",
        accessor: (listing) => (
            <div className="flex flex-col">
                <span className="font-medium">{listing.title}</span>
                <span className="text-xs text-gray-400">{listing.category}</span>
            </div>
        ),
        sortKey: "title",
    },
    {
        header: "City",
        accessor: (listing) => <span className="capitalize">{listing.city}</span>,
        sortKey: "city",
    },
    {
        header: "Price",
        accessor: (listing) => (
            <span className="font-semibold">${listing.price}</span>
        ),
        sortKey: "price",
    },
    {
        header: "Guide",
        accessor: (listing) => (
            <div className="flex flex-col">
                <span className="font-medium">{listing.guide?.name || "Unknown"}</span>
                <span className="text-xs text-gray-400">{listing.guide?.email}</span>
            </div>
        ),
        sortKey: "guide.name",
    },
    {
        header: "Status",
        accessor: (listing) => (
            <span
                className={`px-2 py-1 text-xs font-semibold rounded-md ${listing.status === "Active"
                        ? "bg-green-600 text-white"
                        : "bg-red-600 text-white"
                    }`}
            >
                {listing.status}
            </span>
        ),
        sortKey: "status",
    },
    {
        header: "Created",
        accessor: (listing) => <DateCell date={listing.createdAt} />,
        sortKey: "createdAt",
    },
];