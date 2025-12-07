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
import { IListing } from "@/types/listing.interface";
import { formatDateTime, getInitials } from "@/utility/formatters";
import { MapPin,  Tag, Landmark } from "lucide-react";

interface IListingViewDialogProps {
    open: boolean;
    onClose: () => void;
    listing: IListing;
}

const ListingViewDetailDialog = ({ open, onClose, listing }: IListingViewDialogProps) => {
    if (!listing) return null;

    const guide = listing?.guide;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="min-w-5xl max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>Listing Details</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-6 pb-6">
                    {/* Header Section */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-900 rounded-lg mb-6">

                        {/* Listing Image */}
                        <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                            <AvatarImage src={listing.images?.[0] || ""} alt={listing.title} />
                            <AvatarFallback className="text-2xl">
                                {getInitials(listing.title)}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 text-center sm:text-left">
                            <h2 className="text-3xl font-bold mb-1">{listing.title}</h2>

                            <p className="text-muted-foreground flex items-center justify-center sm:justify-start gap-2">
                                <MapPin className="h-4 w-4" />
                                {listing.city}
                            </p>

                            <div className="flex flex-wrap gap-2 justify-center sm:justify-start mt-2">
                                <Badge
                                    variant={listing.status === "Active" ? "default" : "destructive"}
                                    className="text-sm"
                                >
                                    {listing.status}
                                </Badge>

                                <Badge variant="secondary" className="capitalize text-sm">
                                    {listing.category}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    {/* Listing Details */}
                    <div className="space-y-6">

                        {/* Listing Information */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Tag className="h-5 w-5 text-blue-600" />
                                <h3 className="font-semibold text-lg">Listing Information</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">

                                <InfoRow label="Price" value={`$${listing.price}`} />
                                <InfoRow label="Duration" value={listing.duration} />
                                <InfoRow label="Max Group Size" value={listing.maxGroupSize} />

                                <InfoRow label="Meeting Point" value={listing.meetingPoint} />
                                <InfoRow label="Rating" value={listing.averageRating ?? "N/A"} />

                                <div className="md:col-span-2">
                                    <InfoRow label="Description" value={listing.description} />
                                </div>

                                <div className="md:col-span-2">
                                    <InfoRow label="Itinerary" value={listing.itinerary} />
                                </div>

                                <InfoRow label="Created At" value={formatDateTime(listing.createdAt)} />
                                <InfoRow label="Updated At" value={formatDateTime(listing.updatedAt)} />
                            </div>
                        </div>

                        {/* Guide Info */}
                        {guide && (
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <Landmark className="h-5 w-5 text-purple-600" />
                                    <h3 className="font-semibold text-lg">Guide Information</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">

                                    <div className="flex items-center gap-4 mb-4 md:col-span-2">
                                        <Avatar className="h-16 w-16 border-2 border-white shadow-md">
                                            <AvatarImage src={guide.profilePic!} alt={guide.name} />
                                            <AvatarFallback className="text-xl">
                                                {getInitials(guide.name)}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div>
                                            <p className="text-lg font-semibold">{guide.name}</p>
                                            <p className="text-sm text-muted-foreground">{guide.email}</p>

                                            <Badge
                                                variant={guide.status === "Active" ? "default" : "destructive"}
                                                className="mt-2 text-xs"
                                            >
                                                {guide.status}
                                            </Badge>
                                        </div>
                                    </div>

                                    <InfoRow label="Languages" value={guide.languages?.join(", ") || "N/A"} />

                                    {guide.dailyRate && (
                                        <InfoRow label="Daily Rate" value={`$${guide.dailyRate}`} />
                                    )}

                                    {guide.bio && (
                                        <div className="md:col-span-2">
                                            <InfoRow label="Bio" value={guide.bio} />
                                        </div>
                                    )}

                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ListingViewDetailDialog;