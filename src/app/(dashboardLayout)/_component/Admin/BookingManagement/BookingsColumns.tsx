"use client";

import { DateCell } from "@/components/shared/cell/DateCell";
import { Column } from "@/components/shared/ReusableManagementTable";
import { IBooking } from "@/types/booking.interface";

export const BookingsColumns: Column<IBooking>[] = [
    {
        header: "Booking Date",
        accessor: (booking) => <DateCell date={booking.date} />,
        sortKey: "date",
    },
    {
        header: "Booking Status",
        accessor: (booking) => (
            <span
                className={`px-2 py-1 text-xs font-semibold rounded-md ${booking.status === "CONFIRMED"
                        ? "bg-green-600 text-white"
                        : booking.status === "PENDING"
                            ? "bg-yellow-600 text-white"
                            : "bg-red-600 text-white"
                    }`}
            >
                {booking.status}
            </span>
        ),
        sortKey: "status",
    },
    {
        header: "Guests",
        accessor: (booking) => <span className="font-semibold">{booking.guests}</span>,
        sortKey: "guests",
    },
    {
        header: "Tourist",
        accessor: (booking) => (
            <div className="flex flex-col">
                <span className="font-medium">{booking.tourist?.name || "Unknown"}</span>
                <span className="text-xs text-gray-400">{booking.tourist?.email}</span>
            </div>
        ),
        sortKey: "tourist.name",
    },
    {
        header: "Guide",
        accessor: (booking) => (
            <div className="flex flex-col">
                <span className="font-medium">{booking.listing?.guide?.name || "Unknown"}</span>
                <span className="text-xs text-gray-400">{booking.listing?.guide?.email}</span>
            </div>
        ),
        sortKey: "listing.guide.name",
    },
    {
        header: "Listing",
        accessor: (booking) => (
            <div className="flex flex-col">
                <span className="font-medium">{booking.listing?.title || "Unknown"}</span>
                <span className="text-xs text-gray-400">{booking.listing?.category}</span>
            </div>
        ),
        sortKey: "listing.title",
    },
    {
        header: "City",
        accessor: (booking) => <span className="capitalize">{booking.listing?.city}</span>,
        sortKey: "listing.city",
    },
    {
        header: "Price",
        accessor: (booking) => <span className="font-semibold">${booking.listing?.price}</span>,
        sortKey: "listing.price",
    },
    {
        header: "Booking Created",
        accessor: (booking) => <DateCell date={booking.createdAt} />,
        sortKey: "createdAt",
    },
];