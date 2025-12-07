"use client";

import { Column } from "@/components/shared/ReusableManagementTable";
import { Badge } from "@/components/ui/badge";
import { BookingStatus, IBooking, PaymentStatus } from "@/types/booking.interface";

// Table columns for bookings
export const BookingsColumns: Column<IBooking>[] = [
    {
        header: "Tourist Name",
        accessor: (booking) => <span className="font-medium">{booking.tourist?.name}</span>,
        sortKey: "tourist.name",
    },
    {
        header: "Tourist Email",
        accessor: (booking) => <span className="text-sm">{booking.tourist?.email}</span>,
        sortKey: "tourist.email",
    },
    {
        header: "Booking Date",
        accessor: (booking) => (
            <span className="text-sm">{new Date(booking.date).toLocaleDateString()}</span>
        ),
        sortKey: "date",
    },
    {
        header: "Guests",
        accessor: (booking) => <span className="text-sm">{booking.guests}</span>,
        sortKey: "guests",
    },
    {
        header: "Booking Status",
        accessor: (booking) => {
            let color: "default" | "destructive" | "secondary" = "secondary";
            if (booking.status === BookingStatus.PENDING) color = "default";
            else if (booking.status === BookingStatus.CONFIRMED) color = "default";
            else if (booking.status === BookingStatus.CANCELLED) color = "destructive";

            return <Badge variant={color}>{booking.status}</Badge>;
        },
        sortKey: "status",
    },
    {
        header: "Payment Status",
        accessor: (booking) => {
            const color = booking.paymentStatus === PaymentStatus.PAID ? "default" : "destructive";
            return <Badge variant={color}>{booking.paymentStatus}</Badge>;
        },
        sortKey: "paymentStatus",
    },
];