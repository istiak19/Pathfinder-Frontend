import ListingContent from "@/app/(commonLayout)/_component/ListingDetails/ListingContent";
import ListingReviews from "@/app/(commonLayout)/_component/ListingDetails/ListingReview";
import { getListingById } from "@/services/listings/listingManagement";

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