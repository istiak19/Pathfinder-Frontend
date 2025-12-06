"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Clock, DollarSign, MapPin, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { getInitials } from "@/utility/formatters";
import { IListing } from "@/types/listing.interface";
import Image from "next/image";
import BookListingDialog from "./BookListingDialog";

interface ListingCardProps {
    listing: IListing;
}

export default function ListingCard({ listing }: ListingCardProps) {
    const [showScheduleModal, setShowScheduleModal] = useState(false);

    const firstImage =
        listing.images && listing.images.length > 0
            ? listing.images[0]
            : "/login.jpg";

    return (
        <>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">

                {/* IMAGE */}
                <div className="w-full h-48 relative">
                    <Image
                        src={firstImage}
                        alt={listing.title}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* HEADER SECTION */}
                <CardHeader className="pb-2">
                    <div className="flex items-start gap-4">

                        {/* GUIDE AVATAR */}
                        <Avatar className="h-14 w-14">
                            <AvatarImage src={listing.guide?.profilePic || ""} />
                            <AvatarFallback className="text-lg">
                                {getInitials(listing.guide?.name || "Guide")}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                            <CardTitle className="text-lg line-clamp-1">
                                {listing.title}
                            </CardTitle>

                            <div className="flex items-center gap-1 mt-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-medium">
                                    {listing.averageRating?.toFixed(1) || "0.0"}
                                </span>
                            </div>
                        </div>
                    </div>
                </CardHeader>

                {/* CONTENT */}
                <CardContent className="space-y-3 pb-2">

                    {/* CITY */}
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <MapPin className="h-4 w-4" />
                        <span>{listing.city}</span>
                    </div>

                    {/* CATEGORY */}
                    <Badge variant="secondary" className="text-xs">
                        {listing.category}
                    </Badge>

                    {/* PRICE & DURATION */}
                    <div className="grid grid-cols-2 gap-3 text-sm mt-2">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <DollarSign className="h-4 w-4 shrink-0" />
                            <span className="font-semibold text-foreground">
                                ${listing.price}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4 shrink-0" />
                            <span>{listing.duration}</span>
                        </div>
                    </div>

                    {/* DESCRIPTION SHORT */}
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {listing.description}
                    </p>
                </CardContent>

                {/* FOOTER */}
                <CardFooter className="pt-3 border-t flex gap-2">
                    <Link
                        className="flex-1"
                        href={`/explore/tours/${listing.id}`}
                    >
                        <Button variant="outline" className="w-full">
                            View Details
                        </Button>
                    </Link>

                    <Button
                        onClick={() => setShowScheduleModal(true)}
                        className="flex-1"
                    >
                        Book Now
                    </Button>
                </CardFooter>
            </Card>
            <BookListingDialog
                listingId={listing.id}
                isOpen={showScheduleModal}
                onClose={() => setShowScheduleModal(false)}
            />
        </>
    );
}