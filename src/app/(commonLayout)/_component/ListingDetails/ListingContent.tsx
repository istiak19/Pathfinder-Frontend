"use client";

import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Calendar,
    DollarSign,
    MapPin,
    Star,
    Users,
    Clock,
    ImageIcon,
    Tag,
    Globe,
} from "lucide-react";
import { IListing } from "@/types/listing.interface";

interface ListingContentProps {
    listing: IListing;
}

const ListingContent = ({ listing }: ListingContentProps) => {
    const guide = listing.guide;

    const initials = guide?.name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    const mainImage = listing.images?.[0] ?? null;

    return (
        <div className="space-y-6">
            {/* HEADER + MAIN IMAGE */}
            <Card>
                <CardContent className="pt-6">
                    <div className="w-full flex justify-center">
                        {mainImage ? (
                            <div className="w-full max-h-[350px] relative">
                                <Image
                                    src={mainImage}
                                    alt={listing.title}
                                    width={1200}
                                    height={600}
                                    className="w-full h-[350px] rounded-xl object-cover"
                                    priority
                                />
                            </div>
                        ) : (
                            <div className="w-full h-[300px] bg-muted flex items-center justify-center rounded-xl">
                                <ImageIcon className="h-12 w-12 text-muted-foreground" />
                            </div>
                        )}
                    </div>

                    <div className="mt-6 space-y-2">
                        <h1 className="text-3xl font-bold">{listing.title}</h1>
                        <p className="text-muted-foreground">{listing.description}</p>
                    </div>

                    {/* PRICE / DURATION / GROUP / RATING */}
                    <div className="flex flex-wrap gap-4 mt-4">
                        <div className="flex items-center gap-2 text-primary">
                            <DollarSign className="h-5 w-5" />
                            <span className="font-semibold">${listing.price}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-muted-foreground" />
                            <span className="font-semibold">{listing.duration}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-muted-foreground" />
                            <span className="font-semibold">
                                Max {listing.maxGroupSize} people
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                            <span className="font-semibold">
                                {listing.averageRating > 0
                                    ? listing.averageRating
                                    : "No ratings yet"}
                            </span>
                        </div>
                    </div>

                    {/* CATEGORY, CITY, STATUS */}
                    <div className="flex flex-wrap gap-3 mt-4">
                        <Badge variant="secondary" className="flex items-center gap-1">
                            <Tag className="h-3 w-3" />
                            {listing.category}
                        </Badge>

                        <Badge variant="outline" className="flex items-center gap-1">
                            <Globe className="h-3 w-3" />
                            {listing.city}
                        </Badge>

                        <Badge
                            variant={listing.status === "Active" ? "default" : "destructive"}
                        >
                            {listing.status}
                        </Badge>
                    </div>
                </CardContent>
            </Card>

            {/* GUIDE INFO */}
            <Card>
                <CardHeader>
                    <CardTitle>Your Guide</CardTitle>
                </CardHeader>
                <CardContent className="flex gap-4 items-center">
                    <Avatar className="h-20 w-20">
                        {guide?.profilePic ? (
                            <AvatarImage src={guide.profilePic} alt={guide.name} />
                        ) : (
                            <AvatarFallback>{initials}</AvatarFallback>
                        )}
                    </Avatar>

                    <div className="space-y-1">
                        <p className="text-xl font-semibold">{guide?.name}</p>
                        {guide?.bio && (
                            <p className="text-sm text-muted-foreground">{guide.bio}</p>
                        )}

                        <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant="secondary">{guide?.email}</Badge>
                            {guide?.languages?.map((lang: string) => (
                                <Badge variant="outline" key={lang}>
                                    {lang}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* TOUR DETAILS */}
            <Card>
                <CardHeader>
                    <CardTitle>Tour Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">

                    <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <p>{listing.itinerary}</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-muted-foreground" />
                        <span className="font-semibold">Meeting Point:</span>
                        <span className="text-muted-foreground">{listing.meetingPoint}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-muted-foreground" />
                        <span>{listing.bookings?.length ?? 0} Bookings</span>
                    </div>

                </CardContent>
            </Card>
        </div>
    );
};

export default ListingContent;