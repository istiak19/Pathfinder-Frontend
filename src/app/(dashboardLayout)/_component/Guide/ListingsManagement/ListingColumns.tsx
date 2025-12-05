"use client";

import { Column } from "@/components/shared/ReusableManagementTable";
import { DateCell } from "@/components/shared/cell/DateCell";
import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import { Badge } from "@/components/ui/badge";
import { IListing } from "@/types/listing.interface";

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
        accessor: (listing) => <StatusBadgeCell isDeleted={listing.status !== "Active"} />,
        sortKey: "status",
    },
    {
        header: "Created",
        accessor: (listing) => <DateCell date={listing.createdAt} />,
        sortKey: "createdAt",
    },
    {
        header: "Updated",
        accessor: (listing) => <DateCell date={listing.updatedAt} />,
        sortKey: "updatedAt",
    },
];