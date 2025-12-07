import { IListing } from "@/types/listing.interface";
import ListingCard from "./ExploreCard";

interface ListingGridProps {
    listings: IListing[];
};

export default function ListingGrid({ listings}: ListingGridProps) {
    if (listings.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                    No listings found matching your criteria.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                    Try adjusting your filters or search terms.
                </p>
            </div>
        );
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
            ))}
        </div>
    );
}