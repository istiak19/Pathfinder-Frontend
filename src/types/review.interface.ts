export interface IReview {
    id: string;
    rating: number;
    comment?: string;

    // Relations
    listingId: string;
    listing?: {
        id: string;
        title?: string;
        // Add other listing fields you need
    };

    touristId: string;
    tourist?: {
        id: string;
        name?: string;
        profilePhoto?: string;
        // Add other user fields you need
    };

    bookingId: string;
    booking?: {
        id: string;
        // Add other booking fields you need
    };

    createdAt: string; // or Date if you parse it
    updatedAt: string; // or Date
}

export interface IReviewFormData {
    bookingId: string;
    rating: number;
    comment: string;
}