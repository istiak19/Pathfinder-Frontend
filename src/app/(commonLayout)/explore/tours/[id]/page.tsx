import ListingContent from "@/app/(commonLayout)/_component/ListingDetails/ListingContent";
import ListingReviews from "@/app/(commonLayout)/_component/ListingDetails/ListingReview";
import { getListingById } from "@/services/listings/listingManagement";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tour Details – Pathfinder",
    description:
        "View complete tour details including itinerary, pricing, guide information, reviews, and booking options. Explore destinations and plan your perfect trip with Pathfinder.",
    keywords: [
        "Pathfinder",
        "tour details",
        "travel details",
        "tour itinerary",
        "tour price",
        "tour guide",
        "destination information",
        "trip reviews",
        "book a tour",
        "Bangladesh tourism",
        "travel planning",
    ],
};

const ListingDetailsPage = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;
    const result = await getListingById(id);

    return (
        <div className="container mx-auto px-4 py-8 space-y-6">
            <ListingContent listing={result.data} />
            <ListingReviews listingId={id} />
        </div>
    );
};

export default ListingDetailsPage;