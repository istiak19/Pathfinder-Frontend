"use client";

import InfoRow from "@/components/shared/InfoRow";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { IBooking } from "@/types/booking.interface";
import { formatDateTime, getInitials } from "@/utility/formatters";
import { Calendar,  User } from "lucide-react";

interface IBookingViewDetailDialogProps {
    open: boolean;
    onClose: () => void;
    booking: IBooking | null;
}

const BookingViewDetailDialog = ({
    open,
    onClose,
    booking,
}: IBookingViewDetailDialogProps) => {
    if (!booking) return null;

    const { listing, tourist } = booking;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="min-w-5xl max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>Booking Details</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-6 pb-6">
                    {/* Listing Header */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 bg-linear-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-lg mb-6">
                        <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                            <AvatarImage src={listing.images?.[0]} alt={listing.title} />
                            <AvatarFallback className="text-2xl">
                                {getInitials(listing.title)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 text-center sm:text-left">
                            <h2 className="text-3xl font-bold mb-1">{listing.title}</h2>
                            <p className="text-muted-foreground mb-2">{listing.description}</p>
                            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                                <Badge variant={listing.status === "Active" ? "default" : "destructive"}>
                                    {listing.status}
                                </Badge>
                                <Badge variant="secondary" className="text-sm">
                                    {listing.averageRating?.toFixed(1) || 0} Rating
                                </Badge>
                            </div>
                        </div>
                    </div>

                    {/* Booking & Tourist Information */}
                    <div className="space-y-6">
                        {/* Booking Information */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Calendar className="h-5 w-5 text-blue-600" />
                                <h3 className="font-semibold text-lg">Booking Information</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                                    <InfoRow label="Date" value={formatDateTime(booking.date)} />
                                </div>
                                <div className="flex items-start gap-3">
                                    <User className="h-4 w-4 mt-1 text-muted-foreground" />
                                    <InfoRow label="Guests" value={`${booking.guests} person(s)`} />
                                </div>
                                <div className="flex items-start gap-3">
                                    <Badge variant={booking.status === "ACCEPTED" ? "default" : "destructive"}>
                                        {booking.status}
                                    </Badge>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Badge variant={booking.paymentStatus === "PAID" ? "default" : "destructive"}>
                                        {booking.paymentStatus}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        <Separator />

                        {/* Tourist Information */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <User className="h-5 w-5 text-purple-600" />
                                <h3 className="font-semibold text-lg">Tourist Information</h3>
                            </div>
                            <div className="flex items-center gap-4 bg-muted/50 p-4 rounded-lg">
                                <Avatar className="h-16 w-16 border-2 border-white shadow">
                                    <AvatarImage src={tourist.profilePic} alt={tourist.name} />
                                    <AvatarFallback>{getInitials(tourist.name)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">{tourist.name}</p>
                                    <p className="text-sm text-muted-foreground">{tourist.email}</p>
                                </div>
                            </div>
                        </div>

                        <Separator />

                        {/* Created & Updated */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                            <div className="flex items-start gap-3">
                                <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                                <InfoRow label="Created At" value={formatDateTime(booking.createdAt)} />
                            </div>
                            <div className="flex items-start gap-3">
                                <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                                <InfoRow label="Last Updated" value={formatDateTime(booking.updatedAt)} />
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default BookingViewDetailDialog;